import * as actionType from "../action/ActionTypes";

const initialState = {
  contact: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CONTACT_SET_DATA:
      return {
        ...state,
        contact: action.contact,
        error: false,
      };

    case actionType.CONTACT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_CONTACT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_CONTACT_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_CONTACT_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_CONTACT:
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
