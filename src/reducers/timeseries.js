import {
	FETCH_TIME_SERIES_FAILED,
	FETCH_TIME_SERIES_SUCCESS,
	FETCH_TIME_SERIES_START,
} from "../actions/actionTypes";

const intialTimeSeriesState = {
	timeseries: [],
	isLoading: false,
};

export default function metrics(state = intialTimeSeriesState, action) {
	switch (action.type) {
		case FETCH_TIME_SERIES_START:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_TIME_SERIES_FAILED:
			return {
				...state,
				isLoading: false,
			};
		case FETCH_TIME_SERIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				timeseries: action.timeseries,
			};
		default:
			return state;
	}
}
