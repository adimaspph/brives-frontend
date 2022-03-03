import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Route from "react-router";

import BrowserRouter from "react-router-dom/BrowserRouter";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home";
import Design from "./pages/Design";

function App() {
	return (
		<BrowserRouter forceRefresh={false}>
			<Router>
				<div className="sidebar-container">
					<Sidebar />

					<div className="content">
						<Switch>
							<Route
								path="/design"
								component={() => <Design />}
							/>
							<Route path="/" component={() => <Home />} />
						</Switch>
					</div>
				</div>
			</Router>
		</BrowserRouter>
	);
}

export default hot(App);
