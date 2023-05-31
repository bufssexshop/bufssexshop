import './styles.css';
import Navbar from '../../components/Navbar';
import ShowProducts from '../../components/ShowProducts';
import MenuProductos from '../../components/MenuProducts';

const Products = () => {
  return(
    <>
      <Navbar />
      <div className="products-container">
        <MenuProductos />
        <ShowProducts />
      </div>
    </>
  )
}

export default Products;
