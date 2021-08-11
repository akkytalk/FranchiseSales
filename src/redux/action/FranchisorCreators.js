import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const franchisorSetData = (franchisor) => {
  return {
    type: actionType.FRANCHISOR_SET_DATA,
    franchisor: franchisor,
  };
};

export const franchisorFailData = (error) => {
  return {
    type: actionType.FRANCHISOR_FAIL_DATA,
    error: error,
  };
};

export const franchisorGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "franchisers", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(franchisorSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(franchisorFailData(error)));
  };
};

export const deleteFranchisorFail = (error) => {
  return {
    type: actionType.DELETE_FRANCHISOR_FAIL,
    error: error,
  };
};

export const deleteFranchisor = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `franchisers/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Franchisor!").then(() => {
            dispatch(franchisorGetData(data));
          });
        })
        .catch((error) => dispatch(deleteFranchisorFail(error)));
    }
  };
};

export const postFranchisorDataStart = () => {
  return {
    type: actionType.POST_FRANCHISOR_DATA_START,
  };
};

export const postFranchisorDataFail = (error) => {
  return {
    type: actionType.POST_FRANCHISOR_DATA_FAIL,
    error: error,
  };
};

export const postFranchisorData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postFranchisorDataStart());

    axios
      .post(baseUrl + "franchisers", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Franchisor!").then(() => {
          dispatch(franchisorGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postFranchisorDataFail(error));
      });
  };
};

export const editFranchisorRowStart = () => {
  return {
    type: actionType.EDIT_FRANCHISOR_ROW_START,
  };
};

export const failEditFranchisor = (error) => {
  return {
    type: actionType.FAIL_EDIT_FRANCHISOR,
    error: error,
  };
};

export const editFranchisorRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editFranchisorRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `franchisers/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          assesement_id: res.data.assesement_id,
          asses_name: res.data.assesement.name,
          name: res.data.name,
        });
      })
      .catch((error) => dispatch(failEditFranchisor(error)));
  };
};

export const updateFranchisorDataStart = () => {
  return {
    type: actionType.UPDATE_FRANCHISOR_DATA_START,
  };
};

export const updateFranchisorData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateFranchisorDataStart());

    axios
      .post(baseUrl + `franchisers/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Franchisor!").then(() => {
          toggle();
          dispatch(franchisorGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
