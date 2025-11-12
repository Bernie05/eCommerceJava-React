import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { AppSellerProductState, fetchSellerProducts } from '../../../state/seller/sellerProductSlice';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const sellerProducts = useAppSelector(AppSellerProductState);

  useEffect(() => {
    const getToken = localStorage.getItem("jwt") || '';

    dispatch(fetchSellerProducts(getToken));
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Images</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Update Stock</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProducts.products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell component="th" scope="row">
                <div className='flex gap-1 flex-wrap'>
                  {product.images.map((image) => (
                    <img
                      className='w-16 h-16 object-cover rounded-md'
                      src={image} 
                      alt={product.title} 
                    />
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">{product.title}</StyledTableCell>
              <StyledTableCell align="right">{product.mrpPrice}</StyledTableCell>
              <StyledTableCell align="right">{product.sellingPrice}</StyledTableCell>
              <StyledTableCell align="right">{product.color}</StyledTableCell>
              <StyledTableCell align="right">
                {
                  <Button size="small">
                    in_stock
                  </Button>
                }
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  <IconButton size="small" color='primary'>
                      <Edit />
                  </IconButton>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
