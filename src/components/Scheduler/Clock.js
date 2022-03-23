import React, { useState, useEffect } from "react";

export default function Clock() {
	const [clock, setClock] = useState([]);
    // const [countStart, setCountStart] = useState(1);

	// 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,

	useEffect(() => {
		for (let i = 4; i < 24; i++) {
			// const newList = list.concat({i});
			// setList(newList);
			setClock((clock) => [...clock, { jam: i, start: i}]);
            // setCountStart(countStart + 5);
			// setListZebra(listZebra.push(i));
			// console.log(clock);
			// i += 7;
		}
		console.log(clock);
        return ;
	}, []);

	function padLeadingZeros(num, size) {
		var s = num + "";
		while (s.length < size) s = "0" + s;
		return s;
	}

	return (
		<React.Fragment>
			{clock.map((item, key) => (
				<div
					key={key}
					className="clock"
					style={{ gridRowStart: (key*4)+1, gridRowEnd: (key*4) + 3 }}
				>
					<b>{padLeadingZeros(item.jam, 2)}.00</b>
				</div>
			))}
		</React.Fragment>
	);
}
