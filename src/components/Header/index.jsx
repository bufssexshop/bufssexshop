import './styles.css';
import { useMediaQuery } from "@mui/material";

const Header = () => {

  const mobile = useMediaQuery('(max-width: 780px)');

  return(
    <div className='Header_Logo_Container'>
      <div className={`Header_Logo_Title ${mobile && 'Header_Logo_Title_Mobile'}`}>
        <p>buf's sex shop</p>
      </div>
      <div className={`Header_Logo_Search ${mobile && 'Header_Logo_Search_Mobile'}`}>
        <input type="text" className="search" placeholder="¿Qué estás buscando? ..." />
        <button className="header__btn-3">Buscar</button>
      </div>
    </div>
  );
};

export default Header;
