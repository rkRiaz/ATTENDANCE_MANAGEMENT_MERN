import { Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'
import MegaTable from './MegaTable'


import '../Course.css'
import { useSelector } from 'react-redux'

function Courses() {
    const { teacherInfo } = useSelector(state => state.teacher)

    const [courses, setCourses] = useState('')
    const [totalPage, setTotalPage] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [reload, setReload] = useState(false)


    useEffect(() => {
        axios.get(`/api/course/get-courses-by-teacher-id/${teacherInfo._id}`)
        .then(res => {
            setCourses(res.data.courses)
        })
        .catch(err => {
            console.log(err)
        })
    }, [reload])


    return (
        <div className="courses">
            <Headline headline="All Courses" title='All Courses'/>
            <Card>
                <div className="course__table">
                    {
                        courses === '' ?
                        <div className="">Loading</div>
                        :
                        // courses.length === 0 ?
                        // <div className="">No category added</div>
                        // :
                        <MegaTable 
                            courses = { courses } 
                            setPageNumberProps={setPageNumber} 
                            setSearchTerm={setSearchTerm}
                            totalPage={totalPage}
                            setReload={setReload}
                        />
                    }
                </div>
            </Card>
        </div>
    )
}

export default Courses
