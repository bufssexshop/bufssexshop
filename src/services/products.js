import axios from "axios";
import {
  DELETE_ERROR,
  PRODUCT_ERROR,
  DELETE_SUCCESS,
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  PRODUCTS_SUCCESS,
  PRODUCT_FINISHED,
  PROMOTIONS_SUCCESS,
  DELETE_PROMOTION_SUCCESS,
  CHANGE_PROMOTION_SUCCESS,
} from "../store/ProductReducer";
import { AuthFront } from "../utils/AuthFront";


export async function getPromotions(dispatch) {
  dispatch({ type: PRODUCT_LOADING });
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  try {
    const { data } = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/productos/getPromotions',
    })
    dispatch({ type: PROMOTIONS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.message })
    AuthFront(error);
  } finally {
    dispatch({ type: PRODUCT_FINISHED })
  }
}

export async function getProducts(dispatch, subcategory) {
  dispatch({ type: PRODUCT_LOADING });
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  try {
    const { data } = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/productos/getProducts',
      data: {
        subcategoria: subcategory,
      },
    })
    dispatch({ type: PRODUCTS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error })
  } finally {
    dispatch({ type: PRODUCT_FINISHED })
  }
}

export async function getProduct(_id, dispatch) {
  dispatch({ type: PRODUCT_LOADING });
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  try {
    const { data } = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/productos/getProduct/${_id}`,
    })
    dispatch({ type: PRODUCT_SUCCESS, payload: data});
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error });
  } finally {
    dispatch({ type: PRODUCT_FINISHED });
  }
}

export async function deletePromotions(dispatch) {
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  const token = localStorage.getItem('token-bufs');
  try {
    const { data } = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/productos/deletePromotions',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch({ type: PROMOTIONS_SUCCESS, payload: data.promotions});
    dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.message })
    AuthFront(error);
  } finally {
    dispatch({ type: PRODUCT_FINISHED })
  }
}

export async function deletePromotion(_id, dispatch) {
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  const token = localStorage.getItem('token-bufs');
  try {
    const { data } = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/productos/deletePromotion',
      data: {
        _id,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch({ type: PROMOTIONS_SUCCESS, payload: data.promotions});
    dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: DELETE_ERROR, payload: error.message });
    AuthFront(error);
  } finally {
    dispatch({ type: PRODUCT_FINISHED });
  }
}

export async function changePromotionPrice(_id, newPromotionPrice ,dispatch) {
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  const token = localStorage.getItem('token-bufs');
  try {
    const { data } = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/productos/changePromotionPrice',
      data: {
        _id,
        newPromotionPrice,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch({ type: PROMOTIONS_SUCCESS, payload: data.promotions});
    dispatch({ type: CHANGE_PROMOTION_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: DELETE_ERROR, payload: error.message });
    AuthFront(error);
  } finally {
    dispatch({ type: PRODUCT_FINISHED });
  }
}

export async function deleteProduct(_id, dispatch) {
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  const token = localStorage.getItem('token-bufs');
  try {
    const response = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/productos/deleteProduct',
      data: {
        _id,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch({ type: DELETE_SUCCESS, payload: response.message});
  } catch (error) {
    dispatch({ type: DELETE_ERROR, payload: error.message });
    AuthFront(error);
  }
}

export async function createPromotionGeneral(newPromotionPrice, dispatch) {
  dispatch({ type: PRODUCT_ERROR, payload: '' });
  const token = localStorage.getItem('token-bufs');
  try {
    const { data } = await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/productos/createPromotionGeneral',
      data: {
        valorPromocion: newPromotionPrice
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    dispatch({ type: PROMOTIONS_SUCCESS, payload: data.promotions});
    dispatch({ type: CHANGE_PROMOTION_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: DELETE_ERROR, payload: error.message });
    AuthFront(error);
  }
}