import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import Route from "react-router";

import BrowserRouter from "react-router-dom/BrowserRouter";
import Sidebar from "./components/Sidebar/Sidebar";


import Home from "./pages/Home";
import Homepage from "./pages/Homepage";
import Design from "./pages/Design";
import JadwalPage from "./pages/JadwalPage/JadwalPage";
import CreateAkunPage from "./pages/CreateAkunPage/CreateAkunPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AkunPage from "./pages/AkunPage/AkunPage";
import EditAkunPage from "./pages/AkunPage/EditAkunPage";
import UbahPasswordPage from "./pages/AkunPage/UbahPasswordPage";
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
import PesanKelasPage from "./pages/PesanKelasPage/PesanKelasPage";
import RiwayatPesanan from "./pages/Pesanan/RiwayatPesanan";
import DetailRiwayatPesanan from "./pages/Pesanan/DetailRiwayatPesanan";


function AppRoutes() {

	return (
		<BrowserRouter>
			<Router>
				<Switch>
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route exact path="/akun/profil" component={AkunPage} />
					<Route exact path="/akun/profil/edit" component={EditAkunPage} />
					<Route exact path="/akun/profil/ganti-password" component={UbahPasswordPage} />
					<Route exact path="/design" component={Design} />
					<Route exact path="/403" component={error403} />
					<Route exact path="/privat" component={PesanKelasPage} />
					<Route exact path="/riwayat-pesanan" component={RiwayatPesanan} />
					<Route exact path="/riwayat-pesanan/:idPesanan" component={DetailRiwayatPesanan} />
					<Route exact path="/" component={Homepage} />
					<Route path="/" component={StaffRoute} />
					<Redirect from="*" to="/404" />
					
				</Switch>
			</Router>
		</BrowserRouter>
	);
}

export default AppRoutes;
