import {
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
} from "./customerType";

const initialState = {
  loading: false,
  customer: [],
  offset: 0,
  sort: "id",
  order: "asc",
  max: 10,
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
        sort: action.payloadsort,
        order: action.payloadorder,
        max: action.payloadmax,
        offset: action.payloadoffset + 10,
        customer: action.payload,
        count: action.payloadcount,
        page: action.payloadpage,
        totalpages: action.payloadtotalpages,
        error: "",
      };

    case FETCH_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
