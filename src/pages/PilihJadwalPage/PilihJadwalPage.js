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
    const [idMapel, setIdMapel] = useState(useParams().id);
    const [mapel, setMapel] = useState("");

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
	}, []);

	return (
		<div>
			<Navbar />
			<h1 className="title text-center">Pilih Jadwal</h1>

			<div className="center ubah-mapel-container">
				<span className="">{mapel.namaMapel}</span>
				<Link className="button button-primary" to="/pesan-kelas">
					Ubah Mapel
				</Link>
			</div>

			<div className="pesan-pilih-hari center">
				<svg
					// onClick={backWeek}
					width="24"
					height="24"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M12.5357 13.4L12.5357 2.59998L3.46484 7.99997L12.5357 13.4Z"
						fill="#505154"
					/>
				</svg>

				<svg
					// onClick={nextWeek}
					width="24"
					height="24"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M3.46484 2.59998L3.46484 13.4L12.5357 7.99998L3.46484 2.59998Z"
						fill="#505154"
					/>
				</svg>
			</div>
		</div>
	);
}
