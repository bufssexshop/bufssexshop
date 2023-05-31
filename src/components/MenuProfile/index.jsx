import './styles.css';
import {
  GENERAL,
  NEW_PRODUCT,
  MANAGE_SALES,
  MANAGE_USERS,
  VIEW_MESSAGES,
  MANAGE_PRODUCTS,
} from '../../store/SectionReducer';
import { useDispatch } from 'react-redux';
import TuneIcon from '@mui/icons-material/Tune';
import InboxIcon from '@mui/icons-material/Inbox';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RequestPageIcon from '@mui/icons-material/RequestPage';

const MenuProfile = () => {

  const dispatch = useDispatch();
  const handleSection = (section, payload) => {
    dispatch({ type: section , payload: payload});
  }

  return(
    <div className="menu_profile_container">
      <div className="profile_title_menu">
        <p>Administración</p>
      </div>
      <div className="profile_options">
        <ul className="profile_options_list">
        <li className="profile_group_list"  onClick={() => handleSection(GENERAL, GENERAL)} >
            <div className="profile_gruop_list_one">
              <EqualizerIcon />
              <p>Indice General</p>
            </div>
            <ArrowRightIcon className="arrow_icon" />
          </li>
          <li className="profile_group_list"  onClick={() => handleSection(NEW_PRODUCT, NEW_PRODUCT)} >
            <div className="profile_gruop_list_one">
              <AddCircleIcon />
              <p>Nuevo producto</p>
            </div>
            <ArrowRightIcon className="arrow_icon" />
          </li>
          <li className="profile_group_list"  onClick={() => handleSection(MANAGE_PRODUCTS, MANAGE_PRODUCTS)} >
            <div className="profile_gruop_list_one">
              <TuneIcon />
              <p>Administrar productos</p>
            </div>
            <ArrowRightIcon className="arrow_icon" />
          </li>
          <li className="profile_group_list"  onClick={() => handleSection(MANAGE_SALES, MANAGE_SALES )} >
            <div className="profile_gruop_list_one">
              <RequestPageIcon />
              <p>Administrar pedidos</p>
            </div>
            <ArrowRightIcon className="arrow_icon" />
          </li>
          <li className="profile_group_list"  onClick={() => handleSection(MANAGE_USERS, MANAGE_USERS)} >
            <div className="profile_gruop_list_one">
              <GroupAddIcon />
              <p>Gestor de usuarios</p>
            </div>
            <ArrowRightIcon className="arrow_icon" />
          </li>
          <li className="profile_group_list"  onClick={() => handleSection(VIEW_MESSAGES, VIEW_MESSAGES)} >
            <div className="profile_gruop_list_one">
              <InboxIcon />
              <p>Mensajes recibidos</p>
            </div>
            <ArrowRightIcon className="arrow_icon" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MenuProfile;
