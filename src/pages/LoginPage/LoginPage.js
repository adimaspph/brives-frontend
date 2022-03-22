import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ButtonSubmit from "../../components/ButtonSubmit/ButtonSubmit";
import "./LoginPage.css";
import APIConfig from "../../api/APIConfig";
import { UserContext } from "../utils/UserContext";
import Axios from "axios";

function LoginPage() {
	const { role, jwt, setRole, setJwt } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// APIConfig.defaults.withCredentials = true;

	const handlerLogin = () => {
		console.log("melakukan login");
		APIConfig.post("/api/user/login", {
			username: username,
			password: password,
		}).then((response) => {
			// alert("test then");
			console.log(response);
			
			if (response.data.token) {
				// console.log("login berhasil");
				// alert("berhasil");
				localStorage.setItem("user", JSON.stringify({login:true, token: response.data.token, role : response.data.role[0].authority}));
				// localStorage.setItem("user", JSON.stringify({login:true, token: response.data.token, role : response.data.role[0].authority}));
				window.location = "/";
				setRole(response.data.role[0].authority);
				setJwt(response.data.token);
				
			} else {
				// console.log("gagal");
				// alert("gagal");
			}
		});
	};

	function myFunction() {
		window.location = "http://www.yoururl.com";
	  }

	return (
		<div className="jadwal-container">
			<Navbar></Navbar>
			<div className="container">
				<div className="row">
					<div className="page-title">
						<h1>Login</h1>
						<h2>{role}</h2>
					</div>
					<div className="login-card">
						<div className="error-message">
							<p></p>
						</div>
						<div className="login-form">
							<form action="">
								<div className="form-group">
									<label htmlFor="">
										Username<span className="star">*</span>{" "}
									</label>
									<input
										type="text"
										name="username"
										value={username}
										className="form-control"
										required
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="">
										Password<span className="star">*</span>{" "}
									</label>
									<input
										type="password"
										name="password"
										value={password}
										className="form-control"
										required
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
							</form>
							<div
								onClick={handlerLogin}
								className="btn btn-blue fsubmit"
							>
								Login
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
