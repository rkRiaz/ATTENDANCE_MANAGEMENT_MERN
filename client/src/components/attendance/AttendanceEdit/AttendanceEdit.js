import React, { useEffect, useState, useRef } from 'react'
import '../Attendance.css'
import {Button, Card, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'

import Axios from 'axios'
import Headline from '../../Headline'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import FullScreenLoader  from '../../loader/FullSreenLoader'
import { useToasts } from 'react-toast-notifications';



function AttendanceEdit() {  
    const { teacherInfo } = useSelector(state => state.teacher)

    const[values, setValues] = useState({
        semester: '',
        course: '',
        present: [],
        absent: [],
        late: [],
        date: '',
        teacher: teacherInfo._id
    })
    const[loading, setLoading] = useState(true)
    const[students, setStudents] = useState([])
    const { addToast } = useToasts();
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        Axios.get(`/api/attendance/get-attendance/${id}`)
        .then(res => {
            setValues(prev => res.data.attendance)
            res.data.attendance.course.batch.map(async(b) => {
                const response = await Axios.get(`/api/student/get-students-by-batch/${b}`)
                setStudents(prev => prev.concat(response.data.students))
                setLoading(false)
            })
            
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    const getFilteredData = (date) => {
        setLoading(true)
        Axios.get(`/api/attendance/get-filter-attendances/${teacherInfo._id}?date=${date}&courseId=${values.course._id}`)
        .then(res => {
            if(res.data.attendances.length === 0) {
                addToast('Please choose correct date. No data found!', { appearance: 'error' });
            } else {
                setValues(res.data.attendances[0])
                history.push(`/attendance/edit/${res.data.attendances[0]._id}`)
            }
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    console.log(values)


    const changeValue = (name) => e => {
        if(e.target.value == 'present') {
            const items = [...values.present, name]
            setValues({ 
                ...values,
                ['present']: [...new Set(items)],
                ['absent']: values.absent.filter(a => a !== name),
                ['late']: values.late.filter(l => l !== name) 
            });
        } else if(e.target.value == 'absent') {
            const items = [...values.absent, name]
            setValues({ 
                ...values,
                ['present']: values.present.filter(p => p !== name),
                ['absent']: [...new Set(items)],
                ['late']: values.late.filter(l => l !== name)  
            })
            
        } else if(e.target.value == 'late') {
            const items = [...values.late, name]
            setValues({ 
                ...values,
                ['present']: values.present.filter(p => p !== name),
                ['late']: [...new Set(items)],
                ['absent']: values.absent.filter(a => a !== name)
            })
        } else {
            setValues({ ...values, [name]: e.target.value })
        }
    };

    const submit = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.put(`/api/attendance/edit/${values._id}`, values)
        .then(res => {
            console.log(res.data.attendance)
            alert(res.data.message)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="attendanceEdit">
            <Headline headline="Attendance Edit" title='Attendance Edit'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="attendance__inputGroup">
                            <TextField select 
                                SelectProps={{ native: true }}
                                onChange={changeValue('semester')}
                                variant="outlined">
                                    <option value={values.semester}>{values.semester}</option>
                            </TextField>
                            <TextField select 
                                SelectProps={{ native: true }}
                                variant="outlined">
                                    <option value={values.course._id}>{values.course.code}, {values.course.title}</option>
                            </TextField>
                            <TextField required onChange={e => getFilteredData(e.target.value)} value={values.date} type="date" variant="outlined" />
                        </Grid>
                        <TableContainer>
                            <Table className="attendances__table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Serial</TableCell>
                                        <TableCell>Student Id</TableCell>
                                        <TableCell>Student Name</TableCell>
                                        <TableCell>Batch</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                {
                                    loading ?
                                    <FullScreenLoader />
                                    :
                                    <TableBody className="attendances__tableBody">
                                        {
                                           students && students.map((s, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{s.student_id}</TableCell>
                                                    <TableCell>{s.name}</TableCell>
                                                    <TableCell>{s.batch}</TableCell>
                                                    <TableCell>{s.phone}</TableCell>
                                                    <TableCell>
                                                        <FormControl onChange={changeValue(s.student_id)} component="fieldset">
                                                            <RadioGroup row name="row-radio-buttons-group">
                                                                <FormControlLabel checked={values.present.includes(s.student_id) && true} value="present" control={<Radio />} label="Present" />
                                                                <FormControlLabel checked={values.absent.includes(s.student_id) && true} value="absent" control={<Radio />} label="Absent" />
                                                                <FormControlLabel checked={values.late.includes(s.student_id) && true} value="late" control={<Radio />} label="Late" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                }
                            </Table>
                        </TableContainer>


                        <Button style={{marginTop: 20}} type="submit" variant="contained" color="primary"> Save </Button>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default AttendanceEdit
