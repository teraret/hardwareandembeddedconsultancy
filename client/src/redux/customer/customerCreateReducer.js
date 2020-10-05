import {
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  FETCH_CUSTOMER_RESET,
} from "./customerCreateType";

const initialState = {
  loading: false,
  show: [],
  error: "",
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CUSTOMER_SUCCESS:
      return {
        loading: false,
        show: action.payload,
      };
    case FETCH_CUSTOMER_RESET:
      return {
        loading: false,
        show: [],
        error: "",
      };
    case FETCH_CUSTOMER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default customerReducer;
