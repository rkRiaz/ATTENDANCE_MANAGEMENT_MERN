import React from 'react'
import './TopBar.css'
import { 
         LocalHospitalOutlined,
         MenuOutlined, 
         SearchOutlined, 
         PersonOutlineOutlined,
         FullscreenOutlined,
         NotificationsOutlined,
         ExitToApp
        } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import * as Types from '../store/actions/types';
import { useHistory } from 'react-router-dom'


          
function TopBar() {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = (e) => {
        dispatch({
            type: Types.SET_TEACHER,
            payload: {
                teacherInfo: {}
            }
        })
        history.push('/')
    }
    return (
        <div className="topbar">
            <div className="topbar__logo">
                <LocalHospitalOutlined/> HMS 
            </div>
            <div className="topbar__icons">
                <MenuOutlined className="topbar__iconsBurgerIcon"/>
                <FullscreenOutlined/>
                <SearchOutlined/>
                <NotificationsOutlined/>
                <PersonOutlineOutlined />
                <ExitToApp onClick={logout}/>
            </div>
        </div>
    )
}

export default TopBar


