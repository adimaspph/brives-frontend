import React, { useState, useEffect } from "react";
import APIConfig from "../../api/APIConfig";
import ErrorNotification from "../Notification/ErrorNotification";
import NeutralNotification from "../Notification/NeutralNotification";
import Modal from "../../components/Modal/Modal";
import PilihJadwalPage from "../../pages/PilihJadwalPage/PilihJadwalPage";

export default function Schedule({ date, hari, username }) {
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
		APIConfig.get("/jadwal/hari/" + username, {
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

	const dateConvert = (tanggal) => {
		const date = new Date(tanggal);
		const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"Mei",
			"Jun",
			"Jul",
			"Agt",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		
		let result = namaHari[date.getDay()] + ", " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
		// console.log(result);
		return result;
	};

	const getDesc = () => {
		// console.log(selectedJadwal);
		if (selectedJadwal != null) {
			return (
				<div>
					<label>Mata Pelajaran :</label>
					<p>{selectedJadwal.jadwal.mapel.namaMapel}</p>
					<label>Jenis Kelas :</label>
					<p>{selectedJadwal.jadwal.jenisKelas}</p>
					<label>Tanggal :</label>
					<p>{dateConvert(selectedJadwal.jadwal.tanggal)}</p>
					<label>Waktu :</label>
					<p>
						{selectedJadwal.jadwal.waktuMulai} -{" "}
						{selectedJadwal.jadwal.waktuSelesai} WIB
					</p>
					
					{selectedJadwal.jadwal.jenisKelas === "PRIVATE" ?
						<div>
							<label>Status :</label>
							<p>{selectedJadwal.statusPesanan}</p>

							<label>Materi :</label>
							<p>
								{selectedJadwal.materi === null ? (
									"Belum terserdia"
								) : (
									<span>{selectedJadwal.materi}</span>
								)}
							</p>
						</div>
					: ""
					}
					

					<label>Link Meeting :</label>
					<p>
						{selectedJadwal.jadwal.linkZoom === null ? (
							"Belum terserdia"
						) : (
							<a
								className="link"
								href={selectedJadwal.jadwal.linkZoom}
								target="_blank"
							>
								{selectedJadwal.jadwal.linkZoom}
							</a>
						)}
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
					<b>Mata Pelajaran : </b>
					{jadwal.mapel.namaMapel}
				</p>
				<p>
					<b>Jenis Kelas : </b>
					{jadwal.jenisKelas}
				</p>
				<p>
					<b>Tanggal : </b>
					{dateConvert(jadwal.tanggal)}
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
				{getDesc()}
				<div className="modalButtonContainer">
					<div
						className="button button-outline"
						onClick={() => setModalView(false)}
					>
						Kembali
					</div>

					{selectedJadwal != null &&
					selectedJadwal.statusPesanan === "Terpesan" ? (
						""
					) : (
						<div
							className="button button-primary"
							onClick={() => {
								setModal(true);
								setJadwal(selectedJadwal.jadwal);
								setModalView(false);
							}}
						>
							Hapus
						</div>
					)}
				</div>
			</Modal>

			{listJadwal.map((jadwal, key) => (
				<div
					key={key}
					className={
						jadwal.jadwal.jenisKelas === "PRIVATE"
							? jadwal.statusPesanan === "Terpesan"
								? "schedule schedule-booked"
								: "schedule"
							: "schedule schedule-tambahan"
					}
					style={{
						gridRowStart: timeToRow(jadwal.jadwal.waktuMulai),
						gridRowEnd: timeToRow(jadwal.jadwal.waktuSelesai),
						gridColumnStart: hari + 1,
					}}
				>
					<div>
						<div>
							<b>{jadwal.jadwal.mapel.namaMapel}</b>
						</div>
						<br />
						<span>{`${jadwal.jadwal.waktuMulai} - ${jadwal.jadwal.waktuSelesai}`}</span>
					</div>

					<div
						className="button button-s button-green"
						onClick={() => {
							setModalView(true);
							setSelectedJadwal(jadwal);
						}}
					>
						Detail
					</div>
					{/* <div
						className="button button-s button-primary"
						onClick={() => {
							setModal(true);
							setJadwal(jadwal.jadwal);
						}}
					>
						Hapus
					</div> */}
				</div>
			))}
		</React.Fragment>
	);
}
