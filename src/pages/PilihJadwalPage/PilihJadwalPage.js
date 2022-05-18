import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
    Link,
} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./PilihJadwalPage.css";
import APIConfig from "../../api/APIConfig";
import Modal from "../../components/Modal/Modal";
import NeutralNotification from "../../components/Notification/NeutralNotification";
import ErrorNotification from "../../components/Notification/ErrorNotification";

export default function PilihJadwalPage() {
	const [today, setToday] = useState(new Date());
    const [idMapel, setIdMapel] = useState(useParams().id);
    const [mapel, setMapel] = useState("");
	const [day1, setDay1] = useState(new Date(today.setDate(today.getDate() + 1)));
	const [day2, setDay2] = useState(new Date(today.setDate(today.getDate() + 1)));
	const [day3, setDay3] = useState(new Date(today.setDate(today.getDate() + 1)));
	const [day4, setDay4] = useState(new Date(today.setDate(today.getDate() + 1)));
	const [day5, setDay5] = useState(new Date(today.setDate(today.getDate() + 1)));
	const [day6, setDay6] = useState(new Date(today.setDate(today.getDate() + 1)));
	const [day7, setDay7] = useState(new Date(today.setDate(today.getDate() + 1)));
	const [listHari, setlistHari] = useState([]);
	const [selectedHari, setSelectedHari] = useState(day1);
	const [listJadwal, setListJadwal] = useState([]);
	const [modal, setModal] = useState(false);
	const [selectedJadwal, setSelectedJadwal] = useState(null);
	const [materi, setMateri] = useState("");
	const [successNotif, setSuccessNotif] = useState(false);
	const [hasError, setHasError] = useState(false);
	
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

	const getJadwal = (tanggal) => {
		const parameter = {
			tanggal: tanggal.getDate(),
			bulan: tanggal.getMonth() + 1,
			tahun: tanggal.getFullYear(),
			idMapel: idMapel,
		};
		// console.log(parameter);
		APIConfig.get("/jadwal/mapel/", {
			params: parameter,
		})
			.then((response) => {
				// console.log(response.data.result);
				setListJadwal(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSelectHari = (tanggal) => {
		// console.log(tanggal.toString());
		setSelectedHari(tanggal);
		// console.log(selectedHari);
		getJadwal(tanggal);
	};

	const setHari = () => {
		const temp = [day1, day2, day3, day4, day5, day6, day7]
		setlistHari(temp);
	};

	const dateConvert = (tanggal) => {
		const date = new Date(tanggal);
		let result = namaHari[date.getDay()] + ", " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
		// console.log(result);
		return result;
	};

	const curConvert = (tarif) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(tarif);
	};

    const getMapel = (idMapel) => {
		APIConfig.get("/mapel/" + idMapel)
			.then((response) => {
				setMapel(response.data.result);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

    useEffect(() => {
		getMapel(idMapel);
		setHari();
		getJadwal(day1);
		setToday(new Date());
	}, []);

	const handlePilih = (event, key) => {
		if (localStorage.getItem("user") != null &&
			JSON.parse(localStorage.getItem("user")).role === "PELAJAR") {
			setSelectedJadwal(key)
			event.preventDefault();
			setModal(true);
		} else {
			window.location = "/login";
		}
	};

	const handleCancel = (event) => {
		event.preventDefault();
		setModal(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const min = 1;
		const max = 100;
		const rand = min + Math.random() * (max - min);
		const body = {
			materi: materi,
			nominal: listJadwal[selectedJadwal].tarif + rand,
			idJadwal: listJadwal[selectedJadwal].jadwal.idJadwal,
		};
		setHasError(false);
		setSuccessNotif(false);
		APIConfig.post("/pesanan", body)
			.then((response) => {
				// console.log(response.data.result);
				setModal(false);
				setSuccessNotif(true);
				const timer = setTimeout(() => {
					window.location = "/riwayat-pesanan";
				}, 1000);
				
			})
			.catch((error) => {
				console.log(error.response);
				setHasError(true);
			});
		setModal(false);
	};

	const getDesc = () => {
		if (selectedJadwal != null) {
			// console.log(selectedJadwal);
			return (
				<div>
					<label>Mata Pelajaran :</label>
					<p>{listJadwal[selectedJadwal].jadwal.mapel.namaMapel}</p>
					<label>Pengajar :</label>
					<p>{listJadwal[selectedJadwal].nama}</p>
					<label>Harga :</label>
					<p>{curConvert(listJadwal[selectedJadwal].tarif)}</p>
					<label>Tanggal :</label>
					<p>
						{dateConvert(listJadwal[selectedJadwal].jadwal.tanggal)}
					</p>
					<label>Waktu :</label>
					<p>{listJadwal[selectedJadwal].jadwal.waktuMulai} - {listJadwal[selectedJadwal].jadwal.waktuSelesai} WIB</p>
				</div>
			);
		} 
	};

	const nextWeek = () => {
		setDay1(new Date(day1.setDate(day1.getDate() + 7)));
		setDay2(new Date(day2.setDate(day2.getDate() + 7)));
		setDay3(new Date(day3.setDate(day3.getDate() + 7)));
		setDay4(new Date(day4.setDate(day4.getDate() + 7)));
		setDay5(new Date(day5.setDate(day5.getDate() + 7)));
		setDay6(new Date(day6.setDate(day6.getDate() + 7)));
		setDay7(new Date(day7.setDate(day7.getDate() + 7)));
		setHari();
		setSelectedHari(day1);
		getJadwal(day1);
		setToday(new Date());
	};

	const prevWeek = () => {
		setDay1(new Date(day1.setDate(day1.getDate() - 7)));
		setDay2(new Date(day2.setDate(day2.getDate() - 7)));
		setDay3(new Date(day3.setDate(day3.getDate() - 7)));
		setDay4(new Date(day4.setDate(day4.getDate() - 7)));
		setDay5(new Date(day5.setDate(day5.getDate() - 7)));
		setDay6(new Date(day6.setDate(day6.getDate() - 7)));
		setDay7(new Date(day7.setDate(day7.getDate() - 7)));
		setHari();
		setSelectedHari(day1);
		getJadwal(day1);
		setToday(new Date());
	};

	const compareDate = () => {
		let tomorrow = new Date();
		tomorrow.setDate(new Date().getDate() + 1);
		return tomorrow.toISOString().split("T")[0];
	}

	return (
		<div>
			<Navbar />
			
			{hasError ? <ErrorNotification text="Kelas gagal dipesan" /> : ""}
			{successNotif ? (
				<NeutralNotification text="Kelas berhasil dipesan" />
			) : (
				""
			)}
			<h1 className="title text-center">Pilih Jadwal</h1>

			<div className="center ubah-mapel-container">
				<span>{mapel.namaMapel}</span>
				<Link className="button button-outline" to="/pesan-kelas">
					Ubah Mapel
				</Link>
			</div>
			<div className="pilih-hari-container center">
				<div className={compareDate() === day1.toISOString().split('T')[0] ? "hidden" : "button"} onClick={prevWeek}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.67 3.86961L9.9 2.09961L0 11.9996L9.9 21.8996L11.67 20.1296L3.54 11.9996L11.67 3.86961Z"
							fill="#404040"
						/>
					</svg>
				</div>

				<div className="container-hari">
					{listHari.map((hari, key) => (
						<div
							key={key}
							// className="button-hari hari-selected"
							className={
								selectedHari.getDate() === hari.getDate()
									? "button-hari hari-selected"
									: "button-hari"
							}
							onClick={() => handleSelectHari(hari)}
						>
							<span>{namaHari[hari.getDay()]}</span>
							<span>
								<b>
									{hari.getDate() +
										" " +
										monthNames[hari.getMonth()]}
								</b>
							</span>
						</div>
					))}
				</div>

				<div className="button" >
					<svg
						onClick={nextWeek}
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.33 20.1304L14.1 21.9004L24 12.0004L14.1 2.10039L12.33 3.87039L20.46 12.0004L12.33 20.1304Z"
							fill="#404040"
						/>
					</svg>
				</div>
			</div>

			<div className="jadwal-tersedia">
				{/* {listJadwal.} */}
				{listJadwal.map((jadwal, key) => (
					<div
						className="jadwal-tersedia-container"
						key={key}
						onClick={(e) => handlePilih(e, key)}
					>
						<div className="jadwal-tersedia-item">
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24XFw4cHA5l7ego7xF2V5fIaUfLajZgZKSA&usqp=CAU"
								width={50}
								height={50}
							/>
							<div className="jadwal-tersedia-item-left">
								<label>{jadwal.nama}</label>
								<span>{curConvert(jadwal.tarif)}</span>
							</div>
						</div>
						<div className="jadwal-tersedia-item">
							<div className="jadwal-tersedia-item-right">
								<label>
									{jadwal.jadwal.waktuMulai} -{" "}
									{jadwal.jadwal.waktuSelesai}
								</label>
								<span>
									{dateConvert(jadwal.jadwal.tanggal)}
								</span>
							</div>
							{/* <button className="button button-primary">
								Pesan
							</button> */}
						</div>
					</div>
				))}

				<Modal
					show={modal}
					handleCloseModal={handleCancel}
					modalTitle="Tambah Jadwal"
				>
					<form onSubmit={handleSubmit}>
						{getDesc()}
						<label>Materi yang ingin diajarkan :</label>
						<br />
						<textarea
							className="form-control"
							type="textarea"
							onChange={(e) => setMateri(e.target.value)}
							value={materi}
							required
						/>
						<div className="modalButtonContainer">
							<div
								className="button button-outline"
								onClick={handleCancel}
							>
								Close
							</div>
							<button
								type="submit"
								className="button button-primary"
							>
								Pesan
							</button>
						</div>
					</form>
				</Modal>
			</div>
		</div>
	);
}
