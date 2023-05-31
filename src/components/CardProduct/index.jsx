import "./styles.css";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const AñadirAlCarritoText = () => {
  return(
    <>

    </>
  )
}

const CardProduct = ({product}) => {

  const addToCar = () => {
    alert('Se agregó tu producto.');
  }

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const active = product?.disponible && product.disponible;

  return (
    <div className="card-container">
      <a href={`/view-product/${product?._id}`}>
        <div className="card-image">
          <img src={product?.image} alt="producto" />
        </div>
        <div className="card-details">
          <div className="card-product-name">
            <p>{product?.nombre}</p>
          </div>
          <div className="card-prices">
            {product?.promocion ? (
              <p className="prices-with-promotion">
                $ <span>{formatterPeso.format(product?.precio)}</span> / {formatterPeso.format(product?.precio - product?.valorPromocion)} COP
              </p>
            ) : (
              <p className="prices-with-promotion">{product?.precio && `$ ${formatterPeso.format(product?.precio)} COP`} </p>
            )}
          </div>
        </div>
      </a>
      <div className="card-button-add">
        <button
          className={
            active ? 'button-active' : 'add-to-car-disabled'
          }
        >
          { active ?
            <>
              <ShoppingCartCheckoutIcon sx={{
                fontSize: '17px',
                margin: '0 5px -4px 0'
                }}
              />
              Agregar al carrito
            </>
            : '¡AGOTADO!'
          }
        </button>
      </div>
    </div>
  )
}

export default CardProduct;
