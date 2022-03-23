import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import Clock from "./Clock";
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
		// console.log(firstday);
		// console.log(lastday);
	};

	useEffect(() => {}, []);

	const nextWeek = () => {
		// firstday.setDate(firstday.getDate() + 7);
		setFirstday(new Date(firstday.setDate(firstday.getDate() + 7)));
		tuesday.setDate(tuesday.getDate() + 7);
		wednesday.setDate(wednesday.getDate() + 7);
		thursday.setDate(thursday.getDate() + 7);
		friday.setDate(friday.getDate() + 7);
		saturday.setDate(saturday.getDate() + 7);
		lastday.setDate(lastday.getDate() + 7);

		// console.log(firstday);
		// console.log(lastday);
		// console.log("clicked");
	};

	const backWeek = () => {
		setFirstday(new Date(firstday.setDate(firstday.getDate() - 7)));
		tuesday.setDate(tuesday.getDate() - 7);
		wednesday.setDate(wednesday.getDate() - 7);
		thursday.setDate(thursday.getDate() - 7);
		friday.setDate(friday.getDate() - 7);
		saturday.setDate(saturday.getDate() - 7);
		lastday.setDate(lastday.getDate() - 7);
		// console.log("clicked");
	};

	let zebra = []
	

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
					{/* <ZebraStrip start={5} /> */}
					{/* <ZebraStrip start={13} />
					<ZebraStrip start={21} /> */}
					{/* <div className="clock">
						<b>04.00</b>
					</div> */}
					<Clock />

					{/* <div className="spacer"></div> */}
					
					

					<div className="schedule">
						<span>Biologi</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Scheduler;
