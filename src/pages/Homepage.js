import React, { useState, useEffect, useContext, Component } from "react";
import PenggunaService from '../services/PenggunaService';
import Navbar from "../components/Navbar/Navbar";
import "./Homepage.css";
import { Redirect } from "react-router-dom";


class Homepage extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
		const userRaw = JSON.parse(localStorage.getItem("user"));
		console.log(userRaw);
		if (userRaw != null && userRaw.role != "PELAJAR") {
			console.log(userRaw.role);
			this.props.history.push("/beranda");
		}
	}

	render() {
		return (
			<div>
				<Navbar></Navbar>
				<div class="jumbotron row d-flex ">
					<div col-lg-8>
						<h1 class="">Pesan Kelas Bimbingan Privat</h1>
						<p class="lead">Sedang mencari bimbel privat harian untuk persiapan ujian? Segera pesan disini!</p>
						<p class="lead">
							<a class="btn btn-primary btn-lg" href="/privat" role="button">Pesan Kelas</a>
						</p>
					</div>
					<div className="col-lg-5 d-flex justify-content-center logo-bta-col">
						<img className="logo-bta" src="/logo-bta.png"  />
					</div>

				</div>

				<div className="row d-flex justify-content-center ">

					<div class="col-lg-5 d-flex justify-content-center">
						<img className="gambar-privat" src="/gambar-privat.png" width={400} />
					</div>

					<div className="col-lg-7 d-flex justify-content-center">
						<div className="mt-5 mb-5 benefit">
							<h2>Manfaat Mengikuti Kelas Privat di BTA</h2>
							<p>1. Tanpa mengikuti bimbel tahunan, kamu bisa memesan kelas bimbel harian</p>
							<p>2. Kamu akan diajar oleh pengajar terbaik BTA</p>
							<p>3. Kamu bebas memilih materi yang ingin diajarkan</p>
							<p>4. Harga kelas terjangkau</p>
						</div>
					</div>



				</div>





			</div>
		);
	}
}

export default Homepage;
