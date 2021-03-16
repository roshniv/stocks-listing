import * as types from "../actions/actionTypes";

export default function logsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_LOGS_SUCCESS:
      return action.logs;
    default:
      return state;
  }
}
