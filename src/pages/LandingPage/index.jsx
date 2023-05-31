import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import { useMediaQuery } from '@mui/material';
import Services from "../../components/Services";

const LandingPage = () => {
  const mobile = useMediaQuery('(max-width: 780px)');
  return(
    <>
      <Navbar changeColor />
      <Header />
      <Services />
    </>
  )
}

export default LandingPage;