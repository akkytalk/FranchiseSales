import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const slideSetData = (slide) => {
  return {
    type: actionType.SLIDE_SET_DATA,
    slide: slide,
  };
};

export const slideFailData = (error) => {
  return {
    type: actionType.SLIDE_FAIL_DATA,
    error: error,
  };
};

export const slideGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "images", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(slideSetData(res.data));

        console.log("response data", res.data);
      })

      .catch((error) => dispatch(slideFailData(error)));
  };
};

export const deleteSlideFail = (error) => {
  return {
    type: actionType.DELETE_SLIDE_FAIL,
    error: error,
  };
};

export const deleteSlide = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `images/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Slide!").then(() => {
            dispatch(slideGetData(data));
          });
        })
        .catch((error) => dispatch(deleteSlideFail(error)));
    }
  };
};

export const postSlideDataStart = () => {
  return {
    type: actionType.POST_SLIDE_DATA_START,
  };
};

export const postSlideDataFail = (error) => {
  return {
    type: actionType.POST_SLIDE_DATA_FAIL,
    error: error,
  };
};

export const postSlideData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(postSlideDataStart());

    axios
      .post(baseUrl + "images", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Slide!").then(() => {
          dispatch(slideGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postSlideDataFail(error));
      });
  };
};

export const editSlideRowStart = () => {
  return {
    type: actionType.EDIT_SLIDE_ROW_START,
  };
};

export const failEditSlide = (error) => {
  return {
    type: actionType.FAIL_EDIT_SLIDE,
    error: error,
  };
};

export const editSlideRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editSlideRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `images/${id}`, {
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
      .catch((error) => dispatch(failEditSlide(error)));
  };
};

export const updateSlideDataStart = () => {
  return {
    type: actionType.UPDATE_SLIDE_DATA_START,
  };
};

export const updateSlideData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateSlideDataStart());

    axios
      .post(baseUrl + `images/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Slide!").then(() => {
          toggle();
          dispatch(slideGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
