import {
	FETCH_TIME_SERIES_FAILED,
	FETCH_TIME_SERIES_START,
	FETCH_TIME_SERIES_SUCCESS,
} from "./actionTypes";

export function fetchTimeSeries(metricId) {
	return (dispatch) => {
		const url = `https://visualisedata-server.herokuapp.com/api/metrics/${metricId}`;
		dispatch(fetchTimeSeriesStart());
		fetch(url, {
			method: "GET",
            mode: 'cors',
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(fetchTimeSeriesSuccess(data.data.timeseries));
					return;
				}
				dispatch(fetchTimeSeriesFailed());
			});
	};
}

export function fetchTimeSeriesStart() {
	return {
		type: FETCH_TIME_SERIES_START,
	};
}

export function fetchTimeSeriesFailed() {
	return {
		type: FETCH_TIME_SERIES_FAILED,
	};
}

export function fetchTimeSeriesSuccess(timeseries) {
	return {
		type: FETCH_TIME_SERIES_SUCCESS,
		timeseries,
	};
}
