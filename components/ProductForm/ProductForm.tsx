import { ICategory, IBrand } from "@/interfaces"
import { useState } from "react"
import { clientAxios } from "@/config/clientAxios"
import styles from "./ProductForm.module.css"
import { CldUploadWidget } from "next-cloudinary"

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] // Tallas disponibles

const ProductForm = ({
  categories,
  brands,
  onProductCreated,
}: {
  categories: ICategory[]
  brands: IBrand[]
  onProductCreated: () => void
}) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: "",
    stock: "",
    category: '',
    brand: '',
    sizes: [] as string[], // Inicializa tallas como array vacío
    images: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSizeChange = (size: string) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size) // Quitar talla si ya está seleccionada
        : [...prev.sizes, size], // Agregar talla si no está seleccionada
    }))
  }

  const handleUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, result.info.secure_url],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await clientAxios.post('/products', product)
      alert('Producto creado con éxito')

      // Limpiar formulario
      setProduct({
        name: '',
        description: '',
        price: "",
        stock: "",
        category: '',
        brand: '',
        sizes: [],
        images: [],
      })

      // Actualizar la lista de productos
      onProductCreated()
    } catch (error) {
      console.error('Error al crear producto:', error)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Crear Producto</h2>

      <div className={styles.inputBox}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputBox}>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />
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
              <input
                type="checkbox"
                value={size}
                checked={product.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
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

      <div className={styles.imagePreview}>
        {product.images.map((url, index) => (
          <img key={index} src={url} alt={`Imagen ${index + 1}`} />
        ))}
      </div>

      <button type="submit" className={styles.submitButton}>
        Crear Producto
      </button>
    </form>
  )
}

export default ProductForm
