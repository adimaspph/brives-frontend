import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

class error404 extends React.Component {
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
						<img className="gambar-404" src="/gambar-404.png" />
					</div>

					<div className="col-lg-4 d-flex justify-content-center">
						<div className=" text-404">
							<h2 className="text-404">Oops.. Halaman tidak dapat dapat ditemukan.</h2>
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

export default error404;
