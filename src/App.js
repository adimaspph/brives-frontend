import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Route from "react-router";

import BrowserRouter from "react-router-dom/BrowserRouter";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home";
import Design from "./pages/Design";
import JadwalPage from "./pages/JadwalPage/JadwalPage";
import ListMapelComponent from "./pages/Mapel/ListMapelComponent";
import CreateMapelComponent from "./pages/Mapel/CreateMapelComponent";
import UpdateMapelComponent from "./pages/Mapel/UpdateMapelComponent";


function App() {
	return (
		<BrowserRouter>
			<Router>
				<div className="sidebar-container">
					<Sidebar />
					{/* <ul>
						<li>
							<Link to="/design">Design</Link>
						</li>
						<li>
							<Link to="/">Home</Link>
						</li>
					</ul> */}

					<div className="content">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/design" component={Design} />
							<Route exact path="/atur-jadwal" component={JadwalPage} />
							<Route exact path="/atur-mapel" component={ListMapelComponent} />
							<Route exact path="/atur-mapel/add" component={CreateMapelComponent} />
							<Route exact path="/atur-mapel/update/:idMapel" component={UpdateMapelComponent} />

						</Switch>
					</div>

					
				</div>
			</Router>
		</BrowserRouter>
	);
}

export default App;
