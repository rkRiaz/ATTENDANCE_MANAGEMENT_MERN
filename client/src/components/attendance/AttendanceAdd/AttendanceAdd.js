import React, { useEffect, useState, useRef } from 'react'
import '../Attendance.css'
import {Button, Card, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import Axios from 'axios'
import Headline from '../../Headline'
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import FullScreenLoader from '../../loader/FullSreenLoader'


function AttendanceAdd() {  
    const { teacherInfo } = useSelector(state => state.teacher)

    const[values, setValues] = useState({
        semester: 'fall-21',
        course: '',
        present: [],
        absent: [],
        late: [],
        date: new Date().toJSON().slice(0,10),
        teacher: teacherInfo._id
    })
    const[loading, setLoading] = useState(true)
    const[courses, setCourses] = useState([])
    const[students, setStudents] = useState([])
    const { addToast } = useToasts();

    

    useEffect(() => {
        Axios.get(`/api/course/get-courses-by-teacher-id/${teacherInfo._id}`)
        .then(res => {
            // console.log(res.data.courses.map(c => c.batch))
            setCourses(prev => res.data.courses)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        // setValues({
        //     ...values,
        //     present: [],
        //     absent: [],
        //     late: [],
        // })
        setStudents(prev => [])
        const filterData = courses.filter(c => c._id == values.course)
        if(filterData.length !== 0) {
            filterData[0].batch.map(async(b) => {
                const response = await Axios.get(`/api/student/get-students-by-batch/${b}`)
                
                setStudents(prev => prev.concat(response.data.students))
                setLoading(false)
            })
        }
    }, [values.course])

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
        Axios.post(`/api/attendance/add`, values)
        .then(res => {
            addToast(res.data.message, { appearance: 'success' });
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="attendanceAdd">
            <Headline headline="Attendance Add" title='Attendance Add'/>
            <Card>
                <form onSubmit={submit}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} className="attendance__inputGroup">
                            <TextField select required
                                SelectProps={{ native: true }}
                                onChange={changeValue('semester')}
                                variant="outlined">
                                    <option value={values.semester}>Fall-21</option>
                            </TextField>
                            <TextField select required
                                SelectProps={{ native: true }}
                                onChange={changeValue('course')}
                                variant="outlined">
                                    <option value=''>Select course</option>
                                    {
                                        courses && courses.map((c, i) => (
                                            <option key={i} value={c._id}>{c.code}, {c.title}</option>
                                        ))
                                    }
                            </TextField>
                            <TextField required value={values.date} type="date" onChange={changeValue('date')} variant="outlined" />
                        </Grid>
                        <TableContainer>
                            <Table >
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
                                            students.length === 0 ?
                                            <div> Please select course </div>
                                            :
                                            students.map((s, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{s.student_id}</TableCell>
                                                    <TableCell>{s.name}</TableCell>
                                                    <TableCell>{s.batch}</TableCell>
                                                    <TableCell>{s.phone}</TableCell>
                                                    <TableCell>
                                                        <FormControl required onChange={changeValue(s.student_id)} component="fieldset">
                                                            <RadioGroup row name="row-radio-buttons-group">
                                                                <FormControlLabel value="present" control={<Radio />} label="Present" />
                                                                <FormControlLabel value="absent" control={<Radio />} label="Absent" />
                                                                <FormControlLabel value="late" control={<Radio />} label="Late" />
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

export default AttendanceAdd
