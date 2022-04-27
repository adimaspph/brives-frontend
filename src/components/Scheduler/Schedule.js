import React, { useState, useEffect } from "react";
import APIConfig from "../../api/APIConfig";
import ErrorNotification from "../Notification/ErrorNotification";
import NeutralNotification from "../Notification/NeutralNotification";
import Modal from "../../components/Modal/Modal";

export default function Schedule({ date, hari }) {
	const [modal, setModal] = useState(false);
	const [modalView, setModalView] = useState(false);
	const [selectedJadwal, setSelectedJadwal] = useState();
	const [linkZoom, setLinkZoom] = useState("");
	const [jadwal, setJadwal] = useState({
		idJadwal: null,
		waktuMulai: null,
		waktuSelesai: null,
		tanggal: null,
		linkZoom: null,
		jenisKelas: null,
		mapel: {
			idMapel: 1,
			namaMapel: null,
			deskripsi: null,
			listJenjang: [
				{
					idJenjang: null,
					namaJenjang: null,
				},
			],
		},
	});
	const [listJadwal, setListJadwal] = useState([]);
	const [deletedNotif, setDeletedNotif] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const parameter = {
			tanggal: date.getDate(),
			bulan: date.getMonth() + 1,
			tahun: date.getFullYear(),
		};
		APIConfig.get("/jadwal", {
			params: parameter,
		})
			.then((response) => {
				// console.log(response.data);
				setListJadwal(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [date, deletedNotif]);

	const timeToRow = (waktu) => {
		let result = 0;
		let jam = Number(waktu.slice(0, 2));
		let menit = Number(waktu.slice(3));
		jam = (jam - 4) * 4;

		result = result + jam + 2;
		result = result + menit / 15;

		return result;
	};

	const handleCancel = (event) => {
		event.preventDefault();
		setModal(false);
	};

	const handleDelete = (id) => () => {
		setDeletedNotif(false);
		setModal(false);
		APIConfig.delete("/jadwal/" + id)
			.then((response) => {
				setDeletedNotif(true);
			})
			.catch((error) => {
				setErrorMessage(error.response.data.message);
				console.log(error);
			});
	};

	const addLink = (event) => {
		event.preventDefault();
		let jadwal = { linkZoom: linkZoom };
		console.log(selectedJadwal.idJadwal);
		APIConfig.put("/jadwal/addLink/" + selectedJadwal.idJadwal, jadwal)
			.then((response) => {
				console.log(response.data.result);
				setModalView(false);
				window.location = "/atur-jadwal";
			})
			.catch((error) => {
				console.log(error.response);
			});
		
	};

	const dateConvert = (tanggal) => {
		const date = new Date(tanggal);
		const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
		const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
		
		let result = namaHari[date.getDay()] + ", " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
		// console.log(result);
		return result;
	};

	const getDesc = () => {
		if (selectedJadwal != null) {
			return (
				<div>
					<label>Mata Pelajaran :</label>
					<p>{selectedJadwal.mapel.namaMapel}</p>
					<label>Jenis Kelas :</label>
					<p>{selectedJadwal.jenisKelas}</p>
					<label>Tanggal :</label>
					<p>{dateConvert(selectedJadwal.tanggal)}</p>
					<label>Waktu :</label>
					<p>
						{selectedJadwal.waktuMulai} -{" "}
						{selectedJadwal.waktuSelesai} WIB
					</p>
				</div>
			);
		}
	};


	return (
		<React.Fragment>
			{/* {hasError ? <ErrorNotification text={errorMessage} /> : ""} */}
			{hasError ? <ErrorNotification text="Jadwal gagal dihapus" /> : ""}
			{deletedNotif ? (
				<NeutralNotification text="Jadwal berhasil dihapus" />
			) : (
				""
			)}
			<Modal
				show={modal}
				handleCloseModal={handleCancel}
				modalTitle="Konfirmasi"
			>
				<p>Apakah Anda yakin akan menghapus jadwal berikut</p>
				<p>
					<b>Mapel : </b>
					{jadwal.mapel.namaMapel}
				</p>
				<p>
					<b>Tanggal : </b>
					{jadwal.tanggal}
				</p>
				<p>
					<b>Waktu : </b>
					{jadwal.waktuMulai} - {jadwal.waktuSelesai}
				</p>

				<div className="modalButtonContainer">
					<div
						className="button button-outline"
						onClick={handleCancel}
					>
						Kembali
					</div>

					<div
						className="button button-primary"
						onClick={handleDelete(jadwal.idJadwal)}
					>
						Hapus
					</div>
				</div>
			</Modal>
			<Modal show={modalView} modalTitle="Detail Jadwal">
				<form action="" onSubmit={addLink}>
					{getDesc()}
					<div className="form-group">
						<label> Link Zoom </label>
						<input
							type="text"
							className="form-control"
							value={linkZoom}
							onChange={(e) => setLinkZoom(e.target.value)}
							required
						/>
					</div>

					<div className="modalButtonContainer">
						<div
							className="button button-outline"
							onClick={() => setModalView(false)}
						>
							Kembali
						</div>
						<button type="submit" className="button button-primary">
							Simpan
						</button>
					</div>
				</form>
			</Modal>

			{listJadwal.map((jadwal, key) => (
				<div
					key={key}
					className="schedule"
					style={{
						gridRowStart: timeToRow(jadwal.waktuMulai),
						gridRowEnd: timeToRow(jadwal.waktuSelesai),
						gridColumnStart: hari + 1,
					}}
				>
					<div>
						<div>
							<b>{jadwal.mapel.namaMapel}</b>
						</div>
						<br />
						<span>{`${jadwal.waktuMulai} - ${jadwal.waktuSelesai}`}</span>
					</div>

					<div
						className="button button-s button-green"
						onClick={() => {
							setModalView(true);
							setSelectedJadwal(jadwal);
							setLinkZoom(jadwal.linkZoom)
						}}
					>
						Detail
					</div>
					<div
						className="button button-s button-primary"
						onClick={() => {
							setModal(true);
							setJadwal(jadwal);
						}}
					>
						Delete
					</div>
				</div>
			))}
		</React.Fragment>
	);
}
