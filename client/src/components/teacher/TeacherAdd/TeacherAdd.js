import React, { useState, useEffect } from 'react'
import { PersonOutline, LockOpen } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import './TeacherAdd.css'
import {Link, useHistory} from 'react-router-dom'
import { Typography } from '@material-ui/core';
import axios from 'axios';


function TeacherAdd() {
    const[values, setValues] = useState({
        id: '',
        password: '',
        confirm_password: ''
    })
    const [errors, setErrors] = useState({})
    const { addToast } = useToasts();
    const history = useHistory()

    const changeValue = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };


    console.log(values)

    const submit = e => {
        e.preventDefault()
        console.log(values)
        axios.post('/api/teacher/registration', values)
        .then(res => {
            addToast(res.data.message, { appearance: 'success' });
            history.push('/')
        })
        .catch(err => {
            setErrors(err.response.data)
        })
    }
    return (
        <div className="teacherAdd">
            <form onSubmit={submit} className="teacherAdd__form">
                <h1>Registration</h1>
                <div className="text_box">
                    <PersonOutline />
                    <input onChange={changeValue('id')} className="user-name" type="text" placeholder="Email/Id" name=""/>
                </div>	
                {errors.id ?  <Typography variant="caption" color="secondary" display="block" gutterBottom>{errors.id}</Typography> : ""}
                <div className="text_box">
                    <LockOpen />
                    <input onChange={changeValue('password')} className="password" type="text" placeholder="Password" name=""/>
                </div>	
                {errors.password ?  <Typography variant="caption" color="secondary" display="block" gutterBottom>{errors.password}</Typography> : ""}
                <div className="text_box">
                    <LockOpen />
                    <input onChange={changeValue('confirm_password')} className="password" type="text" placeholder="Confirm Password" name="" />
                </div>
                {errors.confirm_password ?  <Typography variant="caption" color="secondary" display="block" gutterBottom>{errors.confirm_password}</Typography> : ""}	
                <div className="button">
                    <input className="btn" type="submit" placeholder="" name="" value="Sign In" />
                </div>
                <Link to="/"><Typography color="primary"> Already have an account? Click here to login. </Typography></Link>
            </form>
        </div>
    )
}

export default TeacherAdd
