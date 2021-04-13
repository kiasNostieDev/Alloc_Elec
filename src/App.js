import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import {Link} from 'react-router-dom'
import fbref from './Firebase'
import createHistory from 'history/createBrowserHistory'
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, TextField } from '@material-ui/core';

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

function App() {
  const history = createHistory()
  const classes = useStyles()
  let nameS, emailS, regS, yearS, secS
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
  const section = [
  {
      value: 'A',
      label: 'A'
  },
  {
      value: 'B',
      label: 'B'
  },
  {
      value: 'C',
      label: 'C'
  },
  {
      value: 'D',
      label: 'D'
  },
  {
      value: 'E',
      label: 'E'
  },
  ]


  function NavBar() {
    return (
      <AppBar position="static">
        <Toolbar style={{backgroundColor: 'red'}}>
          <Avatar alt="Profile Picture" src='./psnalogo.png'/>
          <Typography style={{fontFamily: 'Raleway', marginLeft: '30px'}} variant="h4" className={classes.title}>
            Electives
          </Typography>
          <Link to='/admin' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Admin</Button></Link>
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <div className='deciderHome'>
      <NavBar />
      <div className='signupPortion'>
        <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h4'>Submit Electives</Typography>
        <div style={{marginTop: '5%'}}></div>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
          <OutlinedInput labelWidth={60} onChange={(e) => {
            nameS = e.target.value
          }} />
          <FormHelperText>Giver Your Name</FormHelperText>
        </FormControl>
        <div style={{marginTop: '3%'}}></div>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="standard-adornment-amount">921319XXXXXX</InputLabel>
          <OutlinedInput labelWidth={150} onChange={(e) => {
            regS = e.target.value
          }} />
          <FormHelperText>Enter your register number </FormHelperText>
        </FormControl>
        <div style={{marginTop: '3%'}}></div>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="standard-adornment-amount">Mail</InputLabel>
          <OutlinedInput labelWidth={100} onChange={(e) => {
            emailS = e.target.value
          }} />
          <FormHelperText>Giver Your Email</FormHelperText>
        </FormControl>
        <div style={{marginTop: '3%'}}></div>
        <div style={{marginTop: '3%'}}></div>
        <TextField
          fullWidth
          id="outlined-select-annotation"
          select
          label='Year'
          helperText='select your year'
          variant="outlined"
          onChange={e=>yearS = e.target.value}
        >
          {year.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div style={{marginTop: '3%'}}></div>
        <TextField
          fullWidth
          id="outlined-select-annotation"
          select
          label='Section'
          helperText='select your section'
          variant="outlined"
          onChange={e=>secS = e.target.value}
        >
          {section.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div style={{marginTop: '3%'}}></div>
        <Button
          onClick={() => {
            if (regS.length !== 12) {
              alert('Give a valid register number')
              window.location.reload()
            }
            const userData = {
              name: nameS,
              register: regS,
              email: emailS,
              year: yearS,
              section: secS,
            }
            firebase.auth().createUserWithEmailAndPassword(emailS, "StrongPasswordAlways")
              .then((userCredential) => {
                firebase.database().ref('StudentList/').child(userData.email.split('.').join("")).set(userData).then(val => {
                    localStorage.setItem("id", emailS.split('.').join(""))
                    history.push('/prefersection')
                    window.location.reload()
                })
              })
          }}
          variant="contained"
          size="medium"
          startIcon={<PersonAddIcon />}
          style={{float: 'right', backgroundColor: 'red', color: 'white', marginBottom: '6%'}}
        >
          Enter
        </Button>
        <div style={{marginTop: '3%'}}></div>
        <Typography style={{ fontFamily: 'Mulish', textAlign: 'center' }} variant='h6'>Get in and Give your choices</Typography>
      </div>
    </div>
  )
}

export default App;
