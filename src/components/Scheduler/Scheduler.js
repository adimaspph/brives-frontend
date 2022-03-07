import React from "react";
import "./Scheduler.css";

function Scheduler() {
	return (
		<div className="scheduler-container">
			<div className="scheduler-header-main">
				<div className="scheduler-header schedule-header scheduler-clock">
					<span>Jam</span>
				</div>
				<div className="scheduler-header">
					<span>Senin</span>
				</div>
				<div className="scheduler-header">
					<span>Selasa</span>
				</div>
				<div className="scheduler-header">
					<span>Rabu</span>
				</div>
				<div className="scheduler-header">
					<span>Kamis</span>
				</div>
				<div className="scheduler-header">
					<span>Jumat</span>
				</div>
				<div className="scheduler-header">
					<span>Sabtu</span>
				</div>
				<div className="scheduler-header">Minggu</div>
			</div>
			<div className="scheduler">
				
				
				<div>08</div>
				<div>15</div>

				<div className="spacer"></div>

				<div className="schedule">Biologi</div>
			</div>
		</div>
	);
}

export default Scheduler;
