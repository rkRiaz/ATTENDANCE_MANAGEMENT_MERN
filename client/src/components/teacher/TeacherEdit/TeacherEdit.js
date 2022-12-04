import React, { useEffect, useState, useRef } from 'react'
import '../Teacher.css'
import { Button, Card, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import Axios from 'axios'
import Headline from '../../Headline'
import { useParams } from 'react-router';


function TeacherEdit() {  
    const[values, setValues] = useState({
        name: '',
        id: '',
        phone: '',
        role: '',
        gender: '',
        department: '',
        description: '',
        address: ''
    })
    const {id} = useParams()

    useEffect(() => {
        Axios.get(`/api/teacher/get-teacher-by-id/${id}`)
        .then(res => {
            setValues(prev => res.data.teacher)
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
        Axios.put(`/api/teacher/edit/${id}`, values)
        .then(res => {
            setValues(res.data.teacher)
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

    console.log(values)
    return (
        <div className="teacherEdit">
            <Headline headline="Teacher Edit" title='Teacher Edit'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="teacher__inputGroup">
                            <TextField value={values.id} label="Id" onChange={changeValue('id')} variant="outlined" />
                            <TextField value={values.name} label="Name" onChange={changeValue('name')} variant="outlined" />
                            <TextField value={values.email} label="Email" onChange={changeValue('email')} variant="outlined" />   
                            <TextField value={values.phone} label="Phone" onChange={changeValue('phone')} variant="outlined" />
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('department')}
                                variant="outlined">
                                    <option value={values.department}>{values.department}</option>
                                    <option value='cse'>CSE</option>
                                    <option value='bba'>BBA</option>
                                    <option value='llb'>LLB</option>
                                    <option value='english'>English</option>
                            </TextField>
                            <FormControl onChange={changeValue('gender')} component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel checked={values.gender == 'female' ? true : false} value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel checked={values.gender == 'male' ? true : false} value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                            <TextField select
                                SelectProps={{ native: true }}
                                onChange={changeValue('role')}
                                variant="outlined">
                                    {
                                        values.role ?
                                        <option value={values.role} style={{textTransform: 'capitalize'}}>{values.role}</option>
                                        :
                                        <option value="">Select role</option>
                                    }
                                    <option value="lecturer">Lecturer</option>
                                    <option value="professor">Professor</option>
                                    <option value="chairman">Chairman</option>
                            </TextField>
                            <TextField value={values.address} label="Address" onChange={changeValue('address')} variant="outlined" />
                            <TextField value={values.description} label="Description" onChange={changeValue('description')} multiline rows={4} variant="outlined" />
                        </Grid>
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Save changes </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default TeacherEdit
