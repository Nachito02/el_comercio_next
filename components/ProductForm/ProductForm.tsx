'use client';
import React, { useState } from 'react';
import { ICategory, IBrand } from '@/interfaces';
import { CldUploadWidget } from 'next-cloudinary';
import { clientAxios } from '@/config/clientAxios';
import styles from './ProductForm.module.css';

const ProductForm = ({ categories, brands }: { categories: ICategory[]; brands: IBrand[] }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    brand: '',
    images: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      setProduct((prev) => ({ ...prev, images: [...prev.images, result.info.secure_url] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await clientAxios.post('/products', product);
      alert('Producto creado con éxito');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Crear Producto</h2>

      <div className={styles.inputBox}>
        <input type='text' name="name" placeholder="Nombre del producto" onChange={handleChange} />
        <input type='text' name="description" placeholder="Descripción" onChange={handleChange} />
      </div>

      <div className={styles.inputBox}>
        <input type="number" name="price" placeholder="Precio" onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
      </div>

      <div className={styles.selectBox}>
        <select name="category" onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select name="brand" onChange={handleChange}>
          <option value="">Selecciona una marca</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <CldUploadWidget uploadPreset='qqeo7owm' onSuccess={handleUploadSuccess}>
        {({ open }) => (
          <button type="button" className={styles.uploadButton} onClick={() => open()}>
            Subir imágenes
          </button>
        )}
      </CldUploadWidget>

      <div className={styles.imagePreview}>
        {product.images.map((url, index) => (
          <img key={index} src={url} alt={`Imagen ${index + 1}`} />
        ))}
      </div>

      <button type="submit" className={styles.submitButton}>
        Crear Producto
      </button>
    </form>
  );
};

export default ProductForm;
