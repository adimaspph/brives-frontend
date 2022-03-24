import React from "react";
import { Link } from "react-router-dom";

class error403 extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "", nama: "" };

	}

	render() {
		return (
			<div className="box-403">
				<a href="" class="fa fa-arrow-left"></a>
				<div class="error403">
					<h1 className="text-403">Forbidden 403</h1>
					<p className="text-small-403">Anda tidak memiliki akses untuk melihat halaman ini.</p>

					<div className='centerin'>
						<Link className="btn btn-blue twobutton" to="/">
							Kembali Ke Beranda
						</Link>

					</div>

				</div>


			</div>
		);
	}
}

export default error403;
