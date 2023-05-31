import axios from 'axios';
import { AuthFront } from '../utils/AuthFront';
import { USER_ERROR, USER_FINISHED, USER_LOADING, USERS_SUCCESS } from '../store/UserReducer';

export async function getUsers(dispatch) {
  dispatch({ type: USER_LOADING });
  dispatch({ type: USER_ERROR, payload: '' });
  const token = localStorage.getItem('token-bufs')
  try {
    const { data } = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/usuarios/getUsers',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('xxx data', data);
    dispatch({ type: USERS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.message })
    AuthFront(error);
  } finally {
    dispatch({ type: USER_FINISHED })
  }
}
