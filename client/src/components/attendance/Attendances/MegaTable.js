import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, FormControlLabel, Switch, Box, Button, TextField, Tooltip, Typography} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import FullScreenLoader  from '../../loader/FullSreenLoader'




function MegaTable({attendances, courses, setCourseId, setDate, setPageNumberProps, totalPage, setReload}) {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);

  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [alertShow, setAlertShow] = React.useState(false)
  const rows = attendances;


  // const handleAlertShow = (e) => {
  //   e.preventDefault()
  //   setAlertShow(!alertShow)
  // }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected)
  }

  const changePage = (e, v) => {
    setPageNumber(v)
    setPageNumberProps(v)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  }

  const deleteProduct = categoryIds => e => {
    e.preventDefault()
    if(categoryIds.length === 0) {
      setAlertShow(true)
    } else {
      window.confirm("Are you sure you wish to delete this item?") &&
      categoryIds.map(id => {
        Axios.delete(`/api/attendance/delete/${id}`)
        .then(res => {
          console.log(res.data.message)
          alert(res.data.message)
          setReload(prev => !prev)
        })
      })
    }
  }


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div >
      <div >
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 15}}>
            <TextField onChange={e => setDate(e.target.value)} type="date" size="small" variant="outlined" />
            <TextField select
                SelectProps={{ native: true }} 
                onChange={e => setCourseId(e.target.value)}
                variant="outlined">
                    <option value=''>Select Course</option>
                    {
                      courses ?
                      courses.map((course, index) => (
                        <option key={index} value={course._id}>{course.code}, {course.title}</option>
                      ))
                      :
                      <option value=''>Loading</option>
                    }
            </TextField>
            <div style={{flex: 0.5}}>
              {alertShow ? <Alert onClose={() => {setAlertShow(!alertShow)}} severity="warning">Not selected any item!</Alert> : null}
            </div>
        </div>
        
        <Tooltip title="Delete category permanently"><Button onClick={deleteProduct(selected)} size='small' style={{float: 'right', margin: 20}} variant="outlined" color="secondary" startIcon={<DeleteOutlined />}>
           Delete 
        </Button></Tooltip> 


      
        <TableContainer className="megatable__body">
          <Table size={dense ? 'small' : 'medium'}>
            <TableBody>
              <TableRow>
                  <TableCell style={{fontWeight: 700}}>Select</TableCell>
                  <TableCell style={{fontWeight: 700}}>Semester</TableCell>
                  <TableCell style={{fontWeight: 700}}>Course</TableCell>
                  <TableCell style={{fontWeight: 700}}>Batch</TableCell>
                  <TableCell style={{fontWeight: 700}}>Date</TableCell>
                  <TableCell style={{fontWeight: 700}}>Present</TableCell>
                  <TableCell style={{fontWeight: 700}}>Absent</TableCell>
                  <TableCell style={{fontWeight: 700}}>Late</TableCell>
                  <TableCell style={{fontWeight: 700}}>Actions</TableCell>
                </TableRow>
                { 
                
                rows ?
                 rows.length === 0 
                 ?
                 <Typography variant="h6" color="initial">No items found in the filter</Typography>
                 :
                  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow hover onClick={(event) => handleClick(event, row._id)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row._id} selected={isItemSelected}>
                        <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }}/></TableCell>
                        <TableCell id={labelId} scope="row" padding="none">{row.semester}</TableCell>
                        <TableCell>{row.course.code}, {row.course.title}</TableCell>
                        <TableCell>{row.course.batch.map((b, i) => ((i ? ', ': '') + b))}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.present.length}</TableCell>
                        <TableCell>{row.absent.length}</TableCell>
                        <TableCell>{row.late.length}</TableCell>

                        <TableCell>
                          <Link to={`/attendance/edit/${row._id}`}>
                              <Button size='small' style={{marginLeft: 10}} variant="outlined" color="primary" startIcon={<Edit />}>
                                Edit 
                              </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                :
                <FullScreenLoader />
                }

           
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Pagination 
            count={totalPage} color="primary" 
            page={pageNumber} 
            onChange={changePage}
          />
        </Box>

      </div>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    </div>
  );
}

export default MegaTable