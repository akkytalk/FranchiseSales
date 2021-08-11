import * as actionType from "../action/ActionTypes";

const initialState = {
  slide: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SLIDE_SET_DATA:
      return {
        ...state,
        slide: action.slide,
        error: false,
      };

    case actionType.SLIDE_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_SLIDE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_SLIDE_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_SLIDE_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_SLIDE:
      return {
        ...state,
        editing: true,
        currentUser: [
          {
            id: action.id,
            name: action.name,
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
