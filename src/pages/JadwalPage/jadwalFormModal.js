import React from "react";
import classes from "./styles.module.css";

const Modal = (props) => {
	const { children, modalTitle, show } = props;
	if (!show) {
		return null;
	}

	return (
		<div className={classes.modal}>
			<div className={classes.modalContent}>
				<div className={classes.modalHeader}>
					<h4 className={classes.modalTitle}>{modalTitle}</h4>
				</div>
				<div className={classes.modalBody}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
