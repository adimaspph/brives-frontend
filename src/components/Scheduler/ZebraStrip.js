import React, { useState, useEffect } from "react";

export default function ZebraStrip({start}) {
	const [listZebra, setListZebra] = useState([
		2, 10, 18, 26, 34, 42, 50, 58, 66, 74,
	]);
	// var tempList = [];
	// var count = 0;
	// // while (count <= 20) {
	// //     tempList.push()
	// //     count++;
	// // }

	useEffect(() => {
		for (let i = 2; i < 80; i++) {
			// const newList = list.concat({i});

			// setList(newList);
			// setList([...list, i]);
			// setListZebra(listZebra.push(i));
			// console.log(i);
			// i += 7;
		}
		// console.log(listZebra);
	}, []);

	return (
		// <div
		// 		className="spacer"
		// 		// style={`grid-row-start: ${start} ;grid-row-end: ${start + 2};`}
		// 		// style={`grid-row-start: 7 ;grid-row-end: 10;`}
		// 		style={{ gridRowStart: start, gridRowEnd: start + 4 }}
		// 	></div>
		<React.Fragment>
			{/* <div
				className="spacer"
				// style={`grid-row-start: ${start} ;grid-row-end: ${start + 2};`}
				// style={`grid-row-start: 7 ;grid-row-end: 10;`}
				style={{ gridRowStart: start, gridRowEnd: start + 4 }}
			></div> */}
			{/* {list.map(item => 
				<div
					className="spacer"
					// style={`grid-row-start: ${start} ;grid-row-end: ${start + 2};`}
					// style={`grid-row-start: 7 ;grid-row-end: 10;`}
					style={{ gridRowStart: item, gridRowEnd: item + 4 }}
				></div>
			)} */}
			{listZebra.map((item) => (
				<div
					className="spacer"
					// style={`grid-row-start: ${start} ;grid-row-end: ${start + 2};`}
					// style={`grid-row-start: 7 ;grid-row-end: 10;`}
					style={{ gridRowStart: item, gridRowEnd: item + 4 }}
				></div>
			))}
		</React.Fragment>
	);
}
