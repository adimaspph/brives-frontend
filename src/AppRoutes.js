import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import Route from "react-router";

import BrowserRouter from "react-router-dom/BrowserRouter";
import Sidebar from "./components/Sidebar/Sidebar";


import Home from "./pages/Home";
import Design from "./pages/Design";
import JadwalPage from "./pages/JadwalPage/JadwalPage";
import CreateAkunPage from "./pages/CreateAkunPage/CreateAkunPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TestForm from "./pages/TestForm";
import ListMapelComponent from "./pages/Mapel/ListMapelComponent";
import CreateMapelComponent from "./pages/Mapel/CreateMapelComponent";
import UpdateMapelComponent from "./pages/Mapel/UpdateMapelComponent";
import DetailMapelComponent from "./pages/Mapel/DetailMapelComponent";
import ListPengguna from "./pages/Pengguna/ListPengguna";
import DetailPengguna from "./pages/Pengguna/DetailPengguna";
import { PrivateRoute } from "./PrivateRoute";
import { Redirect } from "react-router-dom";
import error403 from "./pages/error403";
import ViewProfilePage from "./pages/ViewProfilePage/ViewProfilePage";
import StaffRoute from "./StaffRoute";



function AppRoutes() {

	return (
		<BrowserRouter>
			<Router>
				<Switch>
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/design" component={Design} />
					<Route exact path="/403" component={error403} />
					<PrivateRoute path="/" component={StaffRoute} />
					<Redirect from="*" to="/404" />
					{/* <div className="sidebar-container">
					<Sidebar />

					<div className="content">
						
							<PrivateRoute exact path="/" component={Home} />
							<Route exact path="/login" component={LoginPage} />
							<Route exact path="/design" component={Design} />
							<Route exact path="/403" component={error403} />
							<PrivateRoute exact path="/akun/create" component={CreateAkunPage} />
							<PrivateRoute exact path="/atur-jadwal" component={JadwalPage} />
							<PrivateRoute exact path="/atur-mapel" component={ListMapelComponent} />
							<PrivateRoute exact path="/atur-mapel/add" component={CreateMapelComponent} />
							<PrivateRoute exact path="/atur-mapel/:idMapel/update" component={UpdateMapelComponent} />
							<PrivateRoute exact path="/atur-mapel/:idMapel" component={DetailMapelComponent} />
							<PrivateRoute exact path="/pengguna" component={ListPengguna} />
							<PrivateRoute exact path="/pengguna/:idUser" component={DetailPengguna} />
							<PrivateRoute exact path="/profil-saya" component={ViewProfilePage} />
							
							<Redirect from="*" to="/" />
						
					</div>
				</div> */}
				</Switch>
			</Router>
		</BrowserRouter>
	);
}

export default AppRoutes;
