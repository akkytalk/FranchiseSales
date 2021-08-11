import * as actionType from "../action/ActionTypes";

const initialState = {
  franchisor: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FRANCHISOR_SET_DATA:
      return {
        ...state,
        franchisor: action.franchisor,
        error: false,
      };

    case actionType.FRANCHISOR_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_FRANCHISOR_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_FRANCHISOR_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_FRANCHISOR_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_FRANCHISOR:
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
