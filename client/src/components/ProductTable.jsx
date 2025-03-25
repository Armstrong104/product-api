import { DataGrid } from '@mui/x-data-grid';

import useProducts from '../hooks/useProducts';
import { useMemo } from 'react';
import { Box, Button } from '../ui';
import appConfig from '../config/appConfig';

export function ProductTable({ onEdit, onEditClick }) {
  const { productQuery, productDeleteMutation } = useProducts();

  const handleEdit = (product) => {
    onEdit(product);
    onEditClick(true);
  };

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
      renderCell: ({ row }) => {
        console.log(row);
        return (
          <Box height={200}>
            <img src={`${appConfig.BASE_URL}${row.image}`} alt={row.name} style={{ height: '100px'}}/>
          </Box>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
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
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              if (
                window.confirm('Are you sure you want to delete this product?')
              ) {
                productDeleteMutation.mutate(params.row.id);
              }
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

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
        rowHeight={150}
      />
    </Box>
  );
}
