import React from "react";
import { Line, XAxis, YAxis, Tooltip, Legend, Area, ComposedChart } from "recharts";

function Graph(props) {
	const { metrics, data, id } = props;
	const timeseriesData = data.data;

	// create data for area chart of min_band and max_band
	// const bandData = timeseriesData.map((ts) => {
	// 	return {
	// 		range: [ts.min_band, ts.max_band],
	// 		timestamp: (new Date(ts.timestamp).toLocaleDateString()).slice(0, -5),
	// 	};
	// });

	// convert utc time for every timeseries data into local time
	timeseriesData.map((ts) => {
		return {
			...ts,
			timestamp: new Date(ts.timestamp).toLocaleDateString().slice(0, -5),
		};
	});

	// create anomly
	const finalTimeSeriesData = timeseriesData.map((ts) => {
		if (ts.line_status === 1 || ts.line_status === 2) {
			return {
				...ts,
				anomaly: ts.original_value,
				timestamp: new Date(ts.timestamp).toLocaleDateString().slice(0, -5),
			};
		}
		return {
			...ts,
			anomaly: null,
			timestamp: new Date(ts.timestamp).toLocaleDateString().slice(0, -5),
		};
	});

	// find current metric
	const currentMetric = metrics.filter((m) => m._id === id);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<div className="dimensions-container">
				<p style={{ color: "white", marginRight: "20px" }}>Dimesnions: </p>
				{currentMetric &&
					currentMetric[0].dimensions.map((e) => {
						return <p className="dimensions-text">{`${e.name} : ${e.value}`}</p>;
					})}
			</div>
			<div className="graph-container">
				<ComposedChart
					width={1200}
					height={400}
					margin={{ top: 95, right: 5, bottom: 5, left: 5 }}
					data={finalTimeSeriesData}
					className="graph"
				>
					<Line type="monotone" dataKey="original_value" dot={false} stroke="blue" />
					<Line type="monotone" dataKey="anomaly" stroke="red" dot={false} />
					<Line
						type="monotone"
						dataKey="forecasted_value"
						dot={false}
						stroke="blue"
						strokeDasharray="3 3"
					/>
					<Area type="monotone" dataKey="max_band" stroke="gray" fill="gray" />
					<Area type="monotone" dataKey="min_band" stroke="gray" fill="black" />
					<Legend wrapperStyle={{top: 0, left: 25}}/>
					<XAxis dataKey="timestamp" />
					<YAxis dataKey="original_value" />
					<Tooltip />
				</ComposedChart>
			</div>
		</div>
	);
}

export default Graph;
