import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, IconButton, Stack, TextField, CloudUploadIcon, DeleteIcon } from '../ui';

import { useRef, useState } from 'react';

const ProductFormSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0).max(1000000),
  quantity: z.number().min(0).optional().default(0),
  image: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export const ProductForm = ({ placeholder, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: placeholder,
  });

  const imageInputRef = useRef(null);
  const [isUploading, setisUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(placeholder?.image || '');

  const handleImageUpload = (event) => {
    setisUploading(true);
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
  };

  const handleRemoveImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    setPreviewImage('');
    setisUploading(false);
  };

  const handleFormSubmit = async (data) => {
    setisUploading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'imageFile') {
          return;
        }
        formData.append(key, data[key]);
      });
      if (imageInputRef.current?.files?.[0]) {
        formData.append('imageFile', imageInputRef.current.files[0]);
      }
      await onSubmit(formData);
    } catch (err) {
      console.error('Error in form submitting', err);
    } finally {
      setisUploading(false);
    }
  };

  return (
    <Stack component="form" spacing={3} onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Box component="h3">Product Form</Box>
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            hidden
            onChange={handleImageUpload}
            disabled={isUploading}
            ref={imageInputRef}
          />
          <label htmlFor="image-upload">
            <Button
              component="span"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={isUploading}
            >
              Choose Image
            </Button>
          </label>
        </Box>
        {previewImage && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '150px',
                border: '1px solid black',
              }}
            />
            <IconButton color="error" onClick={handleRemoveImage}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button variant="outlined" type="reset" color="error">
          Reset
        </Button>
      </Box>
    </Stack>
  );
};
