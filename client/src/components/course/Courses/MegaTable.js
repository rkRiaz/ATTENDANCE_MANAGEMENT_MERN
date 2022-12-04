import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, FormControlLabel, Switch, Box, Button, TextField, Tooltip, Typography, Chip, TableHead} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'




function MegaTable({courses, setSearchTerm, setPageNumberProps, totalPage, setReload}) {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);

  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [alertShow, setAlertShow] = React.useState(false)
  const rows = courses;


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

  const deleteProduct = subcategoryIds => e => {
    e.preventDefault()
    if(subcategoryIds.length === 0) {
      setAlertShow(true)
    } else {
      window.confirm("Are you sure you wish to delete this item?") &&
      subcategoryIds.map(id => {
        Axios.delete(`api/course/delete/${id}`)
        .then(res => {
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
            <TextField onChange={e => setSearchTerm(e.target.value)} style={{flex: 0.5}} label="Search Product" size="small" variant="outlined" />
            <div style={{flex: 0.5}}>
              {alertShow ? <Alert onClose={() => {setAlertShow(!alertShow)}} severity="warning">Not selected any item!</Alert> : null}
            </div>
        </div>
        
        <Tooltip title="Delete category permanently"><Button onClick={deleteProduct(selected)} size='small' style={{float: 'right', margin: 20}} variant="outlined" color="secondary" startIcon={<DeleteOutlined />}>
           Delete 
        </Button></Tooltip> 
      
        <TableContainer className="megatable__body">
          <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Course Title</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { rows.length === 0 ? <Typography variant="h6" color="initial">No courses found in the filter</Typography> 
                :
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow hover onClick={(event) => handleClick(event, row._id)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row._id} selected={isItemSelected}>
                        <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }}/></TableCell>
                        <TableCell id={labelId} scope="row" padding="none">{row._id}</TableCell>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.semester}</TableCell>
                        <TableCell>{row.batch.map(b => (<Chip label={b} />))}</TableCell>

                        <TableCell>
                          <Link to={`/course/edit/${row._id}`}>
                              <Button size='small' style={{marginLeft: 10}} variant="outlined" color="primary" startIcon={<Edit />}>
                                Edit 
                              </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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