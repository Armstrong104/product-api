import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField } from '@mui/material';

const ProductFormSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500),
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
      <Stack spacing={2}>
        <TextField
          label="Name"
          variant="outlined"
          type="text"
          {...form.register('name')}
          error={Boolean(form.formState.errors.name)}
          helperText={form.formState.errors.name?.message}
        ></TextField>
        <TextField
          label="Description"
          variant="outlined"
          multiline
          maxRows={5}
          type="text"
          {...form.register('description')}
          error={Boolean(form.formState.errors.description)}
          helperText={form.formState.errors.description?.message}
        ></TextField>
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          {...form.register('price', { valueAsNumber: true })}
          error={Boolean(form.formState.errors.price)}
          helperText={form.formState.errors.price?.message}
        ></TextField>
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          {...form.register('quantity', { valueAsNumber: true })}
          error={Boolean(form.formState.errors.quantity)}
          helperText={form.formState.errors.quantity?.message}
        ></TextField>
        <TextField
          label="Image URL"
          variant="outlined"
          type="url"
          {...form.register('image')}
          error={Boolean(form.formState.errors.image)}
          helperText={form.formState.errors.image?.message}
        ></TextField>

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
