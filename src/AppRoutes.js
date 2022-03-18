import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Route from "react-router";

import BrowserRouter from "react-router-dom/BrowserRouter";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home";
import Design from "./pages/Design";
import JadwalPage from "./pages/JadwalPage/JadwalPage";
import TestForm from "./pages/TestForm";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Router>
				<div className="sidebar-container">
					<Sidebar />

					<div className="content">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/design" component={Design} />
							<Route
								exact
								path="/atur-jadwal"
								component={JadwalPage}
							/>
							<Route exact path="/akun" component={TestForm} />
						</Switch>
					</div>
				</div>
			</Router>
		</BrowserRouter>
	);
}

export default AppRoutes;
