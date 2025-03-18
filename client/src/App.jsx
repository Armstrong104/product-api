import { Box, Button, Drawer } from '@mui/material';
import './App.css';
import { ProductForm, ProductTable } from './components';
import { useState } from 'react';
import useProducts from './hooks/useProducts';

const productPlaceholder = {
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  imageUrl: '',
};

function App() {
  const [open, setOpen] = useState(false);
  const { productCreateMutation } = useProducts();
  return (
    <Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-end"
        p={2}
        onClick={() => setOpen(true)}
      >
        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
      <Box>
        <ProductTable />
        <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 500, p: 2 }}>
            <ProductForm
              placeholder={productPlaceholder}
              onSubmit={(payload) =>
                productCreateMutation
                  .mutateAsync(payload)
                  .finally(() => setOpen(false))
              }
            />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

export default App;
