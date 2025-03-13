import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ProductTable } from './components';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <ProductTable />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
