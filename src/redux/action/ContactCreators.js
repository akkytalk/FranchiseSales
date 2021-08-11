import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const contactSetData = (contact) => {
  return {
    type: actionType.CONTACT_SET_DATA,
    contact: contact,
  };
};

export const contactFailData = (error) => {
  return {
    type: actionType.CONTACT_FAIL_DATA,
    error: error,
  };
};

export const contactGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "contacts", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(contactSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(contactFailData(error)));
  };
};

export const deleteContactFail = (error) => {
  return {
    type: actionType.DELETE_CONTACT_FAIL,
    error: error,
  };
};

export const deleteContact = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `contacts/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Contact!").then(() => {
            dispatch(contactGetData(data));
          });
        })
        .catch((error) => dispatch(deleteContactFail(error)));
    }
  };
};

export const postContactDataStart = () => {
  return {
    type: actionType.POST_CONTACT_DATA_START,
  };
};

export const postContactDataFail = (error) => {
  return {
    type: actionType.POST_CONTACT_DATA_FAIL,
    error: error,
  };
};

export const postContactData = (data, user) => {
  return (dispatch) => {
    dispatch(postContactDataStart());

    axios
      .post(baseUrl + "contacts", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Thanks for Contacting us!").then(() => {
          dispatch(contactGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postContactDataFail(error));
      });
  };
};

export const editContactRowStart = () => {
  return {
    type: actionType.EDIT_CONTACT_ROW_START,
  };
};

export const failEditContact = (error) => {
  return {
    type: actionType.FAIL_EDIT_CONTACT,
    error: error,
  };
};

export const updateContactDataStart = () => {
  return {
    type: actionType.UPDATE_CONTACT_DATA_START,
  };
};

export const updateContactData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateContactDataStart());

    axios
      .post(baseUrl + `contacts/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Contact!").then(() => {
          toggle();
          dispatch(contactGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
