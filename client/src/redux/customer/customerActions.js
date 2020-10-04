import {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
} from "./customerType";
import Axios from "axios";
import { SERVER_URL } from "./../../config";

const fetchCustomersRequest = () => {
  return {
    type: FETCH_CUSTOMERS_REQUEST,
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

export const createCustomer = (value) => {
  return (dispatch) => {
    dispatch(fetchCustomersRequest);
    Axios.post(SERVER_URL + "/customer", value)
      .then((response) => {
        console.log(response);
        console.log(response.data);
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
        dispatch(fetchCustomerFailure(errorValue));
      });
  };
};

export const fetchCustomer = (authorization, sort, order, max, offset) => {
  return (dispatch) => {
    dispatch(fetchCustomersRequest);
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
