import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { UserContext } from "./utils/UserContext";


function Home() {
	const { role, jwt, setRole, setJwt } = useContext(UserContext);

	const handleFailure = (result) => {
		// alert(result);
	};

	const handleLogin = (googleData) => {
		console.log(googleData);
	};

	const responseGoogle = (response) => {
		console.log(response);
	};

	const handlePay = () => {
		console.log("Pay Pay");
		const token = "cc5b1f50-32a0-4156-8ba0-066922541bc9";
		window.snap.pay(token);
	};

	useEffect(() => {
		//change this to the script source you want to load, for example this is snap.js sandbox env

		

		const midtransScriptUrl =
			"https://app.sandbox.midtrans.com/snap/snap.js";
		//change this according to your client-key
		const myMidtransClientKey = "SB-Mid-client-RoG71GkViRrFWrrQ";

		let scriptTag = document.createElement("script");
		scriptTag.src = midtransScriptUrl;
		// optional if you want to set script attribute
		// for example snap.js have data-client-key attribute
		scriptTag.setAttribute("data-client-key", myMidtransClientKey);

		document.body.appendChild(scriptTag);
		return () => {
			document.body.removeChild(scriptTag);
		};
	}, []);

	return (
		<div>
			<h1>{role}</h1>
			<h1>Ini home page</h1>
			<Link className="btn btn-primary" to="/design">
				Design System
			</Link>
			<br />
			<Link className="btn btn-primary" to="/login">
				Login
			</Link>
			<br />
			<div>
				<GoogleLogin
					clientId="936851552513-7ul7bj59je2rjqecmj69tkpvubs7da7t.apps.googleusercontent.com"
					buttonText="Log in with Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={"single_host_origin"}
				/>
			</div>

			<br />
			<div className="btn btn-primary" onClick={handlePay}>
				Testing Pay
			</div>
		</div>
	);
}

export default Home;
