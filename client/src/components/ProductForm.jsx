import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ProductFormSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0).max(1000000),
  quantity: z.number().min(0).optional().default(0),
  image: z.string().optional(),
});

export const ProductForm = ({ placeholder, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: placeholder,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Box component="h3">Add Product</Box>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          {...form.register('name')}
          error={Boolean(form.formState.errors.name)}
          helperText={form.formState.errors.name?.message}
        ></TextField>
        <TextField
          label="Description"
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          {...form.register('description')}
          error={Boolean(form.formState.errors.description)}
          helperText={form.formState.errors.description?.message}
        ></TextField>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            fullWidth
            {...form.register('price', { valueAsNumber: true })}
            error={Boolean(form.formState.errors.price)}
            helperText={form.formState.errors.price?.message}
          ></TextField>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            fullWidth
            {...form.register('quantity', { valueAsNumber: true })}
            error={Boolean(form.formState.errors.quantity)}
            helperText={form.formState.errors.quantity?.message}
          ></TextField>
        </Box>
        <Button startIcon={<CloudUploadIcon />}>Choose Image</Button>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="outlined" type="reset" color="error">
            Reset
          </Button>
        </Box>
      </Stack>
    </form>
  );
};
