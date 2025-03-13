import http from '../config/http';
import { useQuery } from '@tanstack/react-query';

export default function useProducts() {
  const productQuery = useQuery({
    queryKey: 'products',
    queryFn: () => fetchProducts(),
  });

  return { productQuery };
}

const fetchProducts = async () => {
  const { data } = await http.get('/api/products');
  return data;
};
