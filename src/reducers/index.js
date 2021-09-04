import { combineReducers } from "redux";
import metrics from "./metrics";
import timeseries from "./timeseries";

// combine all these reducers and export it by default
export default combineReducers({
	metrics,
	timeseries,
});
