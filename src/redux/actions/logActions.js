import * as types from "./actionTypes";
import * as logsApi from "../../api/logsApi";

export function loadLogsSuccess(logs) {
  return { type: types.LOAD_LOGS_SUCCESS, logs };
}

export function loadLogs() {
  return function(dispatch) {
    return logsApi
      .getLogs()
      .then(logs => {
        dispatch(loadLogsSuccess(logs));
      })
      .catch(error => {
        throw error;
      });
  };
}
