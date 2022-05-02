import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

class error403 extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "", nama: "" };


	}

	handlerBeranda = () => {
		window.location = "/";
	}

	render() {
		return (
			<div className="container-403">
				{localStorage.getItem("user") != null && JSON.parse(localStorage.getItem("user")).role === 'PELAJAR' ? (
					<Navbar />
				) : ("")}

				{localStorage.getItem("user") === null ? (
					<Navbar />
				) : ("")}

				<div className="d-flex justify-content-center page-container">

					<div class="">
						<img className="gambar-403" src="/gambar-403.png" />
					</div>

					<div className="col-lg-4 d-flex justify-content-center">
						<div className="mt-5 mb-5 text-403">
							<h2 className="font-403">Anda tidak memiliki akses untuk melihat halaman ini.</h2>
							<div className='centerin'>
								<button onClick={this.handlerBeranda} className="button button-blue ">Kembali Ke Beranda</button>
							</div>
						</div>
					</div>
				</div>

				{localStorage.getItem("user") != null && JSON.parse(localStorage.getItem("user")).role === 'PELAJAR' ? (
					<Footer />
				) : ("")}

				{localStorage.getItem("user") === null ? (
					<Footer />
				) : ("")}
			</div>



		);
	}
}

export default error403;
