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
			<React.Fragment>
				<Navbar/>
				<div className="d-flex justify-content-center page-container">
					<div class="col-lg-4 d-flex justify-content-center">
						<img className="gambar-404" src="/gambar-404.png" />
					</div>
					<div className="col-lg-4 d-flex justify-content-center">
						<div className=" text-404">
							<h2 className="text-404">Oops.. Halaman ini tidak dapat ditemukan.</h2>
							<div className='centerin'>
								<button onClick={this.handlerBeranda} className="button button-blue ">Kembali Ke Beranda</button>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</React.Fragment>
		);
	}
}

export default error404;
