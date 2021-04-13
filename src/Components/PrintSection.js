/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import './PrintSection.css'
import firebase from 'firebase/app'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Typography } from '@material-ui/core';

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

export default function PrintSection(props) {
    let sectionAndYear = props.match.params.slug
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState('1')
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

    function load() {

        let studentListInit = [], ta = [], tb = [], tc = [], td = [], te = [], fa = [], fb = [], fc = [], fd = [], fe = []
        let tac = [0,0], tbc = [0,0], tcc = [0,0], tdc = [0,0], tec = [0,0], fac = [0,0,0,0,0,0,0,0,0], fbc = [0,0,0,0,0,0,0,0,0], fcc = [0,0,0,0,0,0,0,0,0], fdc = [0,0,0,0,0,0,0,0,0], fec = [0,0,0,0,0,0,0,0,0]

        firebase.database().ref('StudentList/').once('value', snap => {
            snap.forEach(item => {
                studentListInit.push(item.key)
                if (item.val().year === '3') {
                    if (item.val().section === 'A') {
                        ta.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tac[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tac[1]+=1
                    }
                    if (item.val().section === 'B') {
                        tb.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tbc[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tbc[1]+=1
                    }
                    if (item.val().section === 'C') {
                        tc.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tcc[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tcc[1]+=1
                    }
                    if (item.val().section === 'D') {
                        td.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tdc[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tdc[1]+=1
                    }
                    if (item.val().section === 'E') {
                        te.push(item.val())
                        if(item.val().selection === "Vth-Sem-OBT552 Basics of BioInformatics-Theory")tec[0]+=1
                        if(item.val().selection === "Vth-Sem-OMD553 TeleHealth Technology-Theory")tec[1]+=1
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
                            <TableCell align='center' style={{fontFamily: 'Mulish', fontWeight: 'bolder'}}>Selected List</TableCell>
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

    function Loader() {
        if (isLoading === '1') {
            load()
            return <div>Loading</div>
        }
        else if (isLoading === '0') {
            if (sectionAndYear === 'ta' || sectionAndYear === 'tb' || sectionAndYear === 'tc' || sectionAndYear === 'td' || sectionAndYear === 'te') {
                let tItem, tCount, secyear
                if (sectionAndYear === 'ta') {
                    tItem = keyList.ta
                    tCount = countList.ta
                    secyear = "3rd Year A"
                }
                if (sectionAndYear === 'tb') {
                    tItem = keyList.tb
                    tCount = countList.tb
                    secyear = "3rd Year B"
                }
                if (sectionAndYear === 'tc') {
                    tItem = keyList.tc
                    tCount = countList.tc
                    secyear = "3rd Year C"
                }
                if (sectionAndYear === 'td') {
                    tItem = keyList.td
                    tCount = countList.td
                    secyear = "3rd Year D"
                }
                if (sectionAndYear === 'te') {
                    tItem = keyList.te
                    tCount = countList.te
                    secyear = "3rd Year E"
                }
                return (
                    <div className='TableList'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{secyear}</Typography>
                        <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h5'>{"Students Added: " + tItem.length}</Typography>
                        <div className='TableData'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'Vth-Sem-OBT552 Basics of BioInformatics-Theory\' Prefered Count: " + tCount[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'Vth-Sem-OMD553 TeleHealth Technology-Theory\' Prefered Count: " + tCount[1]}</Typography>
                        </div>
                        <StudentList item={tItem}/>
                    </div>
                )   
            } else {
                let tItem, tCount, secyear
                if (sectionAndYear === 'fa') {
                    tItem = keyList.fa
                    tCount = countList.fa
                    secyear = "3rd Year A"
                }
                if (sectionAndYear === 'fb') {
                    tItem = keyList.fb
                    tCount = countList.fb
                    secyear = "4th Year B"
                }
                if (sectionAndYear === 'fc') {
                    tItem = keyList.fc
                    tCount = countList.fc
                    secyear = "4th Year C"
                }
                if (sectionAndYear === 'fd') {
                    tItem = keyList.fd
                    tCount = countList.fd
                    secyear = "4th Year D"
                }
                if (sectionAndYear === 'fe') {
                    tItem = keyList.fe
                    tCount = countList.fe
                    secyear = "4th Year E"
                }
                return(
                    <div className='TableList'>
                        <Typography style={{fontFamily: 'Mulish', textAlign: 'center'}} variant='h5'>{secyear}</Typography>
                        <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h5'>{"Students Added: " + tItem.length}</Typography>
                        <div className='TableData'>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-OBM752 Hospital Management-Theory\' Prefered Count: " + tCount[0]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-OEC754 Medical Electronics-Theory\' Prefered Count: " + tCount[1]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-OIE751 Robotics-Theory\' Prefered Count: " + tCount[2]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-CS8081 Internet of Things-Theory\' Prefered Count: " + tCount[3]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-CS8091 Big Data Analytics-Theory\' Prefered Count: " + tCount[4]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-CS8092 Computer Graphics and Multimedia-Theory\' Prefered Count: " + tCount[5]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-CS8079 Human Computer Interaction-Theory\' Prefered Count: " + tCount[6]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-CS8083 Multi-Core Architectures and Programming-Theory\' Prefered Count: " + tCount[7]}</Typography>
                            <Typography style={{ fontFamily: 'Mulish', textAlign: 'center', fontSize: '12pt'}}>{"\'VII-CS8088 Wireless Adhoc and Sensor Networks-Theory\' Prefered Count: " + tCount[8]}</Typography>
                        </div>
                        <StudentList item={tItem}/>
                    </div>
                )
            }
        }
    }

    function CollegeDetails() {
        return (
            <div className='DetailsCol'>
                <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h5'>PSNA College Of Engineering and Technology</Typography>
                <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h6'>Computer Science And Engineering Department</Typography>
                <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h6'>Academic year: 2020-2021 / ODD Semester</Typography>
            </div>
        )
    }

    function Signature() {
        return (
            <Typography style={{marginTop: '40px', marginRight: '5%', fontFamily: 'Mulish', textAlign: 'right', fontSize: '12pt', fontWeight: 'bolder'}}>HOD Signature</Typography>
        )
    }

    return (
        <div>
            <CollegeDetails />
            <Loader />
            <Signature />
        </div>
    )
}
