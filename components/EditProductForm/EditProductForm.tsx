'use client'
import { ICategory, IBrand, IProduct } from "@/interfaces";
import { useState } from "react";
import styles from "./EditProduct.module.css";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]; // Tallas disponibles

interface EditProductFormProps {
  categories: ICategory[];
  brands: IBrand[];
  product: IProduct & {
    category: ICategory;
    brand: IBrand;
  };
}

const EditProductForm = ({
  categories,
  brands,
  product: initialProduct,
}: EditProductFormProps) => {
  const [product, setProduct] = useState({
    name: initialProduct.name,
    description: initialProduct.description,
    price: initialProduct.price.toString(),
    stock: initialProduct.stock.toString(),
    category: initialProduct.category._id,
    brand: initialProduct.brand._id,
    sizes: initialProduct.sizes, // Inicializa tallas como array vacío
    images: initialProduct.images,
  });

  console.log(initialProduct)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (size: string) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size) // Quitar talla si ya está seleccionada
        : [...prev.sizes, size], // Agregar talla si no está seleccionada
    }));
  };

  const handleUploadSuccess = (result: any) => {
    if (result.event === "success") {
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, result.info.secure_url],
      }));
    }
  };

  // ✅ Función para eliminar imagen del array
  const handleRemoveImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // await clientAxios.post("/products", product);
      alert("Producto creado con éxito");
      // Limpiar formulario
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        sizes: [],
        images: [],
      });
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Editar Producto</h2>

      <div className={styles.inputBox}>
        <input type="text" name="name" placeholder="Nombre del producto" value={product.name} onChange={handleChange} />
        <input type="text" name="description" placeholder="Descripción" value={product.description} onChange={handleChange} />
      </div>

      <div className={styles.inputBox}>
        <input type="number" name="price" placeholder="Precio" value={product.price} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} />
      </div>

      <div className={styles.selectBox}>
        <select name="category" value={product.category} onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select name="brand" value={product.brand} onChange={handleChange}>
          <option value="">Selecciona una marca</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sizesBox}>
        <h3>Tallas disponibles:</h3>
        <div className={styles.sizesContainer}>
          {SIZES.map((size) => (
            <label key={size} className={styles.sizeLabel}>
              <input type="checkbox" value={size} checked={product.sizes.includes(size)} onChange={() => handleSizeChange(size)} />
              {size}
            </label>
          ))}
        </div>
      </div>

      <CldUploadWidget uploadPreset="qqeo7owm" onSuccess={handleUploadSuccess}>
        {({ open }) => (
          <button type="button" className={styles.uploadButton} onClick={() => open()}>
            Subir imágenes
          </button>
        )}
      </CldUploadWidget>

      {/* ✅ Previsualización de imágenes con botón de eliminar */}
      <div className={styles.imagePreview}>
        {product.images.map((url, index) => (
          <div key={index} className={styles.imageContainer}>
            <Image src={url} alt={`Imagen ${index + 1}`} width={1440} height={1440} className={styles.image} />
            <button type="button" className={styles.deleteButton} onClick={() => handleRemoveImage(index)}>
              ❌
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className={styles.submitButton}>
        Crear Producto
      </button>
    </form>
  );
};

export default EditProductForm;
