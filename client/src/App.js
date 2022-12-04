import React from 'react';
import "./App.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import MenuSidebar from './components/sidebar/MenuSidebar'
import TopBar from './components/TopBar'

import Dashboard from './components/Dashboard'

import Login from './components/login/Login'

import StudentAdd from './components/student/StudentAdd/StudentAdd'
import StudentEdit from './components/student/StudentEdit/StudentEdit'
import Students from './components/student/Students/Students'

import TeacherAdd from './components/teacher/TeacherAdd/TeacherAdd'
import TeacherDetails from './components/teacher/TeacherDetails/TeacherDetails'
import TeacherEdit from './components/teacher/TeacherEdit/TeacherEdit'
import Teachers from './components/teacher/Teachers/Teachers'

import CourseAdd from './components/course/CourseAdd/CourseAdd'
import CourseEdit from './components/course/CourseEdit/CourseEdit'
import Courses from './components/course/Courses/Courses'

import AttendanceAdd from './components/attendance/AttendanceAdd/AttendanceAdd'
import AttendanceEdit from './components/attendance/AttendanceEdit/AttendanceEdit'
import Attendances from './components/attendance/Attendances/Attendances'
import { useSelector } from 'react-redux';



function App() {
  const { teacherLoggedIn } = useSelector(state => state.teacher)
  
  return (
    <div className="app">
      {
        !teacherLoggedIn ?
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/teacher/add" component={TeacherAdd}/>
          </Switch>
        </BrowserRouter>
        :
        <div className="app__body">
          <BrowserRouter>
              <MenuSidebar/>
              <div className="app__bodyRight">
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>

                    <Route exact path="/students" component={Students}/>
                    <Route exact path="/student/add" component={StudentAdd}/>
                    <Route exact path="/student/edit/:id" component={StudentEdit}/>

                    <Route exact path="/teachers" component={Teachers}/>
                    <Route exact path="/teacher/:id" component={TeacherDetails}/>
                    <Route exact path="/teacher/edit/:id" component={TeacherEdit}/>

                    <Route exact path="/courses" component={Courses}/>
                    <Route exact path="/course/add" component={CourseAdd}/>
                    <Route exact path="/course/edit/:id" component={CourseEdit}/>

                    <Route exact path="/attendances" component={Attendances}/>
                    <Route exact path="/attendance/add" component={AttendanceAdd}/>
                    <Route exact path="/attendance/edit/:id" component={AttendanceEdit}/>

                </Switch>
              </div>
          </BrowserRouter>
      </div> 
      }
    </div>
  );
}

export default App;
