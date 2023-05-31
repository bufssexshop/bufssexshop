import './styles.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import ButtonProfile from '../ButtonProfile';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SellIcon from '@mui/icons-material/Sell';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { SAVE_USER } from '../../store/UserReducer';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Visibility from '@mui/icons-material/Visibility';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo1 from '../../multimedia/bufssexshoppink.png';
import Logo2 from '../../multimedia/bufssexshopwhite.png';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { Button, DialogActions, DialogContentText } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .css-140puxv-MuiTypography-root-MuiDialogTitle-root': {
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus': {
    color: '#00bcd4',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiSvgIcon-root': {
    color: '#aaa',
  }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#ff7bac',
    color: '#fff'
  },
}));

const Navbar = ({
  changeColor
}) => {

  const totalProducts = 0;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const mobile = useMediaQuery('(max-width: 780px)');
  const tablet = useMediaQuery('(max-width: 1020px)');
  const [openDrawer, setOpenDrawer] = useState(false);

  const token = localStorage.getItem('token-bufs');
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEmail('');
    setOpen(false);
    setPassword('');
    setError(null);
  };

  const changeBackground = () => {
    if(window.scrollY >= 80) setScroll(true);
    else setScroll(false);
  }

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true);
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/usuarios/signin',
        data: {
          email,
          password,
        }
      })

      localStorage.setItem('token-bufs', data.token);
      localStorage.setItem('user-bufs', data.user.userType);
      dispatch({ type: SAVE_USER, payload: data.user })
      setLoading(false);
      history.push('/profile');
    } catch(error){
      setLoading(false);
      setError(error.response.data.message);
    }
  }

  window.addEventListener('scroll', changeBackground);
  let location = useLocation();

  return(
    <>
      <div className="wrapper">
        <nav className={`
          ${changeColor ? 'black_navbar' : 'white_navbar'}
          ${(changeColor && scroll) && 'white_navbar'}
        `}>
          {(changeColor && !tablet) && (
            <div className="logo">
              {scroll && <img src={Logo1} alt="logo-company" className='logo-bufs-white' />}
              {!scroll && <img  src={Logo2} alt="logo-company" />}
            </div>
          )}
          {(changeColor && mobile) && (
            <div className={`logo ${mobile && 'logo-navbar-mobile'}`}>
              {scroll && <img src={Logo1} alt="logo-company" className='logo-bufs-white' />}
              {!scroll && <img  src={Logo2} alt="logo-company" />}
            </div>
          )}
          {!changeColor && (
            <div className={`logo ${mobile && 'logo-navbar-mobile'}`}>
              <img src={Logo1} alt="logo-company" className='logo-bufs-white' />
            </div>
          )}
          {!mobile && (
            <div className="options">
              <ul>
                <li><a href="/home" className={location.pathname === '/home' ? 'Current_Page' : undefined}>Inicio</a></li>
                <li><a href="/products" className={location.pathname === '/products' ? 'Current_Page' : undefined}>Productos</a></li>
                <li><a href="/promotions" className={location.pathname === '/promotions' ? 'Current_Page' : undefined}>Promociones</a></li>
                <li><a onClick={() => setShowModal(true)} className={location.pathname === '/content' ? 'Current_Page' : undefined}>Contenido</a></li>
                <li><a href="/contact" className={location.pathname === '/contact' ? 'Current_Page' : undefined}>Contacto</a></li>
              </ul>
            </div>
          )}
          {mobile && (
            <div className="options">
              <ul>
                <li>
                  <MenuIcon
                    className="menu_bar"
                    sx={{ color: '#ff7bac' }}
                    onClick={() => setOpenDrawer(!openDrawer)}
                    fontSize='large'
                  />
                </li>
              </ul>
            </div>
          )}
          {!token ? (
            <div className="buttons_container">
              <ul className="buttons">
                <li>
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={totalProducts}>
                      <ShoppingCartIcon sx={{
                        color: !changeColor ? '#666' : scroll ? '#666' : '#fff'
                      }} />
                    </StyledBadge>
                  </IconButton>
                </li>
                <li>
                  <button
                    className="header__btn-2"
                    onClick={handleClickOpen}
                  >
                    Iniciar sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="buttons_container">
              <ButtonProfile />
            </div>
          )}
        </nav>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth='xs'
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Inicia Sesión
        </BootstrapDialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <div className="form-login">
                <div className="form-email">
                  <div className="form-group-email">
                    <input
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo"
                      value={email}
                      required
                    />
                    <EmailIcon />
                  </div>
                </div>
                <div className="form-pass">
                <div className="form-group-email">
                    <input
                      type={type}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      value={password}
                      required
                    />
                    {type === 'password' ?
                      <Visibility onClick={(e) => setType('text')} className='view-password' />
                      :
                      <VisibilityOff onClick={(e) => setType('password')} className='view-password' />
                    }
                  </div>
                </div>
              </div>
            </DialogContent>
            <div className="form_helpers">
              {error && <span>{`** ${error} **`}</span>}
              <p>¿No puedes acceder a  tu cuenta?</p>
              <p>Comunícate con nosotros.</p>
            </div>
            <div className="actions_btn">
              {!loading ? (
                <button type="submit">Acceder</button>
              ) : (
                <CircularProgress color="secondary" />
              )}
            </div>
          </form>
      </BootstrapDialog>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className="drawer_responsive"
      >
        <ul>
          <li>
            <HomeIcon className="drawer_icon" />
            <a href="/home" className={location.pathname === '/home' ? 'Current_Page' : undefined}>Inicio</a>
          </li>
          <li>
            <StoreMallDirectoryIcon className="drawer_icon" />
            <a href="/products" className={location.pathname === '/products' ? 'Current_Page' : undefined}>Productos</a>
          </li>
          <li>
            <SellIcon className="drawer_icon" />
            <a href="/promotions" className={location.pathname === '/promotions' ? 'Current_Page' : undefined}>Promociones</a>
          </li>
          <li>
            <InsertPhotoIcon className="drawer_icon" />
            <a onClick={() => setShowModal(true)} className={location.pathname === '/content' ? 'Current_Page' : undefined}>Contenido</a>
          </li>
          <li>
            <ContactPhoneIcon className="drawer_icon" />
            <a href="/contact" className={location.pathname === '/contact' ? 'Current_Page' : undefined}>Contacto</a>
          </li>
        </ul>
      </Drawer>
      {/* CREAR PROMOCION GENERAL*/}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Ir a contenido?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta sección puede tener contenido explícito.
            Si es mayor de edad, continúe.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={() => setShowModal(false)}
            sx={{
              color: '#555',
              '&:hover': {
                backgroundColor: '#ccc'
              }
            }}
          >
            NO
          </Button>
          <Button
            size="small"
            variant='outlined'
            sx={{
              borderColor: '#ff7bac',
              color: '#ff7bac',
              '&:hover': {
                backgroundColor: '#ff7bac',
                borderColor: '#fff',
                color: '#fff'
              }
            }}
            onClick={() => {
              setShowModal(false)
              history.push('/content')
            }}
          >
            SÍ, SOY MAYOR DE EDAD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Navbar;