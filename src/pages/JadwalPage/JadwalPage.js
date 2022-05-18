import React, { useState, useEffect} from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
	Link,
} from "react-router-dom";
import Modal from "../../components/Modal/Modal";
// import Form from "react-bootstrap/Form";
import Scheduler from "../../components/Scheduler/Scheduler";
// import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./JadwalPage.css";
import APIConfig from "../../api/APIConfig";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from "../../components/Notification/NeutralNotification";

function JadwalPage() {
	const [modal, setModal] = useState(false);
	const [listJam, setListJam] = useState([
		4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	]);
	const [listMapel, setListMapel] = useState([]);
	const [mapel, setMapel] = useState();
	const [tanggal, setTanggal] = useState();
	const [jam, setJam] = useState(4);
	const [menit, setMenit] = useState(0);

	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [hasSubmit, setHasSubmit] = useState(false);
	const [hasSchedule, setHasSchedule] = useState(true);
	const [username, setUsername] = useState(useParams().username);
	const [roleAuth, setRoleAuth] = useState(JSON.parse(localStorage.getItem("user")).role);

	function padLeadingZeros(num, size) {
		var s = num + "";
		while (s.length < size) s = "0" + s;
		return s;
	}

	const getMapel = () => {
		// const result = []
		APIConfig.get("/mapel/")
			.then((response) => {
				// result = response.data.result;
				setListMapel(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
		// return result;
	};

	useEffect(() => {
		getMapel();
	}, []);

	const handleTambahJadwal = (event) => {
		event.preventDefault();
		setModal(true);
	};

	const handleCancel = (event) => {
		event.preventDefault();
		setModal(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const body = {
			username : username,
			tahun: Number(tanggal.slice(0, 4)),
			bulan: Number(tanggal.slice(5, 7)),
			tanggal: Number(tanggal.slice(8, 10)),
			jam: Number(jam),
			menit: Number(menit),
			mapel: mapel,
			jenisKelas: "PRIVATE",
		};
		console.log(body);
		setHasSubmit(false);
		setHasError(false);
		APIConfig.post("/jadwal", body)
			.then((response) => {
				setHasSubmit(true);
				setModal(false);
				// window.location = "atur-jadwal";
				// navigation.push("atur-jadwal");
				setHasSchedule(false);
				setHasSchedule(true);
				console.log(response.data);
			})
			.catch((error) => {
				setErrorMessage(error.response.data.message);
				setHasError(true);
				console.log(error.response);
				setModal(false)
			});
	};

	return (
		<div className="jadwal-container">
			{/* {hasError ? <ErrorNotification text={errorMessage} /> : ""} */}
			{hasError ? <ErrorNotification text="Jadwal gagal dibuat" /> : ""}
			{hasSubmit ? (
				<NeutralNotification text="Jadwal berhasil dibuat" />
			) : (
				""
			)}

			{roleAuth === "STAF_OPERASIONAL" ? (
				<ul class="breadcrumb">
					<li>
						<a href="/jadwal-pengajar">Pilih Pengajar</a>
					</li>
					<li className="bractive">Atur Jadwal</li>
				</ul>
			) : (
				""
			)}

			<h1 className="text-center">Atur Jadwal</h1>

			<Modal
				show={modal}
				handleCloseModal={handleCancel}
				modalTitle="Tambah Jadwal"
			>
				<form onSubmit={handleSubmit}>
					<label>Mata Pelajaran</label>
					<select onChange={(e) => setMapel(e.target.value)} required>
						<option value={""}>-- Select Mata Pelajaran --</option>
						{listMapel.map((mapel, key) => (
							<option key={key} value={mapel.idMapel}>
								{mapel.namaMapel}
							</option>
						))}
					</select>
					<br />
					<br />

					<label>Tanggal</label>
					<input
						type="date"
						onChange={(e) => setTanggal(e.target.value)}
						required
					></input>
					<br />
					<br />

					<label>Waktu Mulai</label>
					<div className="waktu">
						<select
							required
							className="waktu-mulai"
							onChange={(e) => setJam(e.target.value)}
						>
							<option value={""}>jam</option>
							{listJam.map((item, key) => (
								<option key={key} value={item}>
									{padLeadingZeros(item, 2)}
								</option>
							))}
						</select>
						<label> : </label>
						<select
							className="waktu-end"
							onChange={(e) => setMenit(e.target.value)}
							required
						>
							<option value={""}>menit</option>
							<option value={0}>00</option>
							<option value={15}>15</option>
							<option value={30}>30</option>
							<option value={45}>45</option>
						</select>
					</div>

					<div className="modalButtonContainer">
						<div
							className="button button-outline"
							onClick={handleCancel}
						>
							Close
						</div>
						<button type="submit" className="button button-primary">
							Simpan
						</button>
					</div>
				</form>
			</Modal>

			<p className="text-center">
				Username : <b>{username} </b>
			</p>

			<div className="d-flex center m-4">
				<a className="button button-blue" onClick={handleTambahJadwal}>
					+ Tambah Jadwal
				</a>
			</div>

			<br />
			{hasSchedule ? <Scheduler username={username} /> : ""}
		</div>
	);
}

export default JadwalPage;
