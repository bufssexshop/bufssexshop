import "./styles.css";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';
import { getProduct } from "../../services/products";
import { useDispatch, useSelector } from "react-redux";
import { subcategorias } from "../../utils/categories";
import CircularProgress from '@mui/material/CircularProgress';

const ViewDetails = () => {

  const { _id } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  useEffect(() => {
    getProduct(_id, dispatch);
  }, [_id])

  const { product, loading } = useSelector(({
    ProductReducer
  }) => ({
    error: ProductReducer.error,
    loading: ProductReducer.loading,
    product: ProductReducer.product,
  }))

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const {
    image,
    codigo,
    nombre,
    precio,
    detalles,
    categoria,
    promocion,
    disponible,
    subcategoria,
  } = product;

  const subcategoriaProduct = subcategorias[categoria]?.filter((item) => item.value === subcategoria);

  return (
    <>
      {loading ? (
        <div className="details-product-loading">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="view-details-container">
          <div className="view-details-section-one">
            <div className="details-product-image">
              <img
                src={image}
                alt="vista previa del producto"
                className="details-product-img-one"
              />
            </div>
            <div className="details-product-container">
              <div className="details-product-title">
                <span className="details-span-category">Categoría: {categoria}</span>
                {!!subcategoriaProduct && <span> / <a href="#">{subcategoriaProduct[0]?.name}</a></span>}
                <p>{nombre}</p>
              </div>
              <div className="details-product-code">
                <p>Código: {codigo}</p>
              </div>
              {promocion && (
                <div className="details-product-message-promotion">
                  <StarIcon  fontSize="12"/>
                  Promoción
                </div>
              )}
              <div className="details-product-price">
                {promocion ? (
                  <div className="details-product-with-promotion">
                    <p className="details-product-price-before">
                      ANTES: &nbsp;
                      $ <span>{formatterPeso.format(precio)}</span> COP
                    </p>
                    <p className="details-product-price-after">
                      AHORA: &nbsp;
                      {formatterPeso.format(product?.precio - product?.valorPromocion)} COP
                    </p>
                  </div>
                ) : (
                  <p className="details-product-price-after">{formatterPeso.format(precio)} COP</p>
                ) }
              </div>
              <div className="details-product-availability">
                {disponible ? (
                  <p className="details-product-available">Disponible</p>
                ) : (
                  <p className="details-product-not-available">No disponible</p>
                )}
              </div>
              <div className="details-product-info">
                <p>
                  <SellIcon sx={{ color: '#388e3c', fontSize: "small"}}/>
                  <span>Envios a toda Colombia</span>
                </p>
                <p>
                  <SellIcon sx={{ color: '#388e3c', fontSize: "small"}}/>
                  <span>Envios con total discreción (confidencialidad).</span>
                </p>
                <p className="message">Todos los articulos se envian discretamente en un embalaje sencillo,
                  sin marcar ninguna palabra sinonimo de "actividad sexual"
                </p>
              </div>
              <div className="details-product-buy">
                <div className="details-product-more-less">
                  <button
                    onClick={() =>
                      setCount(count === 1 ? count : count-1)
                    }
                    >
                      -
                    </button>
                  <input
                    type="number"
                    value={disponible ? count : 0 }
                    readOnly
                  />
                  <button
                    onClick={() =>
                      disponible && setCount(count+1)
                    }>
                      +
                    </button>
                </div>
                <div className="details-product-button-add-car">
                    <button
                      className={
                        disponible ?
                        'details-product-button-available' : 'details-product-button-disabled'
                      }
                    >
                      { disponible
                        ? 'Agregar al carrito'
                        : '¡AGOTADO!'
                      }
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="view-details-section-two">
            <div dangerouslySetInnerHTML={{ __html: detalles}}></div>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewDetails;
