import Draft from 'draft-js'
import axios from 'axios';
import React from 'react';
import './styles.css';
import {
  categorias,
  subcategorias,
} from '../../utils/categories';
import draftToHtml from 'draftjs-to-html';
import MuiAlert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Snackbar from '@mui/material/Snackbar';
import { AuthFront } from '../../utils/AuthFront';
import { useDispatch, useSelector } from 'react-redux';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CircularProgress from '@mui/material/CircularProgress';
import { CHANGE_CATEGORY, CHANGE_CATEGORY_TWO } from '../../store/SectionReducer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditProduct = ({ product }) => {
  const [producto, setProducto ] = useState(product[0]);
  const {EditorState, ContentState, convertFromHTML, convertToRaw} = Draft
  const {
    _id,
    image,
    codigo,
    nombre,
    precio,
    detalles,
    promocion,
    disponible,
    subcategoria,
    categoriaDos: categoriaProductoDos,
    valorPromocion,
    subcategoriaDos,
    categoria: categoriaProducto
  } = producto;

  const detallesProducto = detalles;
  const blocksFromHTML = convertFromHTML(detallesProducto)
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )

  const { categoria, categoriaDos } = useSelector(({
    SectionReducer
  }) => ({
    categoria: SectionReducer.categoria,
    categoriaDos: SectionReducer.categoriaDos
  }));

  const [editorState, setEditorState] = useState(EditorState.createWithContent(content));

  const dispatch = useDispatch();
  const [newFile, setNewFile] = useState(null);
  const [codigoEdit, setCodigo] = useState('');
  const [nombreEdit, setNombre] = useState('');
  const [precioEdit, setPrecio] = useState('');
  const [newImage, setNewImage] = useState('');
  const [noSubmit, setNoSubmit] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [successful, setSuccesfull] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [disponibleEdit, setDisponible] = useState(true);
  const [subcategoriaEdit, setSubcategoria] = useState('none');
  const [showOtherCategory, setShowOtherCategory] = useState(subcategoriaDos !== 'none');
  const [subcategoriaDosEdit, setSubcategoriaDosEdit] = useState(subcategoriaDos);
  let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));


  const validation = () => {

    if (
    codigoEdit !== '' &&
    nombreEdit !== '' &&
    disponibleEdit !== '' &&
    precioEdit !== '' &&
    categoria !== 'none' &&
    subcategoriaEdit !== 'none' &&
    editorState.getCurrentContent().hasText()
    ) { return true }

    return false
  }

  useEffect(() => {
    setNewImage('')
  }, [successful])

  useEffect(() => {
    setCodigo(codigo);
    setNombre(nombre);
    setCodigo(codigo);
    setPrecio(precio);
    setDisponible(disponible);
    setSubcategoria(subcategoria);
    dispatch({ type: CHANGE_CATEGORY, payload: categoriaProducto});
    dispatch({ type: CHANGE_CATEGORY_TWO, payload: categoriaProductoDos});
  }, [product])

  const Success = (productUpdated) => {
    setGuardando(false)
    setSuccesfull(true);
    setOpenSuccess(true);
    document.getElementById("file").value = null;
  }

  function handleImage(e) {
    readFile(e.target.files[0])
    setNewFile(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validation()) {
      let form = {};
      const formData = new FormData()

      const token = localStorage.getItem('token-bufs');

      if(newFile) {
        formData.append('_id', _id)
        formData.append('detalles', text)
        formData.append('codigo', codigoEdit)
        formData.append('nombre', nombreEdit)
        formData.append('precio', precioEdit)
        formData.append('promocion', promocion)
        formData.append('categoria', categoria)
        formData.append('categoriaDos', categoriaDos)
        formData.append('disponible', disponibleEdit)
        formData.append('valorPromocion', valorPromocion)
        formData.append('subcategoria', subcategoriaEdit)
        formData.append('subcategoriaDos', subcategoriaDosEdit)
        formData.append('image', newFile[0], newFile[0].name)
      } else {
        form = {
          _id: _id,
          detalles: text,
          codigo: codigoEdit,
          nombre: nombreEdit,
          precio: precioEdit,
          promocion: promocion,
          categoria: categoria,
          categoriaDos: categoriaDos,
          disponible: disponibleEdit,
          valorPromocion: valorPromocion,
          subcategoria: subcategoriaEdit,
          subcategoriaDos: subcategoriaDosEdit
         }
      }

      try {
        setGuardando(true)

        const response = await axios ({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: newFile ? '/productos/updateProductWithPicture'
          : '/productos/updateProductWithOutPicture',
          data: newFile ? formData : form,
          headers: newFile ? {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          } : {
            'Authorization': `Bearer ${token}`
          }
        })
        setProducto(response.data.producto)
        Success();
      } catch (error) {
        setGuardando(false);
        AuthFront(error);
      }
    } else {
      setNoSubmit(true);
    }
  }



  function readFile(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => setNewImage(e.target.result)
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
    <div className="edit_product_container">
      <div className="new_product_form">
        <form>
          <div className="new_product_first_line">
            <div className="Camp">
              <input
                type="text"
                id="codigo"
                onChange={(e) => setCodigo(e.target.value)}
                value={codigoEdit}
                placeholder="Código"
                required
              />
            </div>
            <div className="Camp">
              <input
                type="text"
                id="nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombreEdit}
                placeholder="Nombre producto"
                required
              />
            </div>
            <div className="Camp">
              <input
                type="number"
                id="precio"
                onChange={(e) => setPrecio(e.target.value)}
                value={precioEdit}
                placeholder="$ Precio"
                required
              />
            </div>
            <div className="Camp">
              <label htmlFor="disponible">Disponible:</label>
              <select onChange={(e) => setDisponible(e.target.value)}>
              {disponible ? (
                <>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </>
              ) : (
                <>
                  <option value={false}>No</option>
                  <option value={true}>Si</option>
                </>
              )}
              </select>
            </div>
          </div>
          <div className="new_product_second_line">
            <div className="Camp">
              <label htmlFor="categoria">Categoría:</label>
              <select value={categoria} onChange={(e) => handleChangeCategoria(e.target.value)}>
                {categorias.map(({ name, value}) => <option value={value}>{name}</option>)}
              </select>
            </div>
            <div className="Camp">
              <label htmlFor="subcategoria">Subcategoría:</label>
              <select value={subcategoriaEdit} onChange={(e) => setSubcategoria(e.target.value)}>
                { subcategorias[categoria]?.map(({ name, value}) => (
                  <option value={value}>{name}</option>
                ))}
              </select>
            </div>
            <div className="Camp">
              <label htmlFor="file">Image:</label>
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={(e) => handleImage(e)}
                required
              />
            </div>
          </div>
          <div className="edit-product-images-group">
            <div className="new_product_image_container">
              <div className="new_product_img_preview">
                <p>Imagen actual</p>
                <img src={image} alt="profile preview" />
              </div>
            </div>
            {newImage && (
              <div className="new_product_image_container">
                <div className="new_product_img_preview">
                  <p>Imagen nueva</p>
                  <img src={newImage} alt="profile preview" />
                </div>
              </div>
            )}
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
                    {categorias.map(({ name, value}) => <option value={value}>{name}</option>)}
                  </select>
                </div>
                <div className="Camp">
                  <label htmlFor="subcategoria">Subcategoría:</label>
                  <select value={subcategoriaDosEdit} onChange={(e) => setSubcategoriaDosEdit(e.target.value)}>
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
              {!guardando ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="new_product_submit_form"
                >
                  Guardar Producto
                </button>
              ) : (
                <CircularProgress />
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
          El producto fue modificado
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

export default EditProduct;