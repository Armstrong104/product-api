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
  image: '',
};

function App() {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { productCreateMutation, productUpdateMutation } = useProducts();

  const handleDrawerClose = () => {
    setOpen(false);
    setEditProduct(null);
  };

  const handleSubmit = async (payload) => {
    if (editProduct) {
      await productUpdateMutation.mutateAsync({
        id: editProduct.id,
        payload,
      });
    } else {
      await productCreateMutation.mutateAsync(payload);
    }
    handleDrawerClose();
  };

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
        <ProductTable onEdit={setEditProduct} onEditClick={setOpen} />
        <Drawer anchor={'right'} open={open} onClose={handleDrawerClose}>
          <Box sx={{ width: 500, p: 2 }}>
            <ProductForm
              placeholder={editProduct || productPlaceholder}
              onSubmit={handleSubmit}
            />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

export default App;
