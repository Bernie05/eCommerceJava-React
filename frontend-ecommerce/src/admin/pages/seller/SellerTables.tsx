import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.body`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const accStatus = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "",
  },
  {
    status: "CLOSED",
    title: "Close",
    description: "",
  },
];
const SellerTables = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");

  const handleChange = (event: SelectChangeEvent) => {
    setAccountStatus(event.target.value as string);
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="account-status">Account Status</InputLabel>
          <Select
            labelId="account-status"
            id="account-status"
            label="Account Status"
            value={accountStatus}
            onChange={handleChange}
          >
            {accStatus.map(({ status, title }) => (
              <MenuItem value={status}>{title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* table */}
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Order Id</StyledTableCell>
                <StyledTableCell align="left">Products</StyledTableCell>
                <StyledTableCell align="right">
                  Shipping Address
                </StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default SellerTables;
