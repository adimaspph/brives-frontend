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
		if (userRaw != null && userRaw.role != "PELAJAR") {
			this.props.history.push("/beranda");
		}
	}

	clickPesan = () => {
		window.location = "/pesan-kelas";
	};

	render() {
		return (
			<div className="">
				<Navbar />
				<div className="page-container">
					<div class="jumbotronn home-container">
						<div className="">
							<h1>Bimbingan Belajar Privat</h1>
							<p>
								Sedang mencari bimbel privat harian untuk
								persiapan ujian? Segera pesan disini!
							</p>
							<a
								className="button button-primary button-pesan"
								onClick={this.clickPesan}
							>
								Pesan Kelas
							</a>
						</div>
						<div className="logo-bta">
							<img className="logo-bta" src="/logo-bta.png" />
						</div>
					</div>

					<div className="home-container">
						<div class="col-lg-4 d-flex justify-content-center">
							<img
								className="gambar-privat"
								src="/gambar-privat.png"
								width={350}
								height={350}
							/>
						</div>

					
						<div className="benefit">
							<h2>Manfaat Mengikuti Kelas Privat di BTA</h2>
							<p>
								1. Tanpa mengikuti bimbel tahunan, kamu bisa
								memesan kelas bimbel harian
							</p>
							<p>
								2. Kamu akan diajar oleh pengajar terbaik
								BTA
							</p>
							<p>
								3. Kamu bebas memilih materi yang ingin
								diajarkan
							</p>
							<p>4. Harga kelas terjangkau</p>
						</div>
					</div>
				</div>

				<Footer></Footer>
			</div>
		);
	}
}

export default Homepage;
