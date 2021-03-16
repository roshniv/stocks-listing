import { combineReducers } from "redux";
import logs from "./logsReducer";

const rootReducer = combineReducers({
  logs
});

export default rootReducer;
