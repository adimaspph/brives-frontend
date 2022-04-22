import React, { useState, useEffect, useContext, Component } from "react";
import PenggunaService from '../services/PenggunaService';
import Navbar from "../components/Navbar/Navbar";


class Homepage extends Component {
	constructor(props) {
		super(props)
		this.state = {


		}

	}

	render() {
		return (
			<div>
				<Navbar></Navbar>
				<div class="jumbotron">
					<h1 class="display-4">Pesan Bimbingan Privat</h1>
					<p class="lead">Sedang mencari bimbel privat harian untuk persiapan ulangan mu? Segera pesan disini!</p>

					<p class="lead">
						<a class="btn btn-primary btn-lg" href="/privat" role="button">Pesan Kelas</a>
					</p>
				</div>

				<div className="row ">
					<div className="col-lg-6">

						<div id="baris1" className="mt-5 mb-5">
							<h2>Manfaat Mengikuti Kelas Privat</h2>
							<p>Tanpa mengikuti bimbel tahunan, kamu bisa memesan kelas bimbel harian</p>
							<p>Kamu akan diajar oleh pengajar terbaik BTA</p>
							<p>Kamu bebas memilih materi yang ingin diajarkan</p>
							<p>Harga kelas terjangkau</p>
						</div>

					</div>

					<div class="col-lg-6 mt-5 mb-5">
						<img src="/logo-bta.png" />

					</div>
				</div>


			</div>
		);
	}
}

export default Homepage;
