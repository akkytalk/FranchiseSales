import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const franchiseSetData = (franchise) => {
  return {
    type: actionType.FRANCHISE_SET_DATA,
    franchise: franchise,
  };
};

export const franchiseFailData = (error) => {
  return {
    type: actionType.FRANCHISE_FAIL_DATA,
    error: error,
  };
};

export const franchiseGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "companies", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(franchiseSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(franchiseFailData(error)));
  };
};

export const deleteFranchiseFail = (error) => {
  return {
    type: actionType.DELETE_FRANCHISE_FAIL,
    error: error,
  };
};

export const deleteFranchise = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `companies/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Franchise!").then(() => {
            dispatch(franchiseGetData(data));
          });
        })
        .catch((error) => dispatch(deleteFranchiseFail(error)));
    }
  };
};

export const postFranchiseDataStart = () => {
  return {
    type: actionType.POST_FRANCHISE_DATA_START,
  };
};

export const postFranchiseDataFail = (error) => {
  return {
    type: actionType.POST_FRANCHISE_DATA_FAIL,
    error: error,
  };
};

export const postFranchiseData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postFranchiseDataStart());

    axios
      .post(baseUrl + "companies", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Franchise!").then(() => {
          dispatch(franchiseGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postFranchiseDataFail(error));
      });
  };
};

export const editFranchiseRowStart = () => {
  return {
    type: actionType.EDIT_FRANCHISE_ROW_START,
  };
};

export const failEditFranchise = (error) => {
  return {
    type: actionType.FAIL_EDIT_FRANCHISE,
    error: error,
  };
};

export const editFranchiseRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editFranchiseRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `companies/${id}`, {
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
      .catch((error) => dispatch(failEditFranchise(error)));
  };
};

export const updateFranchiseDataStart = () => {
  return {
    type: actionType.UPDATE_FRANCHISE_DATA_START,
  };
};

export const updateFranchiseData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateFranchiseDataStart());

    axios
      .post(baseUrl + `companies/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Franchise!").then(() => {
          toggle();
          dispatch(franchiseGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
