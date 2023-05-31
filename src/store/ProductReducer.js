export const DELETE_ERROR = 'DELETE_ERROR';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const PRODUCT_LOADING = 'PRODUCT_LOADING';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const INDICATORS_ERROR = 'INDICATORS_ERROR';
export const PRODUCT_FINISHED = 'PRODUCT_FINISHED';
export const PRODUCTS_SUCCESS = 'PRODUCTS_FINISHED';
export const INDICATORS_SUCCESS = 'INDICATORS_SUCCESS';
export const PROMOTIONS_SUCCESS = 'PROMOTIONS_SUCCESS';
export const DELETE_PROMOTION_SUCCESS = 'DELETE_PROMOTION_SUCCESS';
export const CHANGE_PROMOTION_SUCCESS = 'CHANGE_PROMOTION_SUCCESS';

const initialState = {
  error: null,
  product: {},
  products: {},
  loading: false,
  deleteStatus: '',
  searchProducts: {},
  deleteProductStatus: '',
  productsInpromotion: {},
  indicators: {},
}

export function ProductReducer(state = initialState, action){
  switch(action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
      }
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        productsInpromotion: {},
        searchProducts: action.payload,
      }
    case PROMOTIONS_SUCCESS:
      return {
        ...state,
        searchProducts: {},
        productsInpromotion: action.payload,
      }
    case DELETE_PROMOTION_SUCCESS:
      return {
        ...state,
        deleteStatus: action.payload,
      }
    case CHANGE_PROMOTION_SUCCESS:
      return {
        ...state,
        deleteStatus: action.payload,
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        deleteProductStatus: action.payload,
      }
    case INDICATORS_SUCCESS:
      return {
        ...state,
        indicators: action.payload,
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case PRODUCT_FINISHED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}