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
		console.log(parameter);
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
	}, []);

	return (
		<div>
			<Navbar />
			<h1 className="title text-center">Pilih Jadwal</h1>

			<div className="center ubah-mapel-container">
				<span>{mapel.namaMapel}</span>
				<Link className="button button-outline" to="/pesan-kelas">
					Ubah Mapel
				</Link>
			</div>

			<div className="pilih-hari-container center">
				<div className="button">
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

				<div className="button">
					<svg
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
					<div className="jadwal-tersedia-container" key={key}>
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

				{/* <div className="jadwal-tersedia-container">
					<div className="jadwal-tersedia-item">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24XFw4cHA5l7ego7xF2V5fIaUfLajZgZKSA&usqp=CAU"
							width={50}
							height={50}
						/>
						<div className="jadwal-tersedia-item-left">
							<label>Nama Pengajar</label>
							<span>Rp 90.000</span>
						</div>
					</div>
					<div className="jadwal-tersedia-item">
						<div className="jadwal-tersedia-item-right">
							<label>15.30 - 17.00</label>
							<span>Senin, 23 Feb 2020</span>
						</div>
						<button className="button button-primary">Pesan</button>
					</div>
				</div> */}
			</div>
		</div>
	);
}
