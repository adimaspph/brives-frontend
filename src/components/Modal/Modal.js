import React from "react";
import classes from "./modal.css";

const Modal = (props) => {
	const { children, modalTitle, show } = props;
	if (!show) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modalContent">
				<div className="modalHeader">
					<h3 className="modalTitle">{modalTitle}</h3>
				</div>
				<div className="modalBody">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
