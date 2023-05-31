import axios from "axios";
import { AuthFront } from '../utils/AuthFront';
import { INDICATORS_ERROR, INDICATORS_SUCCESS } from "../store/ProductReducer";

export async function getIndicators(dispatch) {
 dispatch({ type: INDICATORS_ERROR, payload: '' });
 const token = localStorage.getItem('token-bufs');
 try {
   const { data } = await axios({
     method: 'GET',
     baseURL: process.env.REACT_APP_SERVER_URL,
     url: '/productos/getIndicators',
     headers: {
       'Authorization': `Bearer ${token}`
     }
   })
   dispatch({ type: INDICATORS_SUCCESS, payload: data });
 } catch (error) {
   dispatch({ type: INDICATORS_ERROR, payload: error.message });
   AuthFront(error);
 }
}