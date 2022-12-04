import React, { useState } from 'react'
import { PersonOutline, LockOpen } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import './Login.css'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import * as Types from '../../store/actions/types';
import jwtDecode from 'jwt-decode'


function Login() {
    const[values, setValues] = useState({
        id: '',
        password: '',
    })

    const [errors, setErrors] = useState({})
    const { addToast } = useToasts();
    const history = useHistory()
    const dispatch = useDispatch()

    const changeValue = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const submit = e => {
        e.preventDefault()
        axios.post('/api/teacher/login', values)
        .then(res => {
            let decodeToken = jwtDecode(res.data.token)
            dispatch({
                type: Types.SET_TEACHER,
                payload: {
                    teacherInfo: {
                        _id: decodeToken._id,
                        expiresIn: res.data.expiresIn
                    }
                }
            })
            addToast(res.data.message + '. Session will expire in ' + res.data.expiresIn/3600 + ' hours', { appearance: 'success' });
            history.push('/')
        })
        .catch(err => {
            console.log(err.response.data)
            setErrors(err.response.data)
        })
    }
    return (
        <div className="login">
            <form onSubmit={submit} className="login__form">
                <h1>Login</h1>
                <div className="text_box">
                    <PersonOutline />
                    <input onChange={changeValue('id')} className="user-name" type="text" placeholder="Id"/>
                </div>
                {errors.id ?  <Typography variant="caption" color="secondary" display="block" gutterBottom>{errors.id}</Typography> : ""}	
                <div className="text_box">
                    <LockOpen />
                    <input onChange={changeValue('password')} className="password" type="text" placeholder="Password"/>
                </div>
                {errors.password ?  <Typography variant="caption" color="secondary" display="block" gutterBottom>{errors.password}</Typography> : ""}
                <div className="button">
                    <input className="btn" type="submit" placeholder="" name="" value="Log In" />
                </div>
                <Link to="/teacher/add"><Typography color="primary">Don't have account? Please click here for registration. </Typography></Link>
            </form>
        </div>
    )
}

export default Login
