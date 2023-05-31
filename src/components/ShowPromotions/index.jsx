import "./styles.css";
import { useEffect } from "react";
import { getPromotions } from "../../services/products";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from '../../components/CardProduct';
import noResults from '../../multimedia/no-results.jpg';
import CircularProgress from '@mui/material/CircularProgress';

const ShowPromotions = () => {

  const dispatch = useDispatch();

  const { productsInpromotion, loading } = useSelector(({
    ProductReducer, SectionReducer
  }) => ({
    loading: ProductReducer.loading,
    productsInpromotion: ProductReducer.productsInpromotion,
  }))

  useEffect(() => {
    getPromotions(dispatch);
  }, [dispatch])

  return (
    <div className="show_promotions_container">
      {loading && (
        <div className="no-results-container">
          <CircularProgress />
        </div>
      )}
      {!loading && !!productsInpromotion && productsInpromotion.length > 0 && productsInpromotion.map((product, index) => (
        <CardProduct product={product} key={index}/>
      ))}
      {!loading && !!productsInpromotion && productsInpromotion.length === 0 && (
        <div className="no-results-container">
          <p>Esta sección aún no tiene productos, lo sentimos.</p>
          <img src={noResults} alt='no results' className="img-no-results"/>
        </div>
      )}
    </div>
  )
}

export default ShowPromotions;