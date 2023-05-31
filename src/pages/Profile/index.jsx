// import { useEffect } from "react";
import './styles.css';
// import { useSelector } from 'react-redux';
import Navbar from "../../components/Navbar";
import MenuProfile from '../../components/MenuProfile';
import ViewSection from '../../components/ViewSection';

const Profile = () => {


  // const { user } = useSelector(({
  //   UserReducer
  // }) => ({
  //   user: UserReducer.user,
  // }))
  // console.log(user);
  return (
    <>
      <Navbar />
      <div className="page_profile_container">
        <MenuProfile />
        <ViewSection />
      </div>
    </>
  )
}

export default Profile;
