import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./PesanKelasPage.css";
import APIConfig from "../../api/APIConfig";
import Footer from "../../components/Footer/Footer";

export default function PesanKelasPage() {
	const [listJenjang, setListJenjang] = useState([]);
	const [selectedJenjang, setSelectedJenjang] = useState("all");
	const [listMapel, setListMapel] = useState([]);
	
	const setJejang = (idJenjang) => {
		setSelectedJenjang(idJenjang);
		getMapel(idJenjang);
	};

	const getMapel = (idJenjang) => {
		if (idJenjang === "all") {
			APIConfig.get("/mapel/")
				.then((response) => {
					// console.log(response.data.result);
					setListMapel(response.data.result);
				})
				.catch((error) => {
					console.log(error.response);
				});
		} else {
			APIConfig.get("/mapel/jenjang/" + idJenjang)
			.then((response) => {
				// console.log(response.data.result);
				setListMapel(response.data.result);
			})
			.catch((error) => {
				console.log(error.response);
			});
		}
	};

	const getJenjang = () => {
		APIConfig.get("/jenjang/")
			.then((response) => {
				// console.log(response.data.result);
				setListJenjang(response.data.result);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	const handlePilih = (idMapel) => {
		console.log(idMapel);
	};

	useEffect(() => {
		getJenjang();
		setJejang("all");
	}, []);


	return (
		<div>
			<Navbar />

			<h1 className="text-center title">Pilih Mata Pelajaran</h1>

			<div className="jenjang-select">
				<span
					className={
						selectedJenjang === "all"
							? "jenjang-btn jenjang-selected"
							: "jenjang-btn"
					}
					onClick={() => setJejang("all")}
				>
					Semua
				</span>
				{listJenjang.map((jenjang, key) => (
					<span
						key={key}
						className={
							selectedJenjang === jenjang.idJenjang
								? "jenjang-btn jenjang-selected"
								: "jenjang-btn"
						}
						onClick={() => setJejang(jenjang.idJenjang)}
					>
						{jenjang.namaJenjang}
					</span>
				))}
			</div>

			<div className="container-mapel">
				{listMapel.map((mapel, key) => (
					<div className="mapel-card" key={key}>
						<span className="title-mapel">{mapel.namaMapel}</span>

						<div className="jenjang-mapel">
							{mapel.listJenjang.map((jenjang, key) => (
								<span key={key}>{jenjang.namaJenjang}</span>
							))}
						</div>
						<Link
							className="button button-primary btn-mapel"
							onClick={() => handlePilih(mapel.idMapel)}
							to={`/pesan-kelas/` + mapel.idMapel}
						>
							Pilih
						</Link>
					</div>
				))}
				{/* <div className="mapel-card">
					<span className="title-mapel">Nama Mapel</span>
					<div className="jenjang-mapel">
						<span>Kelas 10</span>
						<span>Kelas 11</span>
						<span>Kelas 12</span>
					</div>
					<a className="btn btn-primary btn-mapel">Pilih</a>
				</div> */}
			</div>
			{/* <Footer/> */}
		</div>
	);
}
