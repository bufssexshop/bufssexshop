export const GENERAL = 'GENERAL';
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const MANAGE_SALES = 'MANAGE_SALES';
export const MANAGE_USERS = 'MANAGE_USERS';
export const VIEW_MESSAGES = 'VIEW_MESSAGES';
export const MANAGE_PRODUCTS = 'MANAGE_PRODUCTS';
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";
export const CHANGE_CATEGORY_TWO = "CHANGE_CATEGORY_TWO";
export const CHANGE_SUBCATEGORY_PRODUCT = 'CHANGE_SUBCATEGORY_PRODUCT';

const initialState = {
  section: '',
  categoria: 'none',
  categoriaDos: 'none',
  viewProductSubcategory : 'vibradores'
}

localStorage.setItem('subcategoria-bufs', 'vibradores')

export function SectionReducer(state = initialState, action){
  switch(action.type) {
    case GENERAL:
      return {
        ...state,
        section: action.payload,
      }
    case NEW_PRODUCT:
      return {
        ...state,
        section: action.payload,
      }
    case MANAGE_PRODUCTS:
      return {
        ...state,
        section: action.payload,
      }
    case MANAGE_SALES:
      return {
        ...state,
        section: action.payload,
      }
    case MANAGE_USERS:
      return {
        ...state,
        section: action.payload,
      }
    case VIEW_MESSAGES:
      return {
        ...state,
        section: action.payload,
      }
    case CHANGE_CATEGORY:
      return {
        ...state,
        categoria: action.payload,
      }
    case CHANGE_CATEGORY_TWO:
      return {
        ...state,
        categoriaDos: action.payload,
      }
    case CHANGE_SUBCATEGORY_PRODUCT:
      localStorage.setItem('subcategoria-bufs', action.payload)
      return {
        ...state,
        viewProductSubcategory: action.payload
      }
    default:
      return state
  }
}