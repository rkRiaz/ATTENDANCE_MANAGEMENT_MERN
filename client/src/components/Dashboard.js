import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Headline from './Headline'
import {CustomizedTables} from './Table'
import {Card, TextField, Typography} from '@material-ui/core';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { ReportTable2 } from './ReportTable2';


const Dashboard = React.memo(() => {
    const { teacherInfo } = useSelector(state => state.teacher)
    const [attendances, setAttendances] = useState('')
    const[students, setStudents] = useState([])
    const[courses, setCourses] = useState('')
    const { addToast } = useToasts();
    const [presents, setPresents] = useState([])
    const [absents, setAbsents] = useState([])
    const [lates, setLates] = useState([])
    const [finalPresentsArray, setFinalPresentsArray] = useState([])
    // const [finalAbsentsArray, setFinalAbsentsArray] = useState([])




    useEffect(() => {
        setPresents(prev => [])
        setAbsents(prev => [])
        setLates(prev => [])
        const fetchData = async() => {
            const response1 = await axios.get(`/api/course/get-courses-by-teacher-id/${teacherInfo._id}`)
            setCourses(response1.data.courses)
            const response2 = await axios.get(`/api/attendance/get-filter-attendances/${teacherInfo._id}?courseId=${response1.data.courses[0]._id}`)
            setAttendances(response2.data.attendances)
            response2.data.attendances.map(attendance => {
                setPresents(prev => prev.concat(attendance.present))
                setAbsents(prev => prev.concat(attendance.absent))
                setLates(prev => prev.concat(attendance.late))
            })
            response2.data.attendances[0].course.batch.map(async(b) => {
                const response3 = await axios.get(`/api/student/get-students-by-batch/${b}`)
                setStudents(prev => prev.concat(response3.data.students))

            })
        }
        fetchData()
    }, [])

    // console.log(finalAbsentsArray)

    const getFilteredData = async(courseId) => {
        setPresents(prev => [])
        setAbsents(prev => [])
        setLates(prev => [])
        setStudents(prev => [])
        const response = await axios.get(`/api/attendance/get-filter-attendances/${teacherInfo._id}?courseId=${courseId}`)
        setAttendances(response.data.attendances)
        response.data.attendances.map(attendance => {
            setPresents(prev => prev.concat(attendance.present))
            setAbsents(prev => prev.concat(attendance.absent))
            setLates(prev => prev.concat(attendance.late))
        })
        response.data.attendances[0].course.batch.map(async(b) => {
            const response = await axios.get(`/api/student/get-students-by-batch/${b}`)
            setStudents(prev => prev.concat(response.data.students))
        })
    }

    return (
        <div className="dashboard">
            <Headline headline="Quick Statistics" title="Dashboard"/>
            <div className="dashboard__body">

                <Card className="dashboard__bodyThirdRow">
                    <div style={{color: "#E57498", marginTop: 10, borderBottom: '1px solid rgb(240, 236, 236)'}}>
                        <Typography variant="h5">Attendance Report</Typography>
                    </div>
                    <form>
                    <TextField select required style={{marginTop: 10, marginBottom: 10,  marginRight: 10}}
                        SelectProps={{ native: true }}
                        onChange={e => getFilteredData(e.target.value)}
                        variant="outlined">
                            <option value="fall-21">Fall-21</option>
                            {/* {
                                courses && courses.filter(course => course._id !== courses[0]._id).map((c, i) => (
                                    <option key={i} value={c._id}>{c.code}, {c.title}</option>
                                ))
                            } */}
                    </TextField>
                    <TextField select required style={{marginTop: 10, marginBottom: 10}}
                        SelectProps={{ native: true }}
                        onChange={e => getFilteredData(e.target.value)}
                        variant="outlined">
                            <option value={courses && courses[0]._id}>{courses && courses[0].code}, {courses && courses[0].title}</option>
                            {
                                courses && courses.filter(course => course._id !== courses[0]._id).map((c, i) => (
                                    <option key={i} value={c._id}>{c.code}, {c.title}</option>
                                ))
                            }
                    </TextField>
                    </form>
                    <div className='dashboard__bodyThirdRowTable'>
                        <CustomizedTables students={students} attendances={attendances} />
                    </div>
                    <div style={{color: "#E57498", marginTop: 10, marginBottom: 10, borderBottom: '1px solid rgb(240, 236, 236)'}}>
                        <Typography variant="h5">Attendance Result</Typography>
                    </div>
                    <div className='dashboard__bodyThirdRowTable'>
                        <ReportTable2 students={students} attendances={attendances} 
                            presents={presents.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {})}
                            absents={absents.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {})}
                            lates={lates.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {})}
                        />
                    </div>
                </Card>

            
            </div>
        </div>
    )
})

export default Dashboard
