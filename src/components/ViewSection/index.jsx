import './styles.css';
import {
  GENERAL
} from '../../store/SectionReducer';
import General from '../General';
import { useEffect } from 'react';
import NewProduct from '../NewProduct';
import ManageUsers from '../ManageUsers';
import ManageProducts from '../ManageProducts';
import { useSelector, useDispatch } from 'react-redux';

const ViewSection = () => {

  const dispatch = useDispatch();

  const { section } = useSelector(({
    SectionReducer
  }) => ({
    section: SectionReducer.section,
  }));

  const SectionPage = {
    GENERAL: <General />,
    NEW_PRODUCT: <NewProduct />,
    MANAGE_PRODUCTS: <ManageProducts />,
    MANAGE_USERS: <ManageUsers />
  }

  useEffect(() => {
    if(!section) dispatch({ type: GENERAL, payload: GENERAL});
  }, [section, dispatch]);

  return(
    <div className="profile_section_container">
      {SectionPage[section]}
    </div>
  )
}

export default ViewSection;
