import "./styles.css";
import { useEffect } from "react";
import { getProducts } from "../../services/products";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from '../../components/CardProduct';
import noResults from '../../multimedia/no-results.jpg';
import CircularProgress from '@mui/material/CircularProgress';

const ShowProducts = () => {

  const dispatch = useDispatch();

  const { products, loading, viewProductSubcategory } = useSelector(({
    ProductReducer, SectionReducer
  }) => ({
    loading: ProductReducer.loading,
    products: ProductReducer.products,
    viewProductSubcategory: SectionReducer.viewProductSubcategory,
  }))

  const activeSubcategory = localStorage.getItem('subcategoria-bufs');
  useEffect(() => {
    getProducts(dispatch, activeSubcategory);
  }, [dispatch, viewProductSubcategory])

  return (
    <div className="show-products-container">
      {loading && (
        <div className="no-results-container">
          <CircularProgress />
        </div>
      )}
      {!loading && !!products && products.length > 0 && products.map((product, index) => (
        <CardProduct product={product} key={index}/>
      ))}
      {!loading && !!products && products.length === 0 && (
        <div className="no-results-container">
          <p>Esta sección aún no tiene productos, lo sentimos.</p>
          <img src={noResults} alt='no results' className="img-no-results"/>
        </div>
      )}
    </div>
  )
}

export default ShowProducts;
