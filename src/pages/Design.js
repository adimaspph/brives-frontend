import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import NeutralNotification from "../components/Notification/NeutralNotification";

function Design() {
	const [nama, setNama] = useState(["adimas", "kari", "salman"]);

	const ubahNama = () => {
		setNama(nama.filter(word => word.length > 4));
	}

	return (
		<div>
			<h2 onClick={ubahNama}>BRIVES</h2>

			<container>
				<a
					className="btn btn-xl btn-primary"
					
					href="/"
				>
					XLarge Button {nama}
				</a>
				<br />
				<a className="btn btn-l btn-primary" href="/">
					Large Button
				</a>
				<br />
				<a className="btn btn-primary" href="/">
					Medium Button
				</a>
				<Button className="btn btn-primary" href="/" disabled>
					Primary
				</Button>
				<br />
				<a className="btn btn-s btn-primary" href="/">
					Small Button
				</a>
				<br />
				<button className="btn btn-primary" disabled>
					Disabled Button
				</button>
				<br />
			</container>
			<div>
				<a className="btn btn-outline btn-xl" href="/">
					XL Button Outline
				</a>
				<br />
				<a className="btn btn-outline btn-l" href="/">
					L Button Outline
				</a>
				<br />
				<a className="btn btn-outline" href="/">
					M Button Outline
				</a>
				<br />
				<a className="btn btn-outline btn-s" href="/">
					S Button Outline
				</a>
				<br />
			</div>
			<div>
				<a className="btn btn-green" href="/">
					Green Button
				</a>
				<br />
				<a className="btn btn-blue" href="/">
					Blue Button
				</a>
				<br />
				<a className="btn btn-yellow" href="/">
					Yellow Button
				</a>
			</div>

			<h1>Heading 1</h1>
			<h2>Heading 2</h2>
			<h3>Heading 3</h3>
			<h4>Heading 4</h4>
			<h5>Heading 5</h5>
			<h6>Heading 6</h6>

			<p>Body 1</p>
			<p>
				<b>Body Bold</b>
			</p>
			<p>
				<i>Body italic</i>
			</p>

			<NeutralNotification text="Ini adalah notifikasi singkat" />
			{/* <NeutralNotification text="Lorem ipsfaskdjfhask akdsfh askdjfh skdfh aksj akjf a ldjakdjf akdjsfh aldskfjh asdkjfha lsdkjfh asdkj daf asd t" /> */}
		</div>
	);
}

export default Design;
