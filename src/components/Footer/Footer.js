
import React, { Component, useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import "./Footer2.css"

export default function Footer(props) {

	const [roleUser, setRoleUser] = useState("")

	useEffect(async () => {
		// checkUserRole()
	}, [])

	const checkUserRole = () => {
		const userRaw = localStorage.getItem("user")
		if (userRaw) {
			const user = JSON.parse(userRaw)
			setRoleUser(user.role)
			if (user.role === 'STAF_OPERASIONAL') {

			} else {
				props.history.push('/403');
			}
		} else {
			props.history.push('/login');
		}
	}

	const handlerLogout = () => {
		localStorage.removeItem("user");
	};


	return (
		<footer class="footer footer-bottom d-flex justify-content-center">
			<div className="col-lg-10 row d-flex justify-content-center ">
				<div className="section-footer">
					<Link className="footer-logo" to="/">
						<img src="/logo-navbar.png" width={60} alt="" />
					</Link>
				</div>
				<div className="section-footer">
					<p className='nama-cabang'>BTA 8 Jakarta</p>
					<p className='nomor-cabang'>(021) 8290115</p>
				</div>

				<div className="section-footer">
					<p className='nama-cabang'>BTA 45</p>
					<p className='nomor-cabang'>(021) 8309364</p>
				</div>

				<div className="section-footer">
					<p className='nama-cabang'>BTA 8 Program SMP</p>
					<p className='nomor-cabang'>(021) 83702512</p>
				</div>

				<div className="section-footer">
					<p className='nama-cabang'>BTA 8 Duta</p>
					<p className='nomor-cabang'>(021) 8414613</p>
				</div>

				<div className="section-footer">
					<p className='nama-cabang'>BTA 8 Fatmawati</p>
					<p className='nomor-cabang'>(021) 27654521</p>
				</div>

				<div className="section-footer">
					<p className='nama-cabang'>BTA 8 Depok</p>
					<p className='nomor-cabang'>(021) 77826423</p>
				</div>
			</div>
		</footer>
	);
}

export const MemoizedFooter = React.memo(Footer);
