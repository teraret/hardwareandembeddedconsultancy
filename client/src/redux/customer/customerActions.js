import {
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
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
    type: FETCH_CUSTOMERS_SUCCESS,
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
    type: FETCH_CUSTOMERS_FAILURE,
    payload: error,
  };
};

const showCustomerSuccess = (customer) => {
  return {
    type: FETCH_CUSTOMER_SUCCESS,
    payload: customer,
  };
};
const showCustomerFailure = (error) => {
  return {
    type: FETCH_CUSTOMER_FAILURE,
    payload: error,
  };
};

export const createCustomer = (value) => {
  return (dispatch) => {
    dispatch(fetchCustomerRequest);
    Axios.post(SERVER_URL + "/customer", value)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        dispatch(showCustomerSuccess(response.data));
      })
      .catch((error) => {
        console.error("The Error Message is " + error.response.data.total);
        let errorValue = "";
        if (typeof error.response.data.total === "undefined") {
          errorValue = "";
          errorValue += error.response.data.message;
        } else {
          errorValue = "Errors Are ";
          for (let i = 0; i < error.response.data.total; i++) {
            errorValue += error.response.data._embedded.errors[i].message;
          }
        }
        dispatch(showCustomerFailure(errorValue));
      });
  };
};

export const showCustomer = (id) => {
  return (dispatch) => {
    dispatch(fetchCustomerRequest);
    Axios.get(SERVER_URL + "/customer/" + id).then((response) => {
      console.log(response);
      console.log(response.data);
      dispatch(showCustomerSuccess(response.data));
    });
  };
};

export const editCustomer = (id, value) => {
  return (dispatch) => {
    dispatch(fetchCustomerRequest);
    Axios.put(SERVER_URL + "/customer/" + id, value).then((response) => {
      console.log(response);
      console.log(response.data);
      dispatch(showCustomerSuccess(response.data));
    });
  };
};

export const deleteCustomer = (id) => {
  return (dispatch) => {
    Axios.delete(SERVER_URL + "/customer/" + id);
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
