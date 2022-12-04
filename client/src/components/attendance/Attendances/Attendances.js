import { Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'
import MegaTable from './MegaTable'


import '../Attendance.css'
import { useSelector } from 'react-redux'

function Attendances() {
    const { teacherInfo } = useSelector(state => state.teacher)

    const [attendances, setAttendances] = useState('')
    const [courses, setCourses] = useState('')

    const [totalPage, setTotalPage] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [date, setDate] = useState('')
    const [courseId, setCourseId] = useState('')

    const [reload, setReload] = useState(false)

    console.log(courseId)

    useEffect(() => {
        setAttendances('')
        axios.get(`/api/attendance/get-filter-attendances/${teacherInfo._id}?date=${date}&courseId=${courseId}`)
        .then(res => {
            console.log(res.data.attendances)
            setAttendances(res.data.attendances)
        })
        .catch(err => {
            console.log(err.statusCode)
        })
    }, [reload, date, courseId])

    useEffect(() => {
        axios.get(`/api/course/get-courses-by-teacher-id/${teacherInfo._id}`)
        .then(res => {
            setCourses(res.data.courses)
        })
        .catch(err => {
            // alert(err.message)
            // console.log(err.message)
        })
    }, [reload])

 
    return (
        <div className="attendances">
            <Headline headline="All attendances" title='All attendances'/>
            <Card>
                <div className="attendances__table">
                    <MegaTable 
                        attendances = { attendances } 
                        setCourseId = { setCourseId }
                        courses = { courses }
                        setPageNumberProps={setPageNumber} 
                        setDate={setDate}
                        totalPage={totalPage}
                        setReload={setReload}
                    />
                </div>
            </Card>
        </div>
    )
}

export default Attendances
