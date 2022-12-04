import { Box, Button, ButtonGroup, Card, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'
import MegaTable from './MegaTable'


import '../Student.css'

function Students() {
    const [students, setStudents] = useState('')
    const [totalPage, setTotalPage] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [searchTerm, setSearchTerm] = useState('')
    const [reload, setReload] = useState(false)



    useEffect(() => {
            axios.get(`/api/student/all`)
            .then(res => {
                setStudents(res.data.students)
            })
            .catch(err => {
                console.log(err)
            })
        
    }, [reload])




    return (
        <div className="students">
            <Headline headline="All Students" title='All Students'/>
            <Card>
                <div className="students__table">
                    {
                        students === '' ?
                        <div className="">Loading</div>
                        :
                        // Brands.length === 0 ?
                        // <div className="">No category added</div>
                        // :
                        <MegaTable 
                            students = { students } 
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

export default Students
