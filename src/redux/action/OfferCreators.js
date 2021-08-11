import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const offerSetData = (offer) => {
  return {
    type: actionType.OFFER_SET_DATA,
    offer: offer,
  };
};

export const offerFailData = (error) => {
  return {
    type: actionType.OFFER_FAIL_DATA,
    error: error,
  };
};

export const offerGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(offerSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(offerFailData(error)));
  };
};

export const deleteOfferFail = (error) => {
  return {
    type: actionType.DELETE_OFFER_FAIL,
    error: error,
  };
};

export const deleteOffer = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `users/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Offer!").then(() => {
            dispatch(offerGetData(data));
          });
        })
        .catch((error) => dispatch(deleteOfferFail(error)));
    }
  };
};

export const postOfferDataStart = () => {
  return {
    type: actionType.POST_OFFER_DATA_START,
  };
};

export const postOfferDataFail = (error) => {
  return {
    type: actionType.POST_OFFER_DATA_FAIL,
    error: error,
  };
};

export const postOfferData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postOfferDataStart());

    axios
      .post(baseUrl + "users", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Offer!").then(() => {
          dispatch(offerGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postOfferDataFail(error));
      });
  };
};

export const editOfferRowStart = () => {
  return {
    type: actionType.EDIT_OFFER_ROW_START,
  };
};

export const failEditOffer = (error) => {
  return {
    type: actionType.FAIL_EDIT_OFFER,
    error: error,
  };
};

export const editOfferRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editOfferRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `users/${id}`, {
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
      .catch((error) => dispatch(failEditOffer(error)));
  };
};

export const updateOfferDataStart = () => {
  return {
    type: actionType.UPDATE_OFFER_DATA_START,
  };
};

export const updateOfferData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateOfferDataStart());

    axios
      .post(baseUrl + `users/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Offer!").then(() => {
          toggle();
          dispatch(offerGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
