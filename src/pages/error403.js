import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

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

				<div className="row d-flex justify-content-center ">

					<div class="col-lg-4 d-flex justify-content-center">
						<img className="gambar-privat" src="/gambar-403.png" width={400} />
					</div>

					<div className="col-lg-4 d-flex justify-content-center">
						<div className="mt-5 mb-5 text-403">
							<h2>Anda tidak memiliki akses untuk melihat halaman ini.</h2>
							<div className='centerin'>
							<button onClick={this.handlerBeranda} className="btn btn-blue ">Kembali Ke Beranda</button>
						</div>
						</div>
					</div>



				</div>
			</div>



		);
	}
}

export default error403;
