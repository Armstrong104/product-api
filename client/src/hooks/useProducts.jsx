import http from '../config/http';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useProducts() {
  const PRODUCT_QUERY_KEY = 'products';
  const queryClient = useQueryClient();
  const productQuery = useQuery({
    queryKey: [PRODUCT_QUERY_KEY],
    queryFn: () => fetchProducts(),
  });

  const productCreateMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT_QUERY_KEY);
      alert('Product created successfully');
    },
    onError: (error) => {
      alert('Product creation failed');
      console.error(error);
    },
  });

  const productUpdateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT_QUERY_KEY);
      alert('Product updated successfully');
    },
    onError: (error) => {
      alert('Product update failed');
      console.error(error);
    },
  });

  const productDeleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT_QUERY_KEY);
      alert('Product deleted successfully');
    },
    onError: (error) => {
      alert('Product deletion failed');
      console.error(error);
    },
  });

  return {
    productQuery,
    productCreateMutation,
    productUpdateMutation,
    productDeleteMutation,
  };
}

const fetchProducts = async () => {
  const { data } = await http.get('/api/products');
  return data;
};

const createProduct = async (productPayload) => {
  const { data } = await http.post('/api/products', productPayload);
  return data;
};

const updateProduct = async ({ id, payload }) => {
  const { data } = await http.put(`/api/products/${id}`, payload);
  return data;
};

const deleteProduct = async (id) => {
  const { data } = await http.delete(`/api/products/${id}`);
  return data;
};
