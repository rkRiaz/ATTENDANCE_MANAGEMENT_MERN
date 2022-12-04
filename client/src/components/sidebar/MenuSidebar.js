import React, {useEffect, useState} from 'react'
import './MenuSidebar.css'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {ExpandMoreOutlined,
        ExpandLessOutlined,
        HomeOutlined,
        SupervisorAccountOutlined,
        PermIdentity,
        AttachMoneyOutlined,
        QuestionAnswerOutlined,
        PhoneIphoneOutlined,
        EmailOutlined,
        } from '@material-ui/icons';
import { useSelector } from 'react-redux';

    
const SideBar = () => {
    const { teacherInfo } = useSelector(state => state.teacher)
    const [open, setOpen] = useState({
        dashboardDrawer: true,
        teacherDrawer: false,
        courseDrawer: false,
        attendanceDrawer: false,
        studentDrawer: false,
        paymentDrawer: false
    })

    const history = useHistory()

    useEffect(() => {
        if(history.location.pathname !== "/") {
            setOpen({
                dashboardDrawer: false
            })
        }
    }, [])

    const openDrawer = type => e => {
        e.preventDefault()

        if(type === 'dashboardDrawer') {
            setOpen({[type]: true})
            history.push('/')
        }

        if(window.innerWidth > 1024) {
            switch(type) {
                case 'teacherDrawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.teacherDrawer})
                break
                case 'courseDrawer':
                    setOpen({...open, dashboardDrawer: false, [type]: !open.courseDrawer})
                break
                case 'attendanceDrawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.attendanceDrawer})
                break
                case 'studentDrawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.studentDrawer})
                break
                case 'paymentDrawer':
                    setOpen({...open, dashboardDrawer: false, [type]: !open.paymentDrawer})
                break  
            }
        } else {
            switch(type) {
                case 'teacherDrawer':
                    setOpen({dashboardDrawer: false, [type]: !open.teacherDrawer})
                break
                case 'courseDrawer':
                    setOpen({...open, dashboardDrawer: false, [type]: !open.courseDrawer})
                break
                case 'attendanceDrawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.attendanceDrawer})
                break
                case 'studentDrawer':
                    setOpen({ ...open, dashboardDrawer: false, [type]: !open.studentDrawer})
                break
                case 'paymentDrawer':
                    setOpen({dashboardDrawer: false, [type]: !open.paymentDrawer})
                break
            }
        }
    };


    return (
        <div className="sidebar">
            <Link to="/" className="sidebar__logo">
                <PermIdentity/> Admin Panel 
            </Link>
            <div className="sidebar__item">
                <div onClick={openDrawer('dashboardDrawer')} className={`sidebar__itemIcon ${open.dashboardDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <HomeOutlined /> <span> Dashboard </span>
                    </div>
                </div>
            </div>
            <div className="sidebar__item">
                <div onClick={openDrawer('teacherDrawer')} className={`sidebar__itemIcon ${open.teacherDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <SupervisorAccountOutlined/> <span> Teacher </span>
                    </div>
                    <span> {open.teacherDrawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.teacherDrawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/teachers">teachers</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to={`/teacher/${teacherInfo._id}`}>teacher Detail</NavLink>
                </div>
            </div>
            <div className="sidebar__item">
                <div onClick={openDrawer('courseDrawer')} className={`sidebar__itemIcon ${open.courseDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <AttachMoneyOutlined /> <span> courses </span>
                    </div>
                    <span> {open.courseDrawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.courseDrawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/courses">courses</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/course/add">course Add</NavLink>
                </div>
            </div>
            <div className="sidebar__item">
                <div onClick={openDrawer('attendanceDrawer')} className={`sidebar__itemIcon ${open.attendanceDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <SupervisorAccountOutlined/> <span> attendance </span>
                    </div>
                    <span> {open.attendanceDrawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.attendanceDrawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/attendances">all attendance</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/attendance/add">attendance Add</NavLink>
                </div>
            </div>
            <div className="sidebar__item">
                <div onClick={openDrawer('studentDrawer')} className={`sidebar__itemIcon ${open.studentDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <SupervisorAccountOutlined/> <span> Student </span>
                    </div>
                    <span> {open.studentDrawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.studentDrawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/students">All students</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="/student/add">Student Add</NavLink>
                </div>
            </div>
            <div className="sidebar__item">
                <div onClick={openDrawer('paymentDrawer')} className={`sidebar__itemIcon ${open.paymentDrawer && 'sidebar__itemIconBg'}`}>
                    <div className="sidebar__itemIconLeft">
                        <AttachMoneyOutlined /> <span> Payments </span>
                    </div>
                    <span> {open.paymentDrawer ? <ExpandLessOutlined/> : <ExpandMoreOutlined/>} </span>
                </div>
                <div className={`sidebar__itemDrawer ${open.paymentDrawer && 'sidebar__itemDrawerOpen'}`}>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="#">Add Payment</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="#">All Payments</NavLink>
                    <NavLink activeClassName="sidebar__itemDrawerActive" to="#">Payment Invoice</NavLink>
                </div>
            </div>



            <div className="sidebar__contact">
                <div className="sidebar__contactHeading">
                    <QuestionAnswerOutlined /> Need Help
                </div>
                <div className="sidebar__contactItem">
                    <PhoneIphoneOutlined /> +880 {" "} 16846 {" "} 80383
                </div>
                <div className="sidebar__contactItem">
                    <EmailOutlined /> mdriaz9587@gmail.com
                </div>
                <div className="sidebar__contactItem">
                    Copy Rights &copy; 2022
                </div>
            </div>

        </div>
    )
}

export default SideBar
