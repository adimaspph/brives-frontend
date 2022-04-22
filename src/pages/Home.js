import React, { useState, useEffect, useContext, Component } from "react";
import PenggunaService from '../services/PenggunaService';



// function Home() {
// 	const { role, jwt, setRole, setJwt } = useContext(UserContext);

// 	const handleFailure = (result) => {
// 		// alert(result);
// 	};

// 	const handleLogin = (googleData) => {
// 		console.log(googleData);
// 	};

// 	const responseGoogle = (response) => {
// 		console.log(response);
// 	};

// 	const handlePay = () => {
// 		console.log("Pay Pay");
// 		const token = "cc5b1f50-32a0-4156-8ba0-066922541bc9";
// 		window.snap.pay(token);
// 	};

// 	useEffect(() => {
// 		//change this to the script source you want to load, for example this is snap.js sandbox env



// 		const midtransScriptUrl =
// 			"https://app.sandbox.midtrans.com/snap/snap.js";
// 		//change this according to your client-key
// 		const myMidtransClientKey = "SB-Mid-client-RoG71GkViRrFWrrQ";

// 		let scriptTag = document.createElement("script");
// 		scriptTag.src = midtransScriptUrl;
// 		// optional if you want to set script attribute
// 		// for example snap.js have data-client-key attribute
// 		scriptTag.setAttribute("data-client-key", myMidtransClientKey);

// 		document.body.appendChild(scriptTag);
// 		return () => {
// 			document.body.removeChild(scriptTag);
// 		};
// 	}, []);

// 	return (
// 		<div>
// 			<h1>{role}</h1>
// 			<h1>BTA Private E-Learning System (BRIVES)</h1>
// 			<Link className="btn btn-primary" to="/design">
// 				Design System
// 			</Link>
// 			<br />
// 			<Link className="btn btn-primary" to="/login">
// 				Login
// 			</Link>
// 			<br />
// 			<div>
// 				<GoogleLogin
// 					clientId="936851552513-7ul7bj59je2rjqecmj69tkpvubs7da7t.apps.googleusercontent.com"
// 					buttonText="Log in with Google"
// 					onSuccess={responseGoogle}
// 					onFailure={responseGoogle}
// 					cookiePolicy={"single_host_origin"}
// 				/>
// 			</div>

// 			<br />
// 			<div className="btn btn-primary" onClick={handlePay}>
// 				Testing Pay
// 			</div>

// 			Selamat Datang, 
// 		</div>
// 	);
// }

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			idUser: this.props.match.params.idUser,
			username: '',
			namaLengkap: '',
			email: '',
			noHP: '',
			idStaff: '',
			noPegawai: null,
			namaRole: JSON.parse(localStorage.getItem("user")).role,
			tarif: null,
			listMapel: [],
			idRole: '',

		}

	}


	componentDidMount() {
		PenggunaService.getAuthenticatedUser().then((res) => {
			let pengguna = res.data;
			console.log(pengguna);
			this.setState({
				idUser: pengguna.result.idUser,
				username: pengguna.result.username,
				namaLengkap: pengguna.result.namaLengkap,
				email: pengguna.result.email,
				noHP: pengguna.result.noHP,
				idStaff: pengguna.result.staff.idStaff,
				noPegawai: pengguna.result.staff.noPegawai,
				tarif: pengguna.result.staff.tarif,
				listMapel: pengguna.result.staff.listMapel,

			});
		});

		PenggunaService.getRolePengguna(this.state.idUser).then((res) => {
			let pengguna = res.data;
			this.setState({
				// namaRole: pengguna.result.namaRole,
				idRole: pengguna.result.idRole,

			});
		});



	}


	cancel() {
		this.props.history.push('/atur-mapel');
	}

	render() {
		return (
			<div className='outer'>
				<div className='tes'>
					<div className=''>
						<div className='row'>

							<div className='card-awal'>
								<div className='card-body'>

									<h2 className="page-title">Selamat Datang, </h2>
									<h4 className="page-title"> {this.state.namaLengkap} </h4>
									<div className="twobutton">
									</div>

									<div className='card-role'>
										<div className=''>

											<h6 className="page-title">Role Anda:</h6>
											<p className="page-title">{this.state.namaRole}</p>

										</div>
									</div>
									<hr />



									<div className='center'>
										Silakan pilih menu yang sesuai pada sidebar

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
