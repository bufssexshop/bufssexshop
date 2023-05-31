import "./styles.css";
import axios from 'axios';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { getUsers } from "../../services/users";
import StarsIcon from '@mui/icons-material/Stars';
import { AuthFront } from '../../utils/AuthFront';
import DialogTitle from '@mui/material/DialogTitle';
import { departamentos } from '../../utils/ciudades';
import { useDispatch, useSelector } from "react-redux";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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

const StarIconPink = ({ children }) => {
  return(
    <div className="icon-data-details">
      <StarsIcon sx={{ color: '#ff7bac'}} className='icon-data' />
      {children}
    </div>
  )
}


const ManageUsers = () => {

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues: {
      userType: 'client',
      termsAndConditions: false,
      active: false,
    }
  });

  const {  loading, error, users } = useSelector(({
    UserReducer
  }) => ({
    error: UserReducer.error,
    loading: UserReducer.loading,
    users: UserReducer.users,
  }))

  const departament = watch('department') || 'Amazonas';

  const dispatch = useDispatch();
  const [valueTab, setValueTab] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [createFail, setCreateFail] = useState(false);
  const [modalUserInfo, setModalUserInfo] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const onSubmit = async ( dataUser ) => {
    const token = localStorage.getItem('token-bufs');
    try {
      await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/usuarios/signup`,
        data: dataUser,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      reset();
      setCreateSuccess(true);
    } catch (error) {
      setCreateFail(true);
      AuthFront(error);
    }
  };

  const clearForm = () => {
    setValue('department', 'Amazonas')
  }

  return (
    <div className="manage-products-container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="options for manage products"
          className="MuiTabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#ff7bac",
             }
            }}
        >
          <MuiTab
            label="Nuevo Usuario"
            {...a11yProps(0)}
          />

          <MuiTab
            label="Usuarios"
            {...a11yProps(1)}
          />

          <MuiTab
            label="Editar Usuario"
            disabled
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>





      <TabPanel value={valueTab} index={0}>
        <div className="new-user-container">

          <div className="new-user-title">
            <p>Crear usuario</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="new-user-first-row">
              <div className="new-user-input">
                <input
                  {...register('firstName', {
                    required: { value: true, message: 'Nombre obligatorio'}
                    })
                  }
                  placeholder='Primer nombre'
                  autocomplete="off"
                />
                {errors?.firstName && (
                  <p className="new-user-input-error">{errors.firstName.message}</p>
                )}
              </div>
              <div className="new-user-input">
                <input
                  {...register('secondName')}
                  placeholder='Segundo nombre'
                  autocomplete="off"
                />
              </div>
              <div className="new-user-input">
                <input
                  {...register('fistLastname', {
                    required: { value: true, message: 'Primer apellido obligatorio'}
                    })
                  }
                  placeholder='Primer apellido'
                  autocomplete="off"
                />
                {errors?.fistLastname && (
                  <p className="new-user-input-error">{errors.fistLastname.message}</p>
                )}
              </div>
              <div className="new-user-input">
                <input
                  {...register('secondLastname', {
                    required: { value: true, message: 'Segundo apellido obligatorio'}
                    })
                  }
                  placeholder='Segundo apellido'
                  autocomplete="off"
                />
                {errors?.secondLastname && (
                  <p className="new-user-input-error">{errors.secondLastname.message}</p>
                )}
              </div>
            </div>



            <div className="new-user-second-row">
              <div className="new-user-input">
                <input
                  {...register('idCard', {
                    required: { value: true, message: 'Cédula obligatoria'}
                    })
                  }
                  placeholder='Cedula'
                  type='number'
                  autocomplete="off"
                />
                {errors?.idCard && (
                  <p className="new-user-input-error">{errors.idCard.message}</p>
                )}
              </div>
              <div className="new-user-input">
                <input
                  {...register('address', {
                    required: { value: true, message: 'Dirección obligatoria'}
                    })
                  }
                  placeholder='Dirección'
                  autocomplete="off"
                />
                {errors?.address && (
                  <p className="new-user-input-error">{errors.address.message}</p>
                )}
              </div>
              <div className="new-user-input">
                <select
                  {...register('department')}
                  value={departament}
                >
                  {departamentos.map(({departamento}) => {
                    return(
                      <option value={departamento}>{departamento}</option>
                    )
                  })}
                </select>
              </div>
              <div className="new-user-input">
                <select
                  {...register('city')}
                >
                  {departamentos.map(({departamento, ciudades}) => {
                    if (departamento === departament) {
                      return(
                        ciudades.map((ciudad) => <option>{ciudad}</option>)
                      )
                    }
                  })}
                </select>
                {errors?.city && (
                  <p className="new-user-input-error">{errors.city.message}</p>
                )}
              </div>
            </div>


            <div className="new-user-first-row">
              <div className="new-user-input">
                <input
                  {...register('age', {
                    required: { value: true, message: 'Edad obligatorio'}
                    })
                  }
                  type='number'
                  placeholder='Edad'
                  autocomplete="off"
                />
                {errors?.age && (
                  <p className="new-user-input-error">{errors.age.message}</p>
                )}
              </div>
              <div className="new-user-input">
                <input
                  {...register('phone', {
                    required: { value: true, message: 'Teléfono obligatorio'}
                    })
                  }
                  type='phone'
                  placeholder='Teléfono'
                  autocomplete="off"
                />
                {errors?.phone && (
                  <p className="new-user-input-error">{errors.phone.message}</p>
                )}
              </div>
              <div className="new-user-input">
                <input
                  {...register('email', {
                    required: { value: true, message: 'Email obligatorio'}
                    })
                  }
                  type='email'
                  placeholder='Correo'
                  autocomplete="off"
                />
                {errors?.email && (
                  <p className="new-user-input-error">{errors.email.message}</p>
                )}
              </div>
              <div className="new-user-input">
                <input
                  {...register('password', {
                    required: { value: true, message: 'Contraseña obligatoria'}
                    })
                  }
                  placeholder='Contraseña'
                  autocomplete="off"
                />
                {errors?.password && (
                  <p className="new-user-input-error">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="new-user-buttons">
              <button className="new-user-cancelar" type="reset" onClick={clearForm}>Limpiar Formulario</button>
              <button className="new-user-submit" type="submit">Crear</button>
            </div>
          </form>

        </div>

        <Snackbar
          open={createSuccess}
          autoHideDuration={6000}
          onClose={() => setCreateSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setCreateSuccess(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            ¡Proceso exitoso!
          </Alert>
        </Snackbar>

        <Snackbar
          open={createFail}
          autoHideDuration={6000}
          onClose={() => setCreateFail(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setCreateFail(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            ¡Proceso falló!
          </Alert>
        </Snackbar>
      </TabPanel>





      <TabPanel value={valueTab} index={1}>
        <div className="users-view">

          <div className="users-view-first-row">
            <button onClick={() => getUsers(dispatch)}>
              Ver total usuarios
            </button>
            <button>
              Consultar
            </button>
          </div>

          {(!loading && users.length > 0) && (
            <div className="users-view-table">
              <table border='1'>
                <thead>
                  <tr className="table-head">
                    <th>Cédula</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Ciudad</th>
                    <th>Activo</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {!!users && users.length > 0 && users.map((currentUser) => {
                    return(
                      <tr onClick={() => {
                        setUserInfo(currentUser)
                        setModalUserInfo(true);
                      }}>
                        <td>{currentUser.idCard}</td>
                        <td>{currentUser.firstName} {currentUser.secondName}</td>
                        <td>{currentUser.fistLastname} {currentUser.secondLastname}</td>
                        <td>{currentUser.city}</td>
                        <td>{currentUser.active ? 'Si' : 'No'}</td>
                        <td>{currentUser.address}</td>
                        <td>{currentUser.phone}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          <Dialog
            open={modalUserInfo}
            onClose={() => setModalUserInfo(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Detalles
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <StarIconPink>
                  Cédula: {userInfo.idCard}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Nombre: {userInfo.firstName} {userInfo.secondName} {userInfo.fistLastname} {userInfo.secondLastname}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Edad: {userInfo.age}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Departamento: {userInfo.department}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Ciudad: {userInfo.city}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Dirección: {userInfo.address}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Teléfono: {userInfo.phone}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Correo: {userInfo.email}
                </StarIconPink>
              </DialogContentText>
              <DialogContentText>
                <StarIconPink>
                  Terminos & Condiciones: {userInfo.termsAndConditions ? 'Aceptados' : 'Sin aceptar'}
                </StarIconPink>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                onClick={() => setModalUserInfo(false)}
              >
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </TabPanel>



      <TabPanel value={valueTab} index={2}>

      </TabPanel>

    </div>
  )
}

export default ManageUsers;
