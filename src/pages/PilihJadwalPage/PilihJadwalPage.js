import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams,
} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./PilihJadwalPage.css";
import APIConfig from "../../api/APIConfig";

export default function PilihJadwalPage() {
    // const [idMapel, setIdMapel] = useState(useParams());
    const { id } = useParams();
	return (
		<div>
			<Navbar />
			<h1 className="title text-center">Pilih Jadwal</h1>

			<h5>{id}</h5>
		</div>
	);
}
