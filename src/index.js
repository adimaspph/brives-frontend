import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppRoutes from "./AppRoutes";
import './stylesheet.css';

ReactDOM.render(
	<React.StrictMode>
		<AppRoutes />
	</React.StrictMode>,
	document.getElementById("root")
);


