import * as actionType from "../action/ActionTypes";

const initialState = {
  offer: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.OFFER_SET_DATA:
      return {
        ...state,
        offer: action.offer,
        error: false,
      };

    case actionType.OFFER_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_OFFER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_OFFER_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_OFFER_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_OFFER:
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
