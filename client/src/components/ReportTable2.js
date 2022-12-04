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
    minWidth: 900
  },
});


export const ReportTable2 = ({students, attendances, presents, absents, lates}) => {
  const classes = useStyles();

  console.log(lates)

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Serial No</StyledTableCell>
            <StyledTableCell>Student Id</StyledTableCell>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell>Total Lecture</StyledTableCell>
            <StyledTableCell>Total Present</StyledTableCell>
            <StyledTableCell>Total Absent</StyledTableCell>
            <StyledTableCell>Total Late</StyledTableCell>
            <StyledTableCell>Present Percentage</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length ? students.sort((a, b) => a.student_id > b.student_id && 1 || -1).map((student, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index+1}</StyledTableCell>
              <StyledTableCell>{student.student_id}</StyledTableCell>
              <StyledTableCell>{student.name}</StyledTableCell>
              <StyledTableCell>{attendances.length}</StyledTableCell>
              <StyledTableCell>{presents[student.student_id] ? presents[student.student_id] : 0}</StyledTableCell>
              <StyledTableCell>{absents[student.student_id] ? absents[student.student_id] : 0}</StyledTableCell>
              <StyledTableCell>{lates[student.student_id] ? lates[student.student_id] : 0}</StyledTableCell>
              <StyledTableCell>
              <Chip size='small' 
                    label={`${presents[student.student_id] ? Math.ceil(presents[student.student_id]/attendances.length*100) : 0} %`}
                    style={{background: "green", color: "white"}} />
                
              </StyledTableCell>
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
