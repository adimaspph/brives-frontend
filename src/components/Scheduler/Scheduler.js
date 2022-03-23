import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import Schedule from "./Schedule";
import "./Scheduler.css";
import ZebraStrip from "./ZebraStrip";

function Scheduler() {
	const [curr, setCurr] = useState(new Date());
	const [firstday, setFirstday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 1))
	);
	const [tuesday, setTuesday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 2))
	);
	const [wednesday, setWednesday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 3))
	);
	const [thursday, setThursday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 4))
	);
	const [friday, setFriday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 5))
	);
	const [saturday, setSaturday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
	);
	const [lastday, setLastday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 7))
	);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	useEffect(() => {}, []);

	const nextWeek = () => {
		setFirstday(new Date(firstday.setDate(firstday.getDate() + 7)));
		setTuesday(new Date(tuesday.setDate(tuesday.getDate() + 7)));
		setWednesday(new Date(wednesday.setDate(wednesday.getDate() + 7)));
		setThursday(new Date(thursday.setDate(thursday.getDate() + 7)));
		setFriday(new Date(friday.setDate(friday.getDate() + 7)));
		setSaturday(new Date(saturday.setDate(saturday.getDate() + 7)));
		setLastday(new Date(lastday.setDate(lastday.getDate() + 7)));
	};

	const backWeek = () => {
		setFirstday(new Date(firstday.setDate(firstday.getDate() - 7)));
		setTuesday(new Date(tuesday.setDate(tuesday.getDate() - 7)));
		setWednesday(new Date(wednesday.setDate(wednesday.getDate() - 7)));
		setThursday(new Date(thursday.setDate(thursday.getDate() - 7)));
		setFriday(new Date(friday.setDate(friday.getDate() - 7)));
		setSaturday(new Date(saturday.setDate(saturday.getDate() - 7)));
		setLastday(new Date(lastday.setDate(lastday.getDate() - 7)));
	};

	return (
		<div>
			<div className="week-selection">
				<svg
					onClick={backWeek}
					width="24"
					height="24"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M12.5357 13.4L12.5357 2.59998L3.46484 7.99997L12.5357 13.4Z"
						fill="#505154"
					/>
				</svg>
				<span>
					{firstday.getDate() +
						` ` +
						monthNames[firstday.getMonth()] +
						` ` +
						firstday.getFullYear() +
						` - ` +
						lastday.getDate() +
						` ` +
						monthNames[lastday.getMonth()] +
						` ` +
						lastday.getFullYear()}
				</span>
				<svg
					onClick={nextWeek}
					width="24"
					height="24"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M3.46484 2.59998L3.46484 13.4L12.5357 7.99998L3.46484 2.59998Z"
						fill="#505154"
					/>
				</svg>
			</div>
			<div className="scheduler-container">
				<div className="scheduler-header-main">
					<div className="scheduler-header">
						<span></span>
					</div>
					<div className="scheduler-header">
						<span>Monday</span>
						<span>{firstday.getDate()}</span>
					</div>
					<div className="scheduler-header">
						<span>Tuesday</span>
						<span>{tuesday.getDate()}</span>
					</div>
					<div className="scheduler-header">
						<span>Wednesday</span>
						<span>{wednesday.getDate()}</span>
					</div>
					<div className="scheduler-header">
						<span>Thursday</span>
						<span>{thursday.getDate()}</span>
					</div>
					<div className="scheduler-header">
						<span>Friday</span>
						<span>{friday.getDate()}</span>
					</div>
					<div className="scheduler-header">
						<span>Saturday</span>
						<span>{saturday.getDate()}</span>
					</div>
					<div className="scheduler-header">
						<span>Sunday</span>
						<span>{lastday.getDate()}</span>
					</div>
				</div>
				<div className="scheduler">
					<ZebraStrip />
					<Clock />

					{/* <div className="spacer"></div> */}

					{/* <div className="schedule">
						<span>Biologi</span>
					</div> */}
					<Schedule date={firstday} hari={1} />
					<Schedule date={tuesday} hari={2} />
					<Schedule date={wednesday} hari={3} />
					<Schedule date={thursday} hari={4} />
					<Schedule date={friday} hari={5} />
					<Schedule date={saturday} hari={6} />
					<Schedule date={lastday} hari={7} />
				</div>
			</div>
		</div>
	);
}

export default Scheduler;
