/* eslint-disable no-useless-escape */
import React, {useState } from 'react'
import { Button, FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, OutlinedInput, TextField, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import './Station.css'
import DeleteIcon from '@material-ui/icons/Delete'
import firebase from 'firebase/app'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import createHistory from 'history/createBrowserHistory'
import PrintIcon from '@material-ui/icons/Print';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    form: {
        marginLeft: '30px',
        width: '40%',
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:400px)']: {
            marginLeft: 'unset',
            width: '60%',
            marginTop: "2%"
        }
    }
}));

export default function Station() {
    const classes = useStyles()
    const history = createHistory()
    const [isLoading, setIsLoading] = useState('1')
    const [course3List, setCourse3List] = useState([])
    const [course4iList, setCourse4iList] = useState([])
    const [course4iiList, setCourse4iiList] = useState([])
    const [course4iiiList, setCourse4iiiList] = useState([])
    const [keyList, setKeyList] = useState({
        "ta": [],
        "tb": [],
        "tc": [],
        "td": [],
        "te": [],
        "fa": [],
        "fb": [],
        "fc": [],
        "fd": [],
        "fe": [],
    })
    const [countList, setCountList] = useState({
        "ta": [],
        "tb": [],
        "tc": [],
        "td": [],
        "te": [],
        "fa": [],
        "fb": [],
        "fc": [],
        "fd": [],
        "fe": [],
    })
    let courseName, semesterSelection, typeSelection, yearSelection, elecSelection
    const sem = [
        {
            value: 'Vth-Sem',
            label: 'V'
        },
        {
            value: 'VI',
            label: 'VI'
        },
        {
            value: 'VII',
            label: 'VII'
        },
        {
            value: 'VIII',
            label: 'VIII'
        },
    ]

    const year = [
      {
          value: '3',
          label: 'IIIrd year'
      },
      {
          value: '4',
          label: 'IVth year'
      },
    ]

    const type = [
        {
            value: 'Theory',
            label: 'Theory'
        },
        {
            value: 'Lab',
            label: 'Lab'
        }
    ]

    const dept = [
        {
            value: 'CSE',
            label: 'CSE'
        },
        {
            value: 'ECE',
            label: 'ECE'
        },
        {
            value: 'IT',
            label: 'IT'
        },
        {
            value: 'EEE',
            label: 'EEE'
        },
        {
            value: 'Civil',
            label: 'Civil'
        },
        {
            value: 'Mech',
            label: 'Mech'
        },
        {
            value: 'BME',
            label: 'BME'
        },
    ]

    const elec = [
        {
            value: '3i',
            label: '3rd year 1st open Elective'
        },
        {
            value: '4i',
            label: '4th year 1st open Elective'
        },
        {
            value: '4ii',
            label: '4th year 2nd open Elective'
        },
        {
            value: '4iii',
            label: '4th year 3rd open Elective'
        }
    ]

    function load() {
        var courseList3Init = [], courseList4iInit = [], courseList4iiInit = [], courseList4iiiInit = []
        if (localStorage.getItem('uidad') === null){
            history.push('/admin')
            window.location.reload()
        }
        firebase.database().ref('CourseList/').once('value', (snap) => {
            snap.forEach(csnap => {
                var key = csnap.key
                var val = csnap.val()
                if (val.year === '3') courseList3Init.push(key)
                if (val.year === '4') {
                    if (val.elec === '4i') courseList4iInit.push(key)
                    if (val.elec === '4ii') courseList4iiInit.push(key)
                    if (val.elec === '4iii') courseList4iiiInit.push(key)
                }
            })
        })
        setCourse3List(courseList3Init)
        setCourse4iList(courseList4iInit)
        setCourse4iiList(courseList4iiInit)
        setCourse4iiiList(courseList4iiiInit)

        let studentListInit = [], ta = [], tb = [], tc = [], td = [], te = [], fa = [], fb = [], fc = [], fd = [], fe = []
        let tac = [0,0,0], tbc = [0,0,0], tcc = [0,0,0], tdc = [0,0,0], tec = [0,0,0], fac = [0,0,0,0,0,0,0,0,0], fbc = [0,0,0,0,0,0,0,0,0], fcc = [0,0,0,0,0,0,0,0,0], fdc = [0,0,0,0,0,0,0,0,0], fec = [0,0,0,0,0,0,0,0,0]

        firebase.database().ref('StudentList/').once('value', snap => {
            snap.forEach(item => {
                studentListInit.push(item.key)
                if (item.val().year === '3') {
                    if (item.val().section === 'A') {
                        ta.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tac[0]+=1
                        if (item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory") tac[1] += 1
                        if (item.val().selection === "Vth-Sem-OEC552 - Soft Computing-Theory") tac[2] += 1
                    }
                    if (item.val().section === 'B') {
                        tb.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tbc[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tbc[1]+=1
                        if (item.val().selection === "Vth-Sem-OEC552 - Soft Computing-Theory") tbc[2] += 1
                    }
                    if (item.val().section === 'C') {
                        tc.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tcc[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tcc[1]+=1
                        if (item.val().selection === "Vth-Sem-OEC552 - Soft Computing-Theory") tcc[2] += 1
                    }
                    if (item.val().section === 'D') {
                        td.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tdc[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tdc[1]+=1
                        if (item.val().selection === "Vth-Sem-OEC552 - Soft Computing-Theory") tdc[2] += 1
                    }
                    if (item.val().section === 'E') {
                        te.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tec[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tec[1]+=1
                        if (item.val().selection === "Vth-Sem-OEC552 - Soft Computing-Theory") tec[2] += 1
                    }
                } else if (item.val().year === '4') {
                    if (item.val().section === 'A') {
                        fa.push(item.val())
                        if(item.val().selection1 === "VII-OBM752 Hospital Management-Theory")fac[0]+=1
                        if(item.val().selection1 === "VII-OEC754 Medical Electronics-Theory")fac[1]+=1
                        if(item.val().selection1 === "VII-OIE751 Robotics-Theory")fac[2]+=1
                        if(item.val().selection2 === "VII-CS8081 Internet of Things-Theory")fac[3]+=1
                        if(item.val().selection2 === "VII-CS8091 Big Data Analytics-Theory")fac[4]+=1
                        if(item.val().selection2 === "VII-CS8092 Computer Graphics and Multimedia-Theory")fac[5]+=1
                        if(item.val().selection3 === "VII-CS8079 Human Computer Interaction-Theory")fac[6]+=1
                        if(item.val().selection3 === "VII-CS8083 Multi-Core Architectures and Programming-Theory")fac[7]+=1
                        if(item.val().selection3 === "VII-OIE751 Robotics-Theory")fac[8]+=1
                    }
                    if (item.val().section === 'B') {
                        fb.push(item.val())
                        if(item.val().selection1 === "VII-OBM752 Hospital Management-Theory")fbc[0]+=1
                        if(item.val().selection1 === "VII-OEC754 Medical Electronics-Theory")fbc[1]+=1
                        if(item.val().selection1 === "VII-OIE751 Robotics-Theory")fbc[2]+=1
                        if(item.val().selection2 === "VII-CS8081 Internet of Things-Theory")fbc[3]+=1
                        if(item.val().selection2 === "VII-CS8091 Big Data Analytics-Theory")fbc[4]+=1
                        if(item.val().selection2 === "VII-CS8092 Computer Graphics and Multimedia-Theory")fbc[5]+=1
                        if(item.val().selection3 === "VII-CS8079 Human Computer Interaction-Theory")fbc[6]+=1
                        if(item.val().selection3 === "VII-CS8083 Multi-Core Architectures and Programming-Theory")fbc[7]+=1
                        if(item.val().selection3 === "VII-OIE751 Robotics-Theory")fbc[8]+=1
                    }
                    if (item.val().section === 'C') {
                        fc.push(item.val())
                        if(item.val().selection1 === "VII-OBM752 Hospital Management-Theory")fcc[0]+=1
                        if(item.val().selection1 === "VII-OEC754 Medical Electronics-Theory")fcc[1]+=1
                        if(item.val().selection1 === "VII-OIE751 Robotics-Theory")fcc[2]+=1
                        if(item.val().selection2 === "VII-CS8081 Internet of Things-Theory")fcc[3]+=1
                        if(item.val().selection2 === "VII-CS8091 Big Data Analytics-Theory")fcc[4]+=1
                        if(item.val().selection2 === "VII-CS8092 Computer Graphics and Multimedia-Theory")fcc[5]+=1
                        if(item.val().selection3 === "VII-CS8079 Human Computer Interaction-Theory")fcc[6]+=1
                        if(item.val().selection3 === "VII-CS8083 Multi-Core Architectures and Programming-Theory")fcc[7]+=1
                        if(item.val().selection3 === "VII-OIE751 Robotics-Theory")fcc[8]+=1
                    }
                    if (item.val().section === 'D') {
                        fd.push(item.val())
                        if(item.val().selection1 === "VII-OBM752 Hospital Management-Theory")fdc[0]+=1
                        if(item.val().selection1 === "VII-OEC754 Medical Electronics-Theory")fdc[1]+=1
                        if(item.val().selection1 === "VII-OIE751 Robotics-Theory")fdc[2]+=1
                        if(item.val().selection2 === "VII-CS8081 Internet of Things-Theory")fdc[3]+=1
                        if(item.val().selection2 === "VII-CS8091 Big Data Analytics-Theory")fdc[4]+=1
                        if(item.val().selection2 === "VII-CS8092 Computer Graphics and Multimedia-Theory")fdc[5]+=1
                        if(item.val().selection3 === "VII-CS8079 Human Computer Interaction-Theory")fdc[6]+=1
                        if(item.val().selection3 === "VII-CS8083 Multi-Core Architectures and Programming-Theory")fdc[7]+=1
                        if(item.val().selection3 === "VII-OIE751 Robotics-Theory")fdc[8]+=1
                    }
                    if (item.val().section === 'E') {
                        fd.push(item.val())
                        if(item.val().selection1 === "VII-OBM752 Hospital Management-Theory")fec[0]+=1
                        if(item.val().selection1 === "VII-OEC754 Medical Electronics-Theory")fec[1]+=1
                        if(item.val().selection1 === "VII-OIE751 Robotics-Theory")fec[2]+=1
                        if(item.val().selection2 === "VII-CS8081 Internet of Things-Theory")fec[3]+=1
                        if(item.val().selection2 === "VII-CS8091 Big Data Analytics-Theory")fec[4]+=1
                        if(item.val().selection2 === "VII-CS8092 Computer Graphics and Multimedia-Theory")fec[5]+=1
                        if(item.val().selection3 === "VII-CS8079 Human Computer Interaction-Theory")fec[6]+=1
                        if(item.val().selection3 === "VII-CS8083 Multi-Core Architectures and Programming-Theory")fec[7]+=1
                        if(item.val().selection3 === "VII-OIE751 Robotics-Theory")fec[8]+=1
                    }
                }
            })
            setKeyList({ ta:ta, tb:tb, tc:tc, td:td, te:te, fa:fa, fb:fb, fc:fc, fd:fd, fe:fe})
            setCountList({ ta:tac, tb:tbc, tc:tcc, td:tdc, te:tec, fa:fac, fb:fbc, fc:fcc, fd:fdc, fe:fec})
        })
        setIsLoading('0')
    }

    function StudentList(props) {
        return (
            <div className='StudentList'>
                <Table>
                <TableContainer component={Paper}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Name</TableCell>
                            <TableCell style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Register</TableCell>
                            <TableCell style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Selected List</TableCell>
                        </TableRow>
                    </TableHead>{
                        props.item.map(stu => {
                            let selectedList = ""
                            if (stu.year === '4') selectedList = stu.selection1 + ", " + stu.selection2 + ", " + stu.selection3
                            else selectedList = stu.selection
                            return (
                                <TableBody>
                                    <TableCell style={{fontFamily: 'Mulish'}}>{stu.name}</TableCell>
                                    <TableCell style={{fontFamily: 'Mulish'}}>{stu.register}</TableCell>
                                    <TableCell style={{fontFamily: 'Mulish'}}>{selectedList}</TableCell>
                                </TableBody>
                            )
                        })
                    }
                </TableContainer></Table>
            </div>
        )
    }

    function CourseEntry(props) {
        return (
            <>
                <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{props.title}</Typography>
                <div style={{marginTop: '4%'}}></div>
                <TextField
                    id="outlined-select-annotation"
                    select
                    label={props.t1}
                    helperText={props.h1}
                    variant="outlined"
                    onChange={e=>semesterSelection=e.target.value}
                >
                    {props.source1.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{marginTop: '2%'}}></div>
                <TextField
                    id="outlined-select-position"
                    select
                    label={props.t2}
                    helperText={props.h2}
                    variant="outlined"
                    onChange={e=>typeSelection=e.target.value}
                >
                    {props.source2.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-position"
                    select
                    style={{marginLeft: '30px'}}
                    label={props.ty}
                    helperText={props.hy}
                    variant="outlined"
                    onChange={(e)=>yearSelection=e.target.value}
                >
                    {props.sourcey.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-position"
                    select
                    style={{marginLeft: '30px'}}
                    label={props.tx}
                    helperText={props.hx}
                    variant="outlined"
                    onChange={(e)=>elecSelection=e.target.value}
                >
                    {props.sourcex.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{marginTop: '2%'}}></div>
                <FormControl style={{width: '90%'}} variant="outlined">
                    <InputLabel htmlFor="standard-adornment-amount" >Name</InputLabel>
                    <OutlinedInput labelWidth={100} onChange={(e) => {
                        courseName = e.target.value
                    }} />
                    <FormHelperText>Enter the Name and custom annotations if needed</FormHelperText>
                </FormControl>
                <div style={{marginTop: '5%'}}></div>
                <Button
                    onClick={() => {
                         if (props.title === 'Add Course') {
                            const finalCourse = semesterSelection + '-' + courseName + '-' + typeSelection
                            const courseData = {
                                courseName: finalCourse,
                                semester: semesterSelection,
                                type: typeSelection,
                                year: yearSelection,
                                elec: elecSelection
                            }
                            firebase.database().ref('CourseList/').child(courseData.courseName).set(courseData)
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
                                 setCourse3List(courseList3Init)
                                 setCourse4iList(courseList4iInit)
                                 setCourse4iiList(courseList4iiInit)
                                 setCourse4iiiList(courseList4iiiInit)
                             })
                        }
                    }}
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    style={{backgroundColor: 'red', color: 'white'}}
                >
                    Save
                </Button>
                <div style={{marginTop: '3%'}}></div>
            </>
        )
    }

    function CourseList(props) {

        function ListEntity() {
            return(
                props.courseList.map(name=>{
                    return (
                        <div className='consoleListItem'>
                            <div className='cliName'>{name}</div>
                            <Button
                                onClick={() => {
                                    firebase.database().ref('CourseList/').child(name).remove()
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
                                         setCourse3List(courseList3Init)
                                         setCourse4iList(courseList4iInit)
                                         setCourse4iiList(courseList4iiInit)
                                         setCourse4iiiList(courseList4iiiInit)
                                     })
                                }}
                                size="medium"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                        </div>
                    )
                })
            )
        }

        return (
            <>
                <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h5'>{props.heading}</Typography>
                <ListEntity />
                <Button
                    onClick={() => {
                        if (props.heading === 'Course List') {
                            if (window.confirm("Are you sure wanna wipe out all the courses?")) {
                                firebase.database().ref('CourseList/').remove()
                            }
                        }}
                    }
                    fullWidth
                    style={{color:'red'}}
                    size="medium"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Flush whole Staff List
                </Button>
            </>
        )
    }

    function Loader(){
        if (isLoading === '1') {
            load()
            return <div>laoid</div>
        }
        else if(isLoading === '0'){
            return (
                <div className='ConsoleContents'>
                   <div className='detailBanner'>
                        <Typography style={{fontFamily: 'Zen Dots', color: 'white'}} variant="h3" className={classes.title}>Admin Console</Typography>
                    </div>
                    <Typography style={{fontFamily: 'Zen Dots', marginTop: '30px', textAlign: 'center'}} variant="h3" className={classes.title}>Classes and Preferences</Typography>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>3rd Year A</Typography>
                        <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h5'>{"Students Added: " + keyList.ta.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OBT552 Basics of BioInformatics-Theory\' Prefered Count: " + countList.ta[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OMD553 TeleHealth Technology-Theory\' Prefered Count: " + countList.ta[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OEC552 - Soft Computing-Theory\' Prefered Count: " + countList.ta[2]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/ta'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.ta}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>3rd Year B</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.tb.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OBT552 Basics of BioInformatics-Theory\' Prefered Count: " + countList.tb[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OMD553 TeleHealth Technology-Theory\' Prefered Count: " + countList.tb[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OEC552 - Soft Computing-Theory\' Prefered Count: " + countList.tb[2]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/tb'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.tb}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>3rd Year C</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.tc.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OBT552 Basics of BioInformatics-Theory\' Prefered Count: " + countList.tc[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OMD553 TeleHealth Technology-Theory\' Prefered Count: " + countList.tc[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OEC552 - Soft Computing-Theory\' Prefered Count: " + countList.tc[2]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/tc'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.tc}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>3rd Year D</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.td.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OBT552 Basics of BioInformatics-Theory\' Prefered Count: " + countList.td[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OMD553 TeleHealth Technology-Theory\' Prefered Count: " + countList.td[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OEC552 - Soft Computing-Theory\' Prefered Count: " + countList.td[2]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/td'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.td}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>3rd Year E</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.te.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OBT552 Basics of BioInformatics-Theory\' Prefered Count: " + countList.te[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OMD553 TeleHealth Technology-Theory\' Prefered Count: " + countList.te[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'Vth-Sem-OEC552 - Soft Computing-Theory\' Prefered Count: " + countList.te[2]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/te'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.te}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>4th Year A</Typography>
                        <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h5'>{"Students Added: " + keyList.fa.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OBM752 Hospital Management-Theory\' Prefered Count: " + countList.fa[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OEC754 Medical Electronics-Theory\' Prefered Count: " + countList.fa[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OIE751 Robotics-Theory\' Prefered Count: " + countList.fa[2]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8081 Internet of Things-Theory\' Prefered Count: " + countList.fa[3]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8091 Big Data Analytics-Theory\' Prefered Count: " + countList.fa[4]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8092 Computer Graphics and Multimedia-Theory\' Prefered Count: " + countList.fa[5]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8079 Human Computer Interaction-Theory\' Prefered Count: " + countList.fa[6]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8083 Multi-Core Architectures and Programming-Theory\' Prefered Count: " + countList.fa[7]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8088 Wireless Adhoc and Sensor Networks-Theory\' Prefered Count: " + countList.fa[8]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/fa'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.fa}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>4th Year B</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.fb.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OBM752 Hospital Management-Theory\' Prefered Count: " + countList.fb[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OEC754 Medical Electronics-Theory\' Prefered Count: " + countList.fb[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OIE751 Robotics-Theory\' Prefered Count: " + countList.fb[2]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8081 Internet of Things-Theory\' Prefered Count: " + countList.fb[3]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8091 Big Data Analytics-Theory\' Prefered Count: " + countList.fb[4]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8092 Computer Graphics and Multimedia-Theory\' Prefered Count: " + countList.fb[5]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8079 Human Computer Interaction-Theory\' Prefered Count: " + countList.fb[6]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8083 Multi-Core Architectures and Programming-Theory\' Prefered Count: " + countList.fb[7]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8088 Wireless Adhoc and Sensor Networks-Theory\' Prefered Count: " + countList.fb[8]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/fb'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.fb}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>4th Year C</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.fc.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OBM752 Hospital Management-Theory\' Prefered Count: " + countList.fc[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OEC754 Medical Electronics-Theory\' Prefered Count: " + countList.fc[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OIE751 Robotics-Theory\' Prefered Count: " + countList.fc[2]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8081 Internet of Things-Theory\' Prefered Count: " + countList.fc[3]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8091 Big Data Analytics-Theory\' Prefered Count: " + countList.fc[4]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8092 Computer Graphics and Multimedia-Theory\' Prefered Count: " + countList.fc[5]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8079 Human Computer Interaction-Theory\' Prefered Count: " + countList.fc[6]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8083 Multi-Core Architectures and Programming-Theory\' Prefered Count: " + countList.fc[7]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8088 Wireless Adhoc and Sensor Networks-Theory\' Prefered Count: " + countList.fc[8]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/fc'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.fc}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>4th Year D</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.fd.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OBM752 Hospital Management-Theory\' Prefered Count: " + countList.fd[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OEC754 Medical Electronics-Theory\' Prefered Count: " + countList.fd[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OIE751 Robotics-Theory\' Prefered Count: " + countList.fd[2]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8081 Internet of Things-Theory\' Prefered Count: " + countList.fd[3]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8091 Big Data Analytics-Theory\' Prefered Count: " + countList.fd[4]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8092 Computer Graphics and Multimedia-Theory\' Prefered Count: " + countList.fd[5]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8079 Human Computer Interaction-Theory\' Prefered Count: " + countList.fd[6]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8083 Multi-Core Architectures and Programming-Theory\' Prefered Count: " + countList.fd[7]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8088 Wireless Adhoc and Sensor Networks-Theory\' Prefered Count: " + countList.fd[8]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/fd'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.fd}/>
                    </div>
                    <div className='ListOfClasses'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>4th Year E</Typography>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{"Students Added: " + keyList.fe.length}</Typography>
                        <div className='DataPreferences'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OBM752 Hospital Management-Theory\' Prefered Count: " + countList.fe[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OEC754 Medical Electronics-Theory\' Prefered Count: " + countList.fe[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-OIE751 Robotics-Theory\' Prefered Count: " + countList.fe[2]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8081 Internet of Things-Theory\' Prefered Count: " + countList.fe[3]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8091 Big Data Analytics-Theory\' Prefered Count: " + countList.fe[4]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8092 Computer Graphics and Multimedia-Theory\' Prefered Count: " + countList.fe[5]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8079 Human Computer Interaction-Theory\' Prefered Count: " + countList.fe[6]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8083 Multi-Core Architectures and Programming-Theory\' Prefered Count: " + countList.fe[7]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '15pt'}}>{"\'VII-CS8088 Wireless Adhoc and Sensor Networks-Theory\' Prefered Count: " + countList.fe[8]}</Typography>
                        </div>
                        <Link style={{textDecoration: 'none'}} to={'/generateDocs/fe'}><Button 
                            variant="contained"
                            size="medium"
                            startIcon={<PrintIcon />}
                            style={{float: 'center', backgroundColor: 'red', color: 'white', marginBottom: '3%'}}
                        >
                            Generete PDF
                        </Button></Link>
                        <StudentList item={keyList.fe}/>
                    </div>
                    <Typography style={{fontFamily: 'Zen Dots', textAlign: 'center'}} variant="h3" className={classes.title}>Course Descriptions</Typography>
                    <div className='CourseList'>
                        <CourseList courseList={course3List} heading='3rd Year Electives List'/>
                    </div>
                    <div className='CourseList'>
                        <CourseList courseList={course4iList} heading='4th Year Electives List'/>
                    </div>
                    <div className='CourseList'>
                        <CourseList courseList={course4iiList} heading='4th Year Electives List'/>
                    </div>
                    <div className='CourseList'>
                        <CourseList courseList={course4iiiList} heading='4th Year Electives List'/>
                    </div>
                    <div className='AddCourses'>
                        <CourseEntry source1={sem} source2={type} source3={dept} sourcey={year} sourcex={elec} t1="Semester" t2='Type' t3='Dept' ty='Year' tx='Elective List' CondRen={true} ShortRen={false} h1='Please select the semester' h2='Please select the type' h3='Please select the dept' hy='Please select the year' hx='Please select the elective type' title='Add Course' />
                    </div>
                </div>
            )
        }
    }

    return (
        <Loader />
    )
}
