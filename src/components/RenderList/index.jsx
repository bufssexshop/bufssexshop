import './styles.css';
import { useEffect, useState } from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_SUBCATEGORY_PRODUCT } from '../../store/SectionReducer';

const RenderList = ({item, index}) => {

  const dispatch = useDispatch();
  const [ activeSubcategory, setActiveSubcategory ] = useState();

  const { viewProductSubcategory } = useSelector(({
    SectionReducer
  }) => ({
    viewProductSubcategory: SectionReducer.viewProductSubcategory,
  }))

  useEffect(() => {
    const subcategory = localStorage.getItem('subcategoria-bufs');
    setActiveSubcategory(subcategory)
  }, [viewProductSubcategory])


  return (
    index !== 0 && (
      <div key={item.value} className="menu_product_group_link">
        <StarsIcon sx={{ color: '#ff7bac'}} />
        <li
          onClick={() => {
            dispatch({ type: CHANGE_SUBCATEGORY_PRODUCT , payload: item.value})
          }}
          className={activeSubcategory === item.value && 'activeSubcategory'}
        >
          {item.name}
        </li>
      </div>
    )
  )
}

export default RenderList
