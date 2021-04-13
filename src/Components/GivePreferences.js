import React, { useState } from 'react'
import './GivePreferences.css'
import firebase from 'firebase/app'
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));
  
export default function GivePreferences() {
    const id = localStorage.getItem("id")
    const classes = useStyles()
    const [courseList, setCourseList] = useState([])
    const [course3List, setCourse3List] = useState([])
    const [course4iList, setCourse4iList] = useState([])
    const [course4iiList, setCourse4iiList] = useState([])
    const [course4iiiList, setCourse4iiiList] = useState([])
    const [isLoading, setIsLoading] = useState('1')
    let i3, i4, ii4, iii4
    const [userData, setUserData] = useState({
        'name': '',
        'email': '',
        'year': '',
        'register': '',
        'section': ''
    })
    const headerString = "Elective List for the year " + userData.year + " is given below"

    if (isLoading === '1') {
        var courseListInit = [], courseList3Init = [], courseList4iInit = [], courseList4iiInit = [], courseList4iiiInit = []
        firebase.database().ref('CourseList/').once('value', (snap) => {
            snap.forEach(csnap => {
                var key = csnap.key
                courseListInit.push(key)
                var val = csnap.val()
                if (val.year === '3') courseList3Init.push(key)
                if (val.year === '4') {
                    if (val.elec === '4i') courseList4iInit.push(key)
                    if (val.elec === '4ii') courseList4iiInit.push(key)
                    if (val.elec === '4iii') courseList4iiiInit.push(key)
                }
            })
            setCourseList(courseListInit)
            setCourse3List(courseList3Init)
            setCourse4iList(courseList4iInit)
            setCourse4iiList(courseList4iiInit)
            setCourse4iiiList(courseList4iiiInit)
        })
        firebase.database().ref('StudentList/').child(id).once('value', snap => {
            let userDataInit = {
                name: snap.val().name,
                email: snap.val().email,
                year: snap.val().year,
                section: snap.val().section,
                register: snap.val().register
            }
            setUserData(userDataInit)
        })
        setIsLoading('0')
    }


    function NavBar() {
        return (
        <div className='detailBanner'>
            <Typography style={{fontFamily: 'Raleway', color: 'white'}} variant="h3" className={classes.title}>
                {userData.name}
            </Typography>
            <Typography style={{fontFamily: 'Raleway'}} variant="h3" className={classes.title}>
                {userData.register}
            </Typography>
        </div>
        )
    }

    function ListGenerator4(props) {
        return (
            <>
            <div className='AddCourses'>
                <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>Elective List</Typography>
                <div style={{marginTop: '4%'}}></div>
                <TextField
                    fullWidth
                    id="outlined-select-position"
                    select
                    label='Elective courses set 1'
                    helperText='Select from the list'
                    variant="outlined"
                    onChange={e=>i4=e.target.value}
                >
                    {course4iList.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{marginTop: '4%'}}></div>
            </div>
            <div className='AddCourses'>
                <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>Elective List</Typography>
                <div style={{marginTop: '4%'}}></div>
                <TextField
                    fullWidth
                    id="outlined-select-position"
                    select
                    variant='outlined'
                    label='Elective courses set 2'
                    helperText='Select from the list'
                    onChange={e=>ii4=e.target.value}
                >
                    {course4iiList.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{marginTop: '4%'}}></div>
            </div>
            <div className='AddCourses'>
                <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>Elective List</Typography>
                <div style={{marginTop: '4%'}}></div>
                <TextField
                    fullWidth
                    id="outlined-select-position"
                    select
                    label='Elective courses set 3'
                    helperText='Select from the list'
                    variant="outlined"
                    onChange={e=>iii4=e.target.value}
                >
                    {course4iiiList.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{marginTop: '4%'}}></div>
            </div>
            </>
        )
    }

    function ListGenerator3(props) {
        return(
            <div className='AddCourses'>
                <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>Elective List</Typography>
                <div style={{marginTop: '4%'}}></div>
                <TextField
                    fullWidth
                    id="outlined-select-position"
                    select
                    label='Elective courses'
                    helperText='Select from the list'
                    variant="outlined"
                    onChange={e=>i3=e.target.value}
                >
                    {course3List.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{marginTop: '4%'}}></div>
            </div>
        )
    }

    function ListDecider() {
        if(isLoading === '1')return <div>Loading</div>
        else if(userData.year === '3')return <ListGenerator3/>
        else return <ListGenerator4/>
    }

    return (
        <div>
            <NavBar />
            <Typography style={{fontFamily: 'Mulish', paddingTop: '30px', paddingLeft: '30px'}} variant="h5" className={classes.title}>
                {headerString}
            </Typography>
            <ListDecider />
            <Button
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                style={{ backgroundColor: 'red', color: 'white', width: '80vw', marginLeft: '10vw', marginBottom: '30px' }}
                onClick={() => {
                    if (userData.year === '3') {
                        const selectedData = {
                            oe1: i3
                        }
                        firebase.database().ref('StudentList/').child(id).child('selection').set(selectedData.oe1)
                        firebase.database().ref('SelectedList3/').child(id).set(selectedData).then(ret => {
                            firebase.database().ref('SelectCount/three/').child(selectedData.oe1.split('.').join("")).push(id)
                            alert('You have Selected ' + selectedData.oe1)
                        })
                    } else if (userData.year === '4') {
                        const selectedData = {
                            oe1: i4,
                            oe2: ii4,
                            oe3: iii4
                        }
                        firebase.database().ref('StudentList/').child(id).child('selection1').set(selectedData.oe1)
                        firebase.database().ref('StudentList/').child(id).child('selection2').set(selectedData.oe2)
                        firebase.database().ref('StudentList/').child(id).child('selection3').set(selectedData.oe3)
                        firebase.database().ref('SelectedList4/').child(id).set(selectedData).then(ret => {
                            firebase.database().ref('SelectCount/four/').child(selectedData.oe1.split('.').join("")).push(id)
                            firebase.database().ref('SelectCount/four/').child(selectedData.oe3.split('.').join("")).push(id)
                            firebase.database().ref('SelectCount/four/').child(selectedData.oe2.split('.').join("")).push(id)
                            alert('You have Selected' + selectedData.oe1 + " " + selectedData.oe2 + " " + selectedData.oe3)
                        })
                    }
                }}
            >
                Save
            </Button>
        </div>
    )
}
