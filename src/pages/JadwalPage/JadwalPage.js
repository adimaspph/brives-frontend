import React from "react";
import Scheduler from "../../components/Scheduler/Scheduler";
import "./JadwalPage.css";

function JadwalPage() {
	return (
		<div className="jadwal-container">
			<h1>Atur Jadwal</h1>
			<Scheduler></Scheduler>
		</div>
	);
}

export default JadwalPage;
