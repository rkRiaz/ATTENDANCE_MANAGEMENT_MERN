import React, { useEffect, useState } from 'react'
import '../Course.css'
import { Box, Button, Card, Grid, TextField, Chip } from '@material-ui/core'
import Axios from 'axios'
import Headline from '../../Headline'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';


function CourseEdit() {  
    const { teacherInfo } = useSelector(state => state.teacher)

    const[values, setValues] = useState({
        code: '',
        title: '',
        semester: '',
        batch: [],
        teacher: teacherInfo._id
    })
    const { id } = useParams()

    useEffect(() => {
        Axios.get(`/api/course/get-course/${id}`)
        .then(res => {
            setValues(prev => res.data.course)
            console.log(res.data.course)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    
    const changeValue = name => e => {
        if(name == 'batch') {
            if(e.target.value) {
                const tags = [...values.batch, e.target.value]
                setValues({ ...values, [name]: [...new Set(tags)] });
            }
        } else if(name == 'code') {
            setValues({ ...values, [name]: e.target.value.toUpperCase()})
        } else {
            setValues({ ...values, [name]: e.target.value });
        }
    };

    const removeTag = (e, name) => {
        e.preventDefault()
        const tags = values.batch.filter(b => b !== name)
        setValues({ ...values, 'batch': tags });
    }


    const submit = (e) => {
        e.preventDefault()
        Axios.put(`/api/course/edit/${id}`, values)
        .then(res => {
            console.log(res.data.course)
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="courseEdit">
            <Headline headline="Course Edit" title='Course Edit'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="course__inputGroup">
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('semester')}
                                variant="outlined">
                                    <option value={values.semester}>{values.semester}</option>
                                    <option value='fall-21'>fall-21</option>
                            </TextField>
                            <TextField error={false} helperText={"Name required"} required value={values.code} label="Course Code" onChange={changeValue('code')} variant="outlined" />
                            <TextField required value={values.title}  label="Course Title" onChange={changeValue('title')} variant="outlined" />
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('batch')}
                                variant="outlined">
                                    <option value=''>Select batch</option>
                                    <option value='spring-19'>spring-19</option>
                                    <option value='fall-19'>fall-19</option>
                                    <option value='summer-21'>summer-19</option>
                            </TextField>
                            <Box sx={{ display: 'flex' }}>
                                {  
                                    values.batch.map((b, i) => (
                                        <Chip key={i} label={b} variant="outlined" onDelete={e => removeTag(e, b)} />
                                    ))
                                }
                            </Box>
                        
            
                        </Grid>
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Save changes </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default CourseEdit
