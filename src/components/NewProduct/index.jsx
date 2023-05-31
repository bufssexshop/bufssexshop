import axios from 'axios';
import React from 'react';
import './styles.css';
import {
  categorias,
  subcategorias,
  disponibilidad,
} from '../../utils/categories';
import draftToHtml from 'draftjs-to-html';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Snackbar from '@mui/material/Snackbar';
import { AuthFront } from '../../utils/AuthFront';
import { EditorState, convertToRaw } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CircularProgress from '@mui/material/CircularProgress';
import { CHANGE_CATEGORY, CHANGE_CATEGORY_TWO, NEW_PRODUCT } from '../../store/SectionReducer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewProduct = () => {

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [image, setImage] = useState(null);
  const [noSubmit, setNoSubmit] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [disponible, setDisponible] = useState(true);
  const [successful, setSuccesfull] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [subcategoria, setSubcategoria] = useState('none');
  const [subcategoriaDos, setSubcategoriaDos] = useState('none');
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const { categoria, categoriaDos } = useSelector(({
    SectionReducer
  }) => ({
    categoria: SectionReducer.categoria,
    categoriaDos: SectionReducer.categoriaDos,
  }));

  const handleClear = () => {
    setCodigo('');
    setNombre('');
    setPrecio('');
    setFile(null);
    setImage(null);
    setDisponible(true);
    setSuccesfull(false);
    setSubcategoria('none');
    setSubcategoriaDos('none');
    setShowOtherCategory(false);
    setEditorState(EditorState.createEmpty());
    document.getElementById("file").value = null;
    dispatch({ type: CHANGE_CATEGORY, payload: 'none' });
    dispatch({ type: NEW_PRODUCT, payload: NEW_PRODUCT });
    dispatch({ type: CHANGE_CATEGORY_TWO, payload: 'none' });
  }

  const validation = () => {
    if (codigo !== '' &&
    nombre !== '' &&
    disponible !== '' &&
    precio !== '' &&
    categoria !== 'none' &&
    subcategoria !== 'none' &&
    editorState.getCurrentContent().hasText() &&
    image !== null) {
      return true
    }
    return false
  }

  useEffect(() => {
    setImage(null);
    setFile(null);
  }, [successful])

  const Success = () => {
    setGuardando(false)
    handleClear();
    setSuccesfull(true);
    setOpenSuccess(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validation()) {
      try {
        setGuardando(true)
        const data = new FormData()
        data.append('codigo', codigo)
        data.append('nombre', nombre)
        data.append('precio', precio)
        data.append('detalles', text)
        data.append('promocion', false)
        data.append('valorPromocion', 0)
        data.append('categoria', categoria)
        data.append('disponible', disponible)
        data.append('categoriaDos', categoriaDos)
        data.append('subcategoria', subcategoria)
        data.append('subcategoriaDos', subcategoriaDos)

        if(file) {
          data.append('image', file[0], file[0].name)
        }

        const token = localStorage.getItem('token-bufs');

        await axios ({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/productos/crear',
          data,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
        Success();
      } catch (error) {
        setGuardando(false);
        AuthFront(error);
      }
    } else {
      setNoSubmit(true);
    }
  }

  function handleImage(e) {
    readFile(e.target.files[0])
    setFile(e.target.files)
  }

  function readFile(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => setImage(e.target.result)
    reader.onerror = e => console.log(reader.error)
  }

  const onEditorStateChange = editorState =>  setEditorState(editorState);

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseNoSubmit = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNoSubmit(false);
  };

  const handleChangeCategoria = (payload) => {
    dispatch({ type: CHANGE_CATEGORY, payload: payload})
  }

  const handleChangeCategoriaTwo = (payload) => {
    dispatch({ type: CHANGE_CATEGORY_TWO, payload: payload})
  }

  return(
    <div className="new_product_container">
      <div className="new_product_title">
        <p>Nuevo producto</p>
      </div>
      <div className="new_product_form">
        <form>
          <div className="new_product_first_line">
            <div className="Camp">
              <input
                type="text"
                id="codigo"
                onChange={(e) => setCodigo(e.target.value)}
                value={codigo}
                placeholder="Código"
                required
              />
            </div>
            <div className="Camp">
              <input
                type="text"
                id="nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                placeholder="Nombre producto"
                required
              />
            </div>
            <div className="Camp">
              <input
                type="number"
                id="precio"
                onChange={(e) => setPrecio(e.target.value)} value={precio}
                placeholder="$ Precio"
                required
              />
            </div>
            <div className="Camp">
              <label htmlFor="disponible">Disponible:</label>
              <select onChange={(e) => setDisponible(e.target.value)}>
              {disponibilidad.map(({ name, value}) => {
                  return(
                    <option value={value}>{name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="new_product_second_line">
            <div className="Camp">
              <label htmlFor="categoria">Categoría:</label>
              <select value={categoria} onChange={(e) => handleChangeCategoria(e.target.value)}>
                {categorias.map(({ name, value}) => {
                  return(
                    <option value={value}>{name}</option>
                  )
                })}
              </select>
            </div>
            <div className="Camp">
              <label htmlFor="subcategoria">Subcategoría:</label>
              <select value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)}>
                {categoria === 'none' ? (
                  <option value='none'>Elegir...</option>
                ) : (
                  subcategorias[categoria].map(({ name, value}) => <option value={value}>{name}</option> )
                )}
              </select>
            </div>
            <div className="Camp">
              <label htmlFor="file">Image:</label>
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={handleImage}
                required
              />
            </div>
          </div>
          <div className="new_product_image_container">
            <div className="new_product_img_preview">
              {image && <img src={image} alt="profile preview" />}
            </div>
          </div>
          <div className={`new_product_add_other_category_line ${showOtherCategory && 'add_category'}`}>
            <div className="add_other_category_checkbox">
              <input
                type="checkbox"
                id='add_other_category'
                onChange={() => setShowOtherCategory(!showOtherCategory)}
                checked={showOtherCategory}
              />
              <label htmlFor="add_other_category">Añadir Otra Categoría</label>
            </div>
            {showOtherCategory && (
              <div className="new_product_add_other_category_son">
                <div className="Camp">
                  <label htmlFor="categoria">Categoría:</label>
                  <select value={categoriaDos} onChange={(e) => handleChangeCategoriaTwo(e.target.value)}>
                    {categorias.map(({ name, value}) => {
                      return(
                        <option value={value}>{name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="Camp">
                  <label htmlFor="subcategoria">Subcategoría:</label>
                  <select value={subcategoriaDos} onChange={(e) => setSubcategoriaDos(e.target.value)}>
                    {categoriaDos === 'none' ? (
                      <option value='none'>Elegir...</option>
                    ) : (
                      subcategorias[categoriaDos].map(({ name, value}) => <option value={value}>{name}</option> )
                    )}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="new_product_editor">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
          <div className="new_product_third_line">
            <div className="new_product_buttons">
              <button
                type="button"
                onClick={handleClear}
                className="new_product_clear_form"
              >
                Limpiar Formulario
              </button>
              {!guardando ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="new_product_submit_form"
                >
                  Guardar Producto
                </button>
              ) : (
                <CircularProgress color="primary" />
              )}
            </div>
          </div>
        </form>
      </div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: '100%' }}
        >
          ¡Producto creado exitosamente!
        </Alert>
      </Snackbar>
      <Snackbar
        open={noSubmit}
        autoHideDuration={6000}
        onClose={handleCloseNoSubmit}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNoSubmit}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Faltan campos por llenar
        </Alert>
      </Snackbar>
    </div>
  )
}

export default NewProduct;