import {
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
} from "./customerType";
import Axios from "axios";
import { SERVER_URL } from "./../../config";

const fetchCustomerRequest = () => {
  return {
    type: FETCH_CUSTOMER_REQUEST,
  };
};

const fetchCustomerSuccess = (customer, max, order, sort, offset) => {
  return {
    type: FETCH_CUSTOMER_SUCCESS,
    payload: customer.customer,
    payloadcount: customer.count,
    payloadpage: customer.page,
    payloadtotalpages: customer.totalpages,
    payloadmax: max,
    payloadorder: order,
    payloadsort: sort,
    payloadoffset: offset,
  };
};

const fetchCustomerFailure = (error) => {
  return {
    type: FETCH_CUSTOMER_FAILURE,
    payload: error,
  };
};

export const fetchCustomer = (authorization, sort, order, max, offset) => {
  return (dispatch) => {
    dispatch(fetchCustomerRequest);
    Axios.get(
      SERVER_URL +
        "/customer?max=" +
        max +
        "&offset=" +
        offset +
        "&order=" +
        order +
        "&sort=" +
        sort,
      {
        headers: {
          Authorization: "Bearer " + authorization,
        },
      }
    )
      .then((response) => {
        const customer = response.data;
        dispatch(fetchCustomerSuccess(customer, max, order, sort, offset));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCustomerFailure(errorMsg));
      });
  };
};
