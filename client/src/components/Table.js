import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Chip } from '@material-ui/core';
import FullScreenLoader  from '../components/loader/FullSreenLoader'




const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#cfebdc",
    color: "black",
    fontWeight: "bold"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});


export const CustomizedTables = ({students, attendances}) => {
  const classes = useStyles();



  return (
    <TableContainer>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Serial No</StyledTableCell>
            <StyledTableCell>Student Id</StyledTableCell>
            <StyledTableCell>Student Name</StyledTableCell>
            {
              attendances ? attendances.map((attendance, index) => (
                <StyledTableCell key={index}>Lecture: {index+1}<br/>{attendance.date}</StyledTableCell>
              ))
              :
              <FullScreenLoader/>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length ? students.sort((a, b) => a.student_id > b.student_id && 1 || -1).map((student, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index+1}</StyledTableCell>
              <StyledTableCell>{student.student_id}</StyledTableCell>
              <StyledTableCell>{student.name}</StyledTableCell>
              {
                attendances ? attendances.map((attendance, index) => (
                  <StyledTableCell key={index}>
                    {attendance.present.includes(student.student_id) && <Chip size='small' label="Present" style={{background: "green", color: "white"}} />}
                    {attendance.absent.includes(student.student_id) && <Chip size='small' label="Absent" color='secondary' />}
                    {attendance.late.includes(student.student_id) && <Chip size='small' label="Late" color='error' />}
                  </StyledTableCell>
                ))
                :
                <FullScreenLoader/>
              }
            </StyledTableRow>
          ))
          :
          <FullScreenLoader/>
        }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
