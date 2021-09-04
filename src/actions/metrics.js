import { FETCH_METRICS_FAILED, FETCH_METRICS_START, FETCH_METRICS_SUCCESS } from "./actionTypes";

export function fetchMetrics() {
	return (dispatch) => {
		const url = "https://visualisedata-server.herokuapp.com/api/metrics";
		dispatch(fetchMetricsStart());
		fetch(url, {
			method: "GET",
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(fetchMetricsSuccess(data.data.metrics));
					return;
				}
				dispatch(fetchMetricsFailed());
			});
	};
}

export function fetchMetricsStart() {
	return {
		type: FETCH_METRICS_START,
	};
}

export function fetchMetricsFailed() {
	return {
		type: FETCH_METRICS_FAILED,
	};
}

export function fetchMetricsSuccess(metrics) {
	return {
		type: FETCH_METRICS_SUCCESS,
		metrics,
	};
}
