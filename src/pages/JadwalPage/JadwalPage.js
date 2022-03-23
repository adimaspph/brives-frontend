import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import Form from "react-bootstrap/Form";
import Scheduler from "../../components/Scheduler/Scheduler";
// import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./JadwalPage.css";

function JadwalPage() {
	const [modal, setModal] = useState(false);
	const [mapel, setMapel] = useState("");
	const [tanggal, setTanggal] = useState("");
	const [jam, setJam] = useState("");
	const [menit, setMenit] = useState("");

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
	};

	return (
		<div className="jadwal-container">
			<script src="https://unpkg.com/flowbite@1.3.4/dist/datepicker.js"></script>

			<h1>Atur Jadwal</h1>

			<Modal
				show={modal}
				handleCloseModal={handleCancel}
				modalTitle="Tambah Jadwal"
			>
				<form onSubmit={handleSubmit}>
					<label>Mata Pelajaran</label>
					<select>
						<option value="Matematika">Matematika</option>
						<option value="Biologi">Biologi</option>
					</select>
					<br />
					<br />

					<label>Tanggal</label>
					<input type="date" required></input>
					<br />
					<br />

					<label>Waktu Mulai</label>
					<div className="waktu">
						<select className="waktu-mulai">
							<option value="4">04</option>
							<option value="5">05</option>
						</select>
						<label> - </label>
						<select className="waktu-end" onChange={(e) => setMenit(e.target.value)}>
							<option value="0">00</option>
							<option value="15">15</option>
							<option value="30">30</option>
							<option value="45">45</option>
						</select>
					</div>

					<div className="modalButtonContainer">
						<div className="btn btn-outline" onClick={handleCancel}>
							Close
						</div>
						<button type="submit" className="btn btn-primary">
							Simpan
						</button>
					</div>
				</form>
			</Modal>

			<div className="btn btn-primary" onClick={handleTambahJadwal}>
				Tambah Jadwal
			</div>
			<Scheduler></Scheduler>
		</div>
	);
}

export default JadwalPage;
