import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import React from "react";
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
import error403 from "./pages/error403";
import ViewProfilePage from "./pages/ViewProfilePage/ViewProfilePage";

export default function StaffRoute() {
	return (
		<Router>
			{/* <Switch> */}
			{/* <Route path="/" component={Home} /> */}
			<div className="sidebar-container">
                    <Sidebar />
                    <div className="content">
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <PrivateRoute exact path="/akun/create" component={CreateAkunPage} />
                            <PrivateRoute exact path="/atur-jadwal" component={JadwalPage} />
                            
                            
                            <PrivateRoute exact path="/atur-mapel" component={ListMapelComponent} />
                            <PrivateRoute exact path="/atur-mapel/add" component={CreateMapelComponent} />
                            
                            <PrivateRoute exact path="/atur-mapel/view/:idMapel" component={DetailMapelComponent} />
                            <PrivateRoute exact path="/atur-mapel/:idMapel/update" component={UpdateMapelComponent} />
                            <PrivateRoute exact path="/pengguna" component={ListPengguna} />
                            <PrivateRoute exact path="/pengguna/:idUser" component={DetailPengguna} />
                            <PrivateRoute exact path="/profil-saya" component={ViewProfilePage} />
                            
                            {/* <Redirect from="*" to="/not-found" /> */}
                            <Route path='*' component={error403} />
                            
                        </Switch>
                    </div>
                </div>
			{/* </Switch> */}
		</Router>
	);
}
