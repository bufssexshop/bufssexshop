import "./styles.css";
import Navbar from '../../components/Navbar';
import ViewDetails from '../../components/ViewDetails';
import MenuProductos from '../../components/MenuProducts';

const ViewProduct = () => {
  return (
    <>
      <Navbar />
      <div className="products-container">
        <MenuProductos />
        <ViewDetails />
      </div>
    </>
  )
}

export default ViewProduct;
