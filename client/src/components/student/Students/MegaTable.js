import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, FormControlLabel, Switch, Box, Button, TextField, Tooltip, Typography} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import {  DeleteOutlined, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios'



function MegaTable({students, setSearchTerm, setPageNumberProps, totalPage, setReload}) {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);

  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [alert, setAlert] = React.useState(false)
  const rows = students;


  // const handleAlert = (e) => {
  //   e.preventDefault()
  //   setAlert(!alert)
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

  const deleteProduct = ids => e => {
    e.preventDefault()
    if(ids.length === 0) {
      setAlert(true)
    } else {
      window.confirm("Are you sure you wish to delete this item?") &&
      ids.map(id => {
        Axios.delete(`/api/student/delete/${id}`)
        .then(res => {
          console.log(res.data.message)
          setReload(prev => !prev)
        })
        .catch(err => {
          console.log(err.message)
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
              {alert ? <Alert onClose={() => {setAlert(!alert)}} severity="warning">Not selected any product!</Alert> : null}
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
                  <TableCell style={{fontWeight: 700}}>Student Id</TableCell>
                  <TableCell style={{fontWeight: 700}}>Name</TableCell>
                  <TableCell style={{fontWeight: 700}}>Department</TableCell>
                  <TableCell style={{fontWeight: 700}}>Batch</TableCell>
                  <TableCell style={{fontWeight: 700}}>Phone</TableCell>
                  <TableCell style={{fontWeight: 700}}>Email</TableCell>
                  <TableCell style={{fontWeight: 700}}>Actions</TableCell>
                </TableRow>
                { rows.length === 0 ? <Typography variant="h6" color="initial">No brand found in the filter</Typography> 
                :
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow hover onClick={(event) => handleClick(event, row._id)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row._id} selected={isItemSelected}>
                        <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }}/></TableCell>
                        <TableCell id={labelId} scope="row" padding="none">{row.student_id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.batch}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <Link to={`/student/edit/${row._id}`}>
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