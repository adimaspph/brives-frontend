import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import "./Scheduler.css";

function Scheduler() {
	const [curr, setCurr] = useState(new Date());
	const [firstday, setFirstday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 1))
	);
	const [lastday, setLastday] = useState(
		new Date(curr.setDate(curr.getDate() - curr.getDay() + 7))
	);
	// const [firstmonth, setFirstmonth] = useState();
	// const [lastmonth, setLastmonth] = useState();

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

	// var currday = new Date(); // get current date
	// var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week

	// var last = firstday + 6; // last day is the first day + 6

	// var firstmonth = new Date(curr.setDate(firstday)).getMonth();
	// firstmonth = monthNames[firstmonth];
	// var lastmonth = new Date(curr.setDate(lastday)).getMonth();
	// lastmonth = monthNames[lastmonth];

	const getLastDay = () => {
		// var temp = firstday;
		// temp.setDate(temp.getDate() + 6);
		// setLastday(temp);

		// var last = new Date();
		// last.setDate(last.getDate() + 6);
		// setFirstday(first);
		// firstday.setDate(curr.getDate() + 6);
		// setFirstmonth(new Date(curr.setDate(firstday)).getMonth());
		// setLastmonth(new Date(curr.setDate(lastday)).getMonth());
		// console.log(first.getDate());
		console.log(firstday);
		console.log(lastday);
	};

	useEffect(() => {}, []);

	const nextWeek = () => {
		// firstday.setDate(firstday.getDate() + 7);
		setFirstday(new Date(firstday.setDate(firstday.getDate() + 7)));
		lastday.setDate(lastday.getDate() + 7);

		// console.log(firstday);
		// console.log(lastday);
		// console.log("clicked");
	};

	const backWeek = () => {
		setFirstday(new Date(firstday.setDate(firstday.getDate() - 7)));
		lastday.setDate(lastday.getDate() - 7);
		// console.log("clicked");
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
						<span>{firstday.getDate() + 1}</span>
					</div>
					<div className="scheduler-header">
						<span>Wednesday</span>
						<span>{firstday.getDate() + 2}</span>
					</div>
					<div className="scheduler-header">
						<span>Thursday</span>
						<span>{firstday.getDate() + 3}</span>
					</div>
					<div className="scheduler-header">
						<span>Friday</span>
						<span>{firstday.getDate() + 4}</span>
					</div>
					<div className="scheduler-header">
						<span>Saturday</span>
						<span>{firstday.getDate() + 5}</span>
					</div>
					<div className="scheduler-header">
						<span>Sunday</span>
						<span>{lastday.getDate()}</span>
					</div>
				</div>
				<div className="scheduler">
					<div>
						<b>08.00</b>
					</div>

					<div className="spacer"></div>

					<div className="schedule">
						<span>Biologi</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Scheduler;