import React, { useState, useEffect } from "react";

export default function ZebraStrip({start}) {
	const [listZebra, setListZebra] = useState([
		2, 10, 18, 26, 34, 42, 50, 58, 66, 74,
	]);

	return (
		<React.Fragment>
			{listZebra.map((item, key) => (
				<div key={key}
					className="spacer"
					style={{ gridRowStart: item, gridRowEnd: item + 4 }}
				></div>
			))}
		</React.Fragment>
	);
}
