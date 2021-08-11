import * as actionType from "../action/ActionTypes";

const initialState = {
  franchise: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FRANCHISE_SET_DATA:
      return {
        ...state,
        franchise: action.franchise,
        error: false,
      };

    case actionType.FRANCHISE_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_FRANCHISE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_FRANCHISE_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_FRANCHISE_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_FRANCHISE:
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
