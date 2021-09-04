import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Graph from "./Graph";
import { fetchMetrics } from "../actions/metrics";
import { fetchTimeSeries } from "../actions/timeseries";

function App(props) {
	const { dispatch } = props;
	const { metrics } = props.metrics;
	const { timeseries } = props.timeseries;
	const [toMeasure, setToMeasure] = useState("");
	let typesOfMetrics = [];

	useEffect(() => {
		dispatch(fetchMetrics());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchTimeSeries(toMeasure));
	}, [toMeasure, dispatch]);

	// filter measure from all the metrics
	metrics && metrics.forEach((m) => typesOfMetrics.push(m.measure));
	// remove duplicate measure values
	typesOfMetrics = [...new Set(typesOfMetrics)];

	return (
		<div>
			<div className="option-container">
				<p className="choice-text">What you want to measure ?</p>

				<div>
					{typesOfMetrics &&
						typesOfMetrics.map((metric, index) => {
							return (
								<button
									className="metric-btn"
									value={metric}
									key={index}
									onClick={(e) => setToMeasure(e.target.value)}
								>
									{metric}
								</button>
							);
						})}
				</div>
			</div>

			{toMeasure && timeseries && (
				<div className="heading-graph-container">
					<p className="trends">
						See the trends for <em>{toMeasure}</em>
					</p>
					{timeseries.map((ts) => {
						return <Graph data={ts} key={ts._id} id={ts._id} metrics={metrics} />;
					})}
				</div>
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		metrics: state.metrics,
		timeseries: state.timeseries,
	};
}

export default connect(mapStateToProps)(App);
