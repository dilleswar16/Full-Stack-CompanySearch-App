import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const TableData = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, props.item.length - page * rowsPerPage);
  
  return (
    <div className='container my-3'>
         <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell  align="left"><h6 className="font-weight-bold">#</h6></TableCell>
            <TableCell  align="center"><h6 className="font-weight-bold">Company Name</h6></TableCell>
            <TableCell align="center"><h6 className="font-weight-bold">Company ID</h6></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.item
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((company, index) => (
              <TableRow key={company.companyName}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell key={company.companyName} align="center">{company.companyName}</TableCell>
                <TableCell key={company.companyId} align="center">{company.companyId}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.item.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>

    </div>
  )
}

export default TableData