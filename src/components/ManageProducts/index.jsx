import "./styles.css";
import axios from "axios";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import EditProduct from "../EditProduct";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import { Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { AuthFront } from "../../utils/AuthFront";
import React, { useEffect, useState } from "react";
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { deletePromotions } from "../../services/products";
import CircularProgress from '@mui/material/CircularProgress';
import DialogContentText from '@mui/material/DialogContentText';
import { deletePromotion, getPromotions, changePromotionPrice, deleteProduct, createPromotionGeneral } from "../../services/products";
import { DELETE_PROMOTION_SUCCESS, DELETE_SUCCESS, PRODUCT_ERROR, PRODUCT_FINISHED, PRODUCT_LOADING, SEARCH_SUCCESS
} from "../../store/ProductReducer";

const MuiTab = styled(Tab)({
  '&.Mui-selected': {
    color: '#ff7bac',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ManageProducts = () => {

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [noSearch, setNoSearch] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchForCode, setSearchForCode] = useState('');
  const [searchForName, setSearchForName] = useState('');
  const [currentProduct, setCurrentProduct] = useState();
  const [newPromotionPrice, setNewPromotionPrice] = useState(0);
  const [openHandlePromotion, setOpenHandlePromotion] = useState(false);
  const [openCreatepromotion, setOpenCreatepromotion] = useState(false);
  const [openDeleteproductModal, setOpenDeleteProductModal] = useState(false);
  const [openProductOptionsModal, setOpenProductOptionsModal] = useState(false);
  const [openHandleDeletePromotions, setOpenHandleDeletePromotions] = useState(false);
  const [openCreatePromotionGeneralModal, setOpenCreatePromotionGeneralModal] = useState(false);

  const {  searchProducts, productsInpromotion, loading, deleteStatus, deleteProductStatus } = useSelector(({
    ProductReducer
  }) => ({
    error: ProductReducer.error,
    loading: ProductReducer.loading,
    deleteStatus: ProductReducer.deleteStatus,
    searchProducts: ProductReducer.searchProducts,
    productsInpromotion: ProductReducer.productsInpromotion,
    deleteProductStatus: ProductReducer.deleteProductStatus,
  }))

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const Producto = ({prod}) => {
    const { _id, codigo, nombre, precio, promocion, categoria, subcategoria, disponible } = prod;
    return(
      <tr onClick={() => handleProductOptions(_id)}>
        <td>{codigo}</td>
        <td>{nombre}</td>
        <td>{formatterPeso.format(precio)}</td>
        <td>{promocion ? 'Si' : 'No'}</td>
        <td>{categoria}</td>
        <td>{subcategoria}</td>
        <td>{disponible ? 'Si' : 'No'}</td>
      </tr>
    )
  }

  const ProductoPromo = ({prod}) => {
    const { _id, codigo, nombre, precio, valorPromocion } = prod;
    const valorPromocionReal = precio - valorPromocion;
    return(
      <tr onClick={() => handlePromotions(_id)}>
        <td>{codigo}</td>
        <td>{nombre}</td>
        <td>{formatterPeso.format(precio)}</td>
        <td>{formatterPeso.format(valorPromocionReal)}</td>
      </tr>
    )
  }

  useEffect(() => {
    if(value === 1) {
      setNoResults(false);
      getPromotions(dispatch);
      dispatch({ type: SEARCH_SUCCESS, payload: {}});
      setSearchForCode('');
      setSearchForName('');
    }
  }, [value])

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProductOptions = (_id) => {
    setCurrentProduct(searchProducts.filter((item) => item._id === _id));
    setOpenProductOptionsModal(true);
  }

  const handleDeleteAllPromotions = () => {
    setOpenHandleDeletePromotions(true);
  }

  const deleteAllPromotions = () => {
    deletePromotions(dispatch);
    setOpenHandleDeletePromotions(false)
  }

  const handlePromotions = (_id) => {
    setCurrentProduct(productsInpromotion.filter((item) => item._id === _id));
    setOpenHandlePromotion(true);
  }

  const handleClosePromotion = () => {
    setOpenHandlePromotion(false);
    setOpenCreatepromotion(false);
    setOpenDeleteProductModal(false);
    setOpenProductOptionsModal(false);
    setOpenHandleDeletePromotions(false);
    setOpenCreatePromotionGeneralModal(false);
    setNewPromotionPrice(0);
  }

  const handleDeletePromotion = (_id) => {
    deletePromotion(_id, dispatch);
    setOpenHandlePromotion(false);
  }

  const handleChangePromotionPrice = (_id) => {
    changePromotionPrice(_id, newPromotionPrice, dispatch);
    setOpenHandlePromotion(false);
    setOpenCreatepromotion(false);
    setNewPromotionPrice(0);
  }

  const editProduct = (e) => {
    setOpenProductOptionsModal(false);
    handleChange(e, 2);
  }

  const createpromotion = () => {
    setOpenProductOptionsModal(false);
    setOpenCreatepromotion(true);
  }
  const deleteProductModal = () => {
    setOpenProductOptionsModal(false);
    setOpenDeleteProductModal(true);
  }

  const handleDeleteProduct = (_id) => {
    deleteProduct(_id, dispatch)
    setOpenDeleteProductModal(false);
  }

  // const handleCreatePromotionGeneralModal

  async function handleSearchCodes(e) {
    e.preventDefault();
    if (searchForCode) {
      dispatch({ type: PRODUCT_LOADING })
      dispatch({ type: PRODUCT_ERROR, payload: '' })
      const token = localStorage.getItem('token-bufs');
      try {
        const { data }  = await axios({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/productos/getSearch`,
          data: {
            search: searchForCode,
            typeSearch: 'forCode'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setNoResults(data.length === 0);
        dispatch({ type: SEARCH_SUCCESS, payload: data})
      } catch (error) {
        dispatch({ type: PRODUCT_ERROR, payload: error })
        AuthFront(error);
      } finally {
        dispatch({ type: PRODUCT_FINISHED })
      }
    } else {
      setNoSearch(true);
    }
  }

  async function handleSearchNames(e) {
    e.preventDefault();
    if (searchForName) {
      dispatch({ type: PRODUCT_LOADING })
      dispatch({ type: PRODUCT_ERROR, payload: '' })
      const token = localStorage.getItem('token-bufs');
      try {
        const { data }  = await axios({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/productos/getSearch`,
          data: {
            search: searchForName,
            typeSearch: 'forName'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setNoResults(data.length === 0);
        dispatch({ type: SEARCH_SUCCESS, payload: data})
      } catch (error) {
        dispatch({ type: PRODUCT_ERROR, payload: error })
        AuthFront(error);
      } finally {
        dispatch({ type: PRODUCT_FINISHED })
      }
    } else {
      setNoSearch(true);
    }
  }

  return (
    <div className="manage-products-container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="options for manage products"
          className="MuiTabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#ff7bac",
             }
            }}
        >
          <MuiTab
            label="Consultar"
            {...a11yProps(0)}
          />

          <MuiTab
            label="Promociones"
            {...a11yProps(1)}
          />

          <MuiTab
            label="Editar Producto"
            disabled
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>





      <TabPanel value={value} index={0}>
        <div className="manage-search-products">
          <div className="search-for-name">
            <input
              type="text"
              placeholder="NOMBRE PRODUCTO"
              onChange={e => setSearchForName(e.target.value)}
              value={searchForName}
            />
            <button type="button" onClick={handleSearchNames}>Buscar</button>
          </div>
          <div className="search-for-code">
            <input
              type="text"
              placeholder="CÓDIGO..."
              onChange={e => setSearchForCode(e.target.value)}
              value={searchForCode}
            />
            <button type="button" onClick={handleSearchCodes}>Buscar</button>
          </div>
        </div>

        {(!loading && searchProducts?.length > 0) && (
          <div className="search-products-results">
            <table>
              <thead>
                <tr className="table-head">
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Promo</th>
                  <th>Cat</th>
                  <th>Subcat</th>
                  <th>Activo</th>
                </tr>
              </thead>
              <tbody>
                {!!searchProducts && searchProducts.length > 0 && searchProducts.map((currentProd) => {
                  return(
                    <Producto prod={currentProd} key={currentProd.codigo}/>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        {(!loading && noResults) && (
          <div className="search-products-results">
            <table>
              <thead>
                <tr className="table-head">
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Promo</th>
                  <th>Cat</th>
                  <th>Subcat</th>
                  <th>Activo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="table-no-results"> No se encontraron resultados</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {loading && (
          <div className="search-products-without-results">
            <CircularProgress color="inherit" />
          </div>
        )}
        <Snackbar
          open={noSearch}
          autoHideDuration={6000}
          onClose={() => setNoSearch(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setNoSearch(false)}
            severity="info"
            sx={{ width: '100%' }}
          >
            Ingrese algo para buscar
          </Alert>
        </Snackbar>

        {/* OPCIONES DE PRODUCTO EN BUSQUEDA */}
        <Dialog
          open={openProductOptionsModal}
          onClose={handleClosePromotion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {currentProduct && currentProduct[0].nombre}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>¿Quieres modificar tu producto?</DialogContentText>
            <DialogContentText>Selecciona una de las siguientes opciones.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              onClick={handleClosePromotion}
            >
              Cancelar
            </Button>
            <Button
              size="small"
              onClick={(e) => editProduct(e)}
            >
              Editar producto
            </Button>
            <Button
              size="small"
              onClick={createpromotion}
            >
              Crear Promo
            </Button>
            <Button
              size="small"
              color="error"
              onClick={deleteProductModal}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>


        {/* CREAR PROMOCION */}
        <Dialog
          open={openCreatepromotion}
          onClose={handleClosePromotion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {currentProduct && currentProduct[0].nombre}
          </DialogTitle>
          <DialogContent>
              <div className="alert-dialog-promotion-price">
                <DialogContentText>Precio actual: </DialogContentText>
                <p>{formatterPeso.format(currentProduct && currentProduct[0].precio)} Pesos</p>
              </div>
              <div className="alert-dialog-promotion-price">
                <DialogContentText>Valor descuento: </DialogContentText>
                <input
                  type="number"
                  onChange={(e) => setNewPromotionPrice(e.target.value)}
                  value={newPromotionPrice}
                />
              </div>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              onClick={handleClosePromotion}
            >
              Cancelar
            </Button>
            <Button
              size="small"
              onClick={() => handleChangePromotionPrice(currentProduct && currentProduct[0]._id)}
            >
              Aplicar promocion
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={deleteStatus && deleteStatus}
          autoHideDuration={6000}
          onClose={() => dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: ''})}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: ''})}
            severity="success"
            sx={{ width: '100%' }}
          >
            {deleteStatus}
          </Alert>
        </Snackbar>

        {/* ELIMINAR PRODUCTO */}
        <Dialog
          open={openDeleteproductModal}
          onClose={handleClosePromotion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            ¿Eliminar producto?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Nombre: {currentProduct && currentProduct[0].nombre}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              onClick={handleClosePromotion}
            >
              Cancelar
            </Button>
            <Button
              size="small"
              onClick={() => handleDeleteProduct(currentProduct && currentProduct[0]._id)}
              color="error"
            >
              SÍ, Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={deleteProductStatus && deleteProductStatus}
          autoHideDuration={6000}
          onClose={() => dispatch({ type: DELETE_SUCCESS, payload: ''})}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => dispatch({ type: DELETE_SUCCESS, payload: ''})}
            severity="success"
            sx={{ width: '100%' }}
          >
            {deleteProductStatus}
          </Alert>
        </Snackbar>
      </TabPanel>





      <TabPanel value={value} index={1}>
        <div className="manage-products-promotios">
          <Snackbar
            open={deleteStatus && deleteStatus}
            autoHideDuration={6000}
            onClose={() => dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: ''})}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              onClose={() => dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: ''})}
              severity="success"
              sx={{ width: '100%' }}
            >
              {deleteStatus}
            </Alert>
          </Snackbar>
          {productsInpromotion.length > 0 && (
            <button
              className="search-products-results-button-delete-all-promotions"
              onClick={() => handleDeleteAllPromotions()}
            >
              Eliminar Total Promociones
            </button>
          )}
          <button
            className="search-products-results-button-delete-all-promotions"
            onClick={() => setOpenCreatePromotionGeneralModal(true)}
          >
            Aplicar Promo General
          </button>
          {(!loading && productsInpromotion?.length > 0) && (
            <div className="search-products-results">
              <table>
                <thead>
                  <tr className="table-head">
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>En promoción</th>
                  </tr>
                </thead>
                <tbody>
                  {!!productsInpromotion && productsInpromotion.length > 0 && productsInpromotion.map((currentProd) => {
                    return(
                      <ProductoPromo prod={currentProd} key={currentProd.codigo}/>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          {(!loading && productsInpromotion.length === 0) && (
            <div className="search-products-results">
              <table>
                <thead>
                  <tr className="table-head">
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>En promoción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" className="table-no-results"> No se encontraron resultados</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}





          {/* MODALS */}


          {/* ELIMINAR EL TOTAL DE PROMOCIONES MODAL */}
          <Dialog
            open={openHandleDeletePromotions}
            onClose={handleClosePromotion}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              ¿Eliminar promociones?
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Esta acción no se puede deshacer.
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Total promociones a eliminar:  {productsInpromotion.length}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClosePromotion}>Cancelar</Button>
              <Button variant="outlined" color="success" onClick={deleteAllPromotions} autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>



          {/* EDITAR PROMOCION */}
          <Dialog
            open={openHandlePromotion}
            onClose={handleClosePromotion}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {currentProduct && currentProduct[0].nombre}
            </DialogTitle>
            <DialogContent>
              <div className="alert-dialog-edit-promotion">
                  <div className="alert-dialog-promotion-price">
                    <DialogContentText>Precio: </DialogContentText>
                    <p>{formatterPeso.format(currentProduct && currentProduct[0].precio)} Pesos</p>
                  </div>
                  <div className="alert-dialog-promotion-price">
                    <DialogContentText>Descuento actual: </DialogContentText>
                    <p>{formatterPeso.format(currentProduct && currentProduct[0].valorPromocion)} Pesos</p>
                  </div>
                  <div className="alert-dialog-promotion-price">
                    <DialogContentText id="alert-dialog-description">
                      Esteblece un nuevo valor de promoción
                    </DialogContentText>
                  </div>
                  <div className="alert-dialog-promotion-price">
                    <DialogContentText>Nuevo valor: </DialogContentText>
                    <input
                      type="number"
                      onChange={(e) => setNewPromotionPrice(e.target.value)}
                      value={newPromotionPrice}
                    />
                  </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                onClick={handleClosePromotion}
              >
                Cancelar
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => handleDeletePromotion(currentProduct && currentProduct[0]._id)}
              >
                Eliminar Promo
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="success"
                onClick={() => handleChangePromotionPrice(currentProduct && currentProduct[0]._id)}
              >
                Guardar nuevo precio
              </Button>
            </DialogActions>
          </Dialog>


          {/* CREAR PROMOCION GENERAL*/}
          <Dialog
            open={openCreatePromotionGeneralModal}
            onClose={handleClosePromotion}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              CREAR PROMOCION GENERAL
            </DialogTitle>
            <DialogContent>
              <div className="alert-dialog-edit-promotion">
                <DialogContentText>La cantidad que establezca se descontará del precio real de cada producto. </DialogContentText>
                <div className="alert-dialog-promotion-general">
                  <DialogContentText>Valor a descontar:</DialogContentText>
                  <input
                    type="number"
                    onChange={(e) => setNewPromotionPrice(e.target.value)}
                    value={newPromotionPrice}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                onClick={() => {
                  setOpenCreatePromotionGeneralModal(false)
                  setNewPromotionPrice(0)
                }}
              >
                Cancelar
              </Button>
              <Button
                size="small"
                onClick={() => {
                  createPromotionGeneral(newPromotionPrice, dispatch)
                  setOpenCreatePromotionGeneralModal(false)
                }}
              >
                Crear Promoción
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </TabPanel>







      {/* EDITAR PORDUCTOS */}
      <TabPanel value={value} index={2}>
        <EditProduct product={currentProduct} />
      </TabPanel>

    </div>
  )
}

export default ManageProducts;
