import { Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Typography } from '@material-ui/core'
import { GetAppOutlined, PictureAsPdfOutlined, PrintOutlined } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import user from '../../../assets/images/user.png'
import Headline from '../../Headline'
import '../Teacher.css'

function TeacherDetails() {
    const[values, setValues] = useState({
        name: '',
        id: '',
        phone: '',
        role: ''
    })

    let { id } = useParams()

    useEffect(() => {
        axios.get(`/api/teacher/get-teacher-by-id/${id}`)
        .then(res => {
            setValues(prev => res.data.teacher)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
 

    return (
        <div className="teacherDetails">
            <Headline headline="teacher Details" title='teacher Details'/>
            <Card className="teacherDetails__firstRow">
                <div style={{color: "#E57498", paddingBottom: 10, borderBottom: '1px solid rgb(240, 236, 236)'}}>
                    <Typography variant="h5">Teacher Details</Typography>
                </div>
                <div className="teacherDetails__firstRowBody">
                    <div className="teacherDetails__firstRowBodyLeft">
                        <CardActionArea>
                            <CardMedia
                            component = 'img'
                            // height = '140'
                            image={user}
                            title="User Image"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {values.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{values.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to={`/teacher/edit/${id}`}>
                                <Button size="small" color="default" variant="contained">
                                    Edit
                                </Button>
                            </Link>
                            <Button size="small" color="secondary" variant="contained">
                                Delete
                            </Button>
                        </CardActions>
                    </div>
                    <div className="teacherDetails__firstRowBodyRight">
                        <div className="teacherDetails__firstRowBodyRightTableScroll">
                            <table className="teacherDetails__firstRowBodyRightTable">
                                <tr>
                                    <td>Id</td>
                                    <td>{values.id}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{values.role}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{values.gender}</td>
                                </tr> 
                                <tr>
                                    <td>Department</td>
                                    <td style={{textTransform: 'uppercase'}}>{values.department}</td>
                                </tr> 
                                <tr>
                                    <td>Address</td>
                                    <td>{values.address}</td>
                                </tr> 
                                <tr>
                                    <td>Phone</td>
                                    <td>{values.phone}</td>
                                </tr> 
                                <tr>
                                    <td>Email</td>
                                    <td>{values.email}</td>
                                </tr>
                            </table>
                        </div>

    
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default TeacherDetails
