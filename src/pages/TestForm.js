import React from "react";

class TestForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: "", nama: "" };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		// alert("A name was submitted: " + this.state.value);
		this.setState({ nama: this.state.value });
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<h1>{this.state.nama}</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input
							type="text"
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default TestForm;
