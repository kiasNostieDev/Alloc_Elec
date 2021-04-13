import React from 'react'
import { Button, FormControl, FormHelperText, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core'
import './Admin.css'
import firebase from 'firebase/app'
import createHistory from 'history/createBrowserHistory'
import cover from '../../psnalogo.png'

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

export default function Admin() {
    const history = createHistory()
    const classes = useStyles()
    let uname, apasswd

    return (
        <div>
            <div className='detailBanner'>
                <Typography style={{fontFamily: 'Zen Dots', color: 'white'}} variant="h3" className={classes.title}>Admin Login</Typography>
            </div>
            <div><img className='imgHolder' alt='logo' src={cover}/></div>
            <FormControl style={{ width: '90%', margin: '5%'}} variant="outlined">
                <InputLabel htmlFor="standard-adornment-amount">username</InputLabel>
                <OutlinedInput labelWidth={100} onChange={(e) => {
                    uname = e.target.value
                }} />
            <FormHelperText>Enter the username</FormHelperText>
        </FormControl>
        <FormControl style={{ width: '90%', margin: '0% 5%'}} variant="outlined">
            <InputLabel htmlFor="standard-adornment-amount">password</InputLabel>
            <OutlinedInput type="password" labelWidth={100} onChange={(e) => {
                apasswd = e.target.value
            }} />
            <FormHelperText>Enter the password</FormHelperText>
        </FormControl>
        <div style={{marginTop: '4%'}}></div>
        <Button
                variant="contained"
                size="large"
                onClick={() => {
                    firebase.auth().signInWithEmailAndPassword(uname, apasswd)
                        .then(user => {
                            localStorage.setItem('uidad', user.user.uid)
                            history.push('/console')
                            window.location.reload()
                        })
                        .catch(error => {
                            alert('try again')
                        })
                }}
                style={{ backgroundColor: 'red', color: 'white', width: '60vw', marginLeft: '20vw', marginBottom: '30px', fontFamily: 'Mulish' }}
        >Login</Button>
        </div>
    )
}
