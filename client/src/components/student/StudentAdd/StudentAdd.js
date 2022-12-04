import React, { useState, useRef } from 'react'

import '../Student.css'

import { Button, Card, Grid, TextField } from '@material-ui/core'


import Axios from 'axios'

import Headline from '../../Headline'


function StudentAdd() {  
    const[values, setValues] = useState({
        name: '',
        student_id: '',
        batch: '',
        phone: '',
        email: '',
        department: ''
    })
    const fileInputRef = useRef()
    const [tempFile, setTempFile] = useState('')
    const [formData, setFormData] = useState(new FormData())
    const [hoverStyle, setHoverStyle] = useState(false)

    console.log(values)

    const changeValue = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };



    const submit = (e) => {
        e.preventDefault()
        Axios.post(`/api/student/add`, values)
        .then(res => {
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })

    }
    return (
        <div className="studentAdd">
            <Headline headline="student Add" title='student Add'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="student__inputGroup">
                            <TextField required placeholder="John Doe"  label="Student Name" onChange={changeValue('name')} variant="outlined" />
                            <TextField required placeholder="1901020010" label="Student Id" onChange={changeValue('student_id')} variant="outlined" />
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('department')}
                                variant="outlined">
                                    <option value=''>Select department</option>
                                    <option value='cse'>CSE</option>
                                    <option value='bba'>BBA</option>
                                    <option value='llb'>LLB</option>
                                    <option value='english'>English</option>
                            </TextField>
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('batch')}
                                variant="outlined">
                                    <option value=''>Select batch</option>
                                    <option value='spring-19'>spring-19</option>
                                    <option value='fall-19'>Fall-19</option>
                                    <option value='summer-21'>summer-19</option>
                            </TextField>
                            <TextField placeholder="01712012xxx" label="Phone" onChange={changeValue('phone')} variant="outlined" />
                            <TextField placeholder="johndoe@gmail.com" label="Email" onChange={changeValue('email')} variant="outlined" />
                
                        </Grid>
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Add student </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default StudentAdd
