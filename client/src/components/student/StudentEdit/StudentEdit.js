import React, { useEffect, useState, useRef } from 'react'
import '../Student.css'
import { Avatar, Box, Button, Card, Grid, TextField, Typography, Tooltip } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import Axios from 'axios'
import Headline from '../../Headline'
import { useParams } from 'react-router';


function StudentEdit() {  
    const[values, setValues] = useState({
        name: '',
        student_id: '',
        batch: '',
        phone: '',
        email: '',
        department: ''
    })


    const {id} = useParams()

    useEffect(() => {
        Axios.get(`/api/student/get-student-by-id/${id}`)
        .then(res => {
            setValues(prev => res.data.student)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const changeValue = name => e => {
        setValues({ ...values, [name]: e.target.value });  
    };

    const submit = (e) => {
        e.preventDefault()
        Axios.put(`/api/student/edit/${id}`, values)
        .then(res => {
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="studentEdit">
            <Headline headline="Category Edit" title='Category Edit'/>
            <Card>
            <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="student__inputGroup">
                            <TextField required value={values.name} placeholder="John Doe"  label="Student Name" onChange={changeValue('name')} variant="outlined" />
                            <TextField required value={values.student_id} placeholder="1901020010" label="Student Id" onChange={changeValue('student_id')} variant="outlined" />
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('department')}
                                variant="outlined">
                                    <option  value={values.department}>{values.department}</option>
                                    <option value='cse'>CSE</option>
                                    <option value='bba'>BBA</option>
                                    <option value='llb'>LLB</option>
                                    <option value='english'>English</option>
                            </TextField>
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('batch')}
                                variant="outlined">
                                    <option value={values.batch}>{values.batch}</option>
                                    <option value='spring-19'>Spring-19</option>
                                    <option value='fall-19'>Fall-19</option>
                                    <option value='summer-21'>summer-19</option>
                            </TextField>
                            <TextField placeholder="01712012xxx" value={values.phone} label="Phone" onChange={changeValue('phone')} variant="outlined" />
                            <TextField placeholder="johndoe@gmail.com" value={values.email} label="Email" onChange={changeValue('email')} variant="outlined" />
                
                        </Grid>
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Update data </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default StudentEdit
