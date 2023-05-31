import './styles.css';
import Navbar from '../../components/Navbar';
import MenuProductos from '../../components/MenuProducts';
import ShowPromotions from '../../components/ShowPromotions';

const Promotions = () => {
  return(
    <>
      <Navbar />
      <div className="products-container">
        <MenuProductos />
        <ShowPromotions />
      </div>
    </>
  )
}

export default Promotions;