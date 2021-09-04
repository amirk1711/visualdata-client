import {
	FETCH_METRICS_FAILED,
	FETCH_METRICS_SUCCESS,
	FETCH_METRICS_START,
} from "../actions/actionTypes";

const intialMetricsState = {
	metrics: [],
	isLoading: false,
};

export default function metrics(state = intialMetricsState, action) {
	switch (action.type) {
		case FETCH_METRICS_START:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_METRICS_FAILED:
			return {
				...state,
				isLoading: false,
			};
		case FETCH_METRICS_SUCCESS:
			return {
				...state,
				isLoading: false,
				metrics: action.metrics,
			};
		default:
			return state;
	}
}
