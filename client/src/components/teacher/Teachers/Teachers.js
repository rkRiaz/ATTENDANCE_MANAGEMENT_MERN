import { Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Headline from '../../Headline'
import MegaTable from './MegaTable'


import '../Teacher.css'

function Teachers() {
    const [Brands, setBrands] = useState('')
    const [totalPage, setTotalPage] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [searchTerm, setSearchTerm] = useState('')
    const [reload, setReload] = useState(false)



    useEffect(() => {
        if(searchTerm) {
            axios.get(`/api/search/get-brands-by-text-search?term=${searchTerm}`)
            .then(res => {
                setBrands(res.data.brands)
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            axios.get(`/api/brand/get-all`)
            .then(res => {
                setBrands(res.data.brands)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [reload, searchTerm])




    return (
        <div className="teachers">
            <Headline headline="All teachers" title='All teachers'/>
            <Card>
                <div className="teachers__table">
                    {
                        Brands === '' ?
                        <div className="">Loading</div>
                        :
                        // Brands.length === 0 ?
                        // <div className="">No category added</div>
                        // :
                        <MegaTable 
                            brands = { Brands } 
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

export default Teachers
