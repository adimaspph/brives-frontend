import React from "react";

class error403 extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "", nama: "" };

	}

	render() {
		return (
			<div>
				<a href="" class="fa fa-arrow-left"></a>
				<div class="error403">
					<h1>Forbidden 403</h1>
					<p>Anda tidak memiliki akses untuk melihat halaman ini.</p>
				</div>
			</div>
		);
	}
}

export default error403;
