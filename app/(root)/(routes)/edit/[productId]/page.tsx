import EditProductForm from '@/components/EditProductForm/EditProductForm'
import Brand from '@/models/Brand'
import Category from '@/models/Category'
import Product from '@/models/Product'
import styles from './EditPage.module.css'

interface EditPageProps {
    params: {
        productId: string
    }
}


const EditPage = async ({ params }: EditPageProps) => {


    const { productId } = params;
    const product = JSON.parse(JSON.stringify(await Product.findById(productId).populate('brand category').lean()));
    const brands = JSON.parse(JSON.stringify(await Brand.find().lean()));
    const categories = JSON.parse(JSON.stringify(await Category.find().lean()));

    return (
        <div>
            <h1 className={styles.title}>Editar Producto {product.name}</h1>

            <EditProductForm product={product} brands={brands} categories={categories}  />
        </div>
    )
}

export default EditPage