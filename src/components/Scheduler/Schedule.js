import React, { useState, useEffect } from "react";
import APIConfig from "../../api/APIConfig";
import ErrorNotification from "../Notification/ErrorNotification";
import NeutralNotification from "../Notification/NeutralNotification";
import Modal from "../../components/Modal/Modal";

export default function Schedule({ date, hari }) {
	const [modal, setModal] = useState(false);
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
				setListJadwal(response.data.result);
			})
			.catch((error) => {
				console.log("error data");
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
				console.log("berhasil delete");
				setDeletedNotif(true);
			})
			.catch((error) => {
				setErrorMessage(error.response.data.message);
				console.log("error delete");
				console.log(error);
			});
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
				<p><b>Mapel : </b>{jadwal.mapel.namaMapel}</p>
				<p><b>Tanggal : </b>{jadwal.tanggal}</p>
				<p><b>Waktu : </b>{jadwal.waktuMulai} - {jadwal.waktuSelesai}</p>

				<div className="modalButtonContainer">
					<div className="btn btn-outline" onClick={handleCancel}>
						Kembali
					</div>

					<div
						className="btn btn-primary"
						onClick={handleDelete(jadwal.idJadwal)}
					>
						Hapus
					</div>
				</div>
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
							<br />
						</div>
						<br />
						<span>{`${jadwal.waktuMulai} - ${jadwal.waktuSelesai}`}</span>
					</div>

					<div
						className="btn btn-s btn-green"
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
