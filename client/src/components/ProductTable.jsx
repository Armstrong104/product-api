import { DataGrid } from '@mui/x-data-grid';

import useProducts from '../hooks/useProducts';
import { useMemo } from 'react';
import { Box, Button } from '@mui/material';

const columns = [
  { field: 'sl', headerName: 'SL', width: 90 },
  {
    field: 'name',
    headerName: 'Product name',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    type: 'number',
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 150,
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 160,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'center',
    flex: 1,
    sortable: false,
    renderCell: () => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          pt: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

export function ProductTable() {
  const { productQuery } = useProducts();

  const formattedRows = useMemo(
    () =>
      productQuery.data?.map((product, index) => ({
        id: product._id,
        sl: index + 1,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      })),
    [productQuery.data]
  );
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={productQuery.isLoading}
        rows={formattedRows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
