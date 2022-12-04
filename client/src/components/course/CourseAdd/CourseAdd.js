import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Card, Chip, Grid, TextField } from '@material-ui/core'


import Axios from 'axios'
import Headline from '../../Headline'
import '../Course.css'
import { useSelector } from 'react-redux';

function CourseAdd() {  
    const { teacherInfo } = useSelector(state => state.teacher)
    const[values, setValues] = useState({
        code: '',
        title: '',
        semester: 'fall-21',
        batch: [],
        teacher: teacherInfo._id
    })

    console.log(values)

    useEffect(() => {
        // Axios.get('/api/category/get-all')
        // .then(res => {
        //     setCategories(res.data.categories)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
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
        Axios.post(`/api/course/add`, values)
        .then(res => {
            console.log(res.data)
            alert(`Added successfully`)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="courseAdd">
            <Headline headline="Course Add" title='Course Add'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="course__inputGroup">
                            <TextField select
                                required 
                                label="Semester" 
                                SelectProps={{ native: true }}
                                onChange={changeValue('semester')}
                                variant="outlined">
                                    <option value='fall-21'>Fall-21</option>
                                    <option value='spring-22'>Spring-22</option>
                            </TextField>
                            <TextField error={false} helperText={false ? "Name required" : null} required placeholder="CSE-330" label="Course Code" onChange={changeValue('code')} variant="outlined" />
                            <TextField required placeholder="Computer Networks" label="Course Title" onChange={changeValue('title')} variant="outlined" />
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
                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Add Course </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default CourseAdd
