import React, { useState, useEffect, useContext, Component } from "react";
import PenggunaService from '../services/PenggunaService';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Homepage.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Homepage extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}

		this.clickPesan = this.clickPesan.bind(this);

	}

	componentDidMount() {
		const userRaw = JSON.parse(localStorage.getItem("user"));
		console.log(userRaw);
		if (userRaw != null && userRaw.role != "PELAJAR") {
			console.log(userRaw.role);
			this.props.history.push("/beranda");
		}
	}

	clickPesan = () => {
		window.location = "/privat";
	};

	render() {
		return (
			<div className="page-container">
				<Navbar></Navbar>
				<div class="jumbotronn row d-flex justify-content-center">
					<div className="col-lg-6 justify-content-center ">
						<h1>Bimbingan Belajar Privat</h1>
						<p>Sedang mencari bimbel privat harian untuk persiapan ujian? Segera pesan disini!</p>
						<a className="btn btn-primary button-pesan" onClick={this.clickPesan}>
								Pesan Kelas
						</a>
					</div>
					<div className="col-4 d-flex justify-content-center logo-bta-col d-none  ">
						<img className="logo-bta" src="/logo-bta.png" />
					</div>

				</div>

				<div className="row d-flex justify-content-center ">

					<div class="col-lg-4 d-flex justify-content-center">
						<img className="gambar-privat" src="/gambar-privat.png" width={350} height={350} />
					</div>

					<div className="col-lg-5 d-flex justify-content-center">
						<div className="mt-5 mb-5 benefit">
							<h2>Manfaat Mengikuti Kelas Privat di BTA</h2>
							<p>1. Tanpa mengikuti bimbel tahunan, kamu bisa memesan kelas bimbel harian</p>
							<p>2. Kamu akan diajar oleh pengajar terbaik BTA</p>
							<p>3. Kamu bebas memilih materi yang ingin diajarkan</p>
							<p>4. Harga kelas terjangkau</p>
							{/* <a className="btn btn-primary button-pesan" onClick={this.clickPesan}>
								Pesan Kelas
							</a> */}
						</div>
					</div>



				</div>
				<Footer></Footer>





			</div>
		);
	}
}

export default Homepage;
