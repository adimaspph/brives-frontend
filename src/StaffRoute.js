import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Homepage from "./pages/Homepage";
import Design from "./pages/Design";
import JadwalPage from "./pages/JadwalPage/JadwalPage";
import CreateAkunPage from "./pages/CreateAkunPage/CreateAkunPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TestForm from "./pages/TestForm";
import ListMapelComponent from "./pages/Mapel/ListMapelComponent";
import CreateMapelComponent from "./pages/Mapel/CreateMapelComponent";
import UpdateMapelComponent from "./pages/Mapel/UpdateMapelComponent";
import DetailMapelComponent from "./pages/Mapel/DetailMapelComponent";
import DetailPesanan from "./pages/Pesanan/DetailPesanan";
import DetailRiwayatPesanan from "./pages/Pesanan/DetailRiwayatPesanan";
import ListPengguna from "./pages/Pengguna/ListPengguna";
import ListPesanan from "./pages/Pesanan/ListPesanan";
import DetailPengguna from "./pages/Pengguna/DetailPengguna";
import EditPengguna from "./pages/Pengguna/EditPengguna";
import { PrivateRoute } from "./PrivateRoute";
import error403 from "./pages/error403";
import error404 from "./pages/error404";
import ViewProfilePage from "./pages/ViewProfilePage/ViewProfilePage";
import BayarPesanan from "./pages/Pesanan/BayarPesanan";
import DetailPembayaran from "./pages/Pesanan/DetailPembayaran";
import DaftarPembayaran from "./pages/Pesanan/DaftarPembayaran";
import DetailPembayaranStaff from "./pages/Pesanan/DetailPembayaranStaff";
import ListLogPengajarTerpilih from "./pages/Log/ListLogPengajarTerpilih";
import ListLogSatuPengajar from "./pages/Log/ListLogSatuPengajar";
import ListPengajar from "./pages/Log/ListPengajar";
import DetailLog from "./pages/Log/DetailLog";
import PilihPengajarPage from "./pages/PilihPengajarPage/PilihPengajarPage";


export default function StaffRoute() {
    const [toggleNav, setToggleNav] = useState(false);

    const toggleHamburger = () => {
		setToggleNav(!toggleNav);
    }

    return (
		<Router>
			<div className="sidebar-container">
				<Sidebar active={toggleNav}/>
				<div 
                    className={toggleNav ? "menu-toggle is-active" : "menu-toggle"}
                    onClick={toggleHamburger}
                >
					<div className="hamburger">
						<span></span>
					</div>
				</div>
				<div className="content">
					<Switch>
						<PrivateRoute exact path="/beranda" component={Home} />
						<PrivateRoute
							exact
							path="/akun/create"
							component={CreateAkunPage}
						/>
						<PrivateRoute
							exact
							path="/atur-jadwal/:username"
							component={JadwalPage}
						/>
						<PrivateRoute
							exact
							path="/jadwal-pengajar"
							component={PilihPengajarPage}
						/>
						<PrivateRoute
							exact
							path="/jadwal-pengajar/:username"
							component={JadwalPage}
						/>
						<PrivateRoute
							exact
							path="/atur-mapel"
							component={ListMapelComponent}
						/>
						<PrivateRoute
							exact
							path="/dashboard"
							component={DashboardPage}
						/>
						<PrivateRoute
							exact
							path="/atur-mapel/add"
							component={CreateMapelComponent}
						/>
						<PrivateRoute
							exact
							path="/atur-mapel/view/:idMapel"
							component={DetailMapelComponent}
						/>
						<PrivateRoute
							exact
							path="/atur-mapel/:idMapel/update"
							component={UpdateMapelComponent}
						/>
						<PrivateRoute
							exact
							path="/pengguna"
							component={ListPengguna}
						/>
						<PrivateRoute
							exact
							path="/pesanan"
							component={ListPesanan}
						/>
						<PrivateRoute
							exact
							path="/pesanan/:idPesanan"
							component={DetailPesanan}
						/>
						<PrivateRoute
							exact
							path="/pengguna/:idUser"
							component={DetailPengguna}
						/>
						<PrivateRoute
							exact
							path="/pengguna/edit/:idUser"
							component={EditPengguna}
						/>
						<PrivateRoute
							exact
							path="/profil-saya"
							component={ViewProfilePage}
						/>
						<PrivateRoute
							exact
							path="/detail-pembayaran/:idPesanan"
							component={DetailPembayaran}
						/>
						<PrivateRoute
							exact
							path="/detail-pembayaran-staff/:idPesanan"
							component={DetailPembayaranStaff}
						/>
						<PrivateRoute
							exact
							path="/daftar-pembayaran"
							component={DaftarPembayaran}
						/>
						<PrivateRoute
							exact
							path="/log"
							component={ListLogSatuPengajar}
						/>
						<PrivateRoute
							exact
							path="/log-pengajar/:idStaff"
							component={ListLogPengajarTerpilih}
						/>
						<PrivateRoute
							exact
							path="/log-pengajar"
							component={ListPengajar}
						/>
						<PrivateRoute
							exact
							path="/log/:idLog"
							component={DetailLog}
						/>
						<Route exact path="/404" component={error404} />
						<Route exact path="/403" component={error403} />
						<Redirect from="*" to="/404" />

						{/* <Route path="/" component={() => (window.location = "/404")} /> */}
					</Switch>
				</div>
			</div>
		</Router>
	);
}
