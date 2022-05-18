import React, { useState, useEffect } from "react";
import APIConfig from "../../api/APIConfig";
import "./PilihPengajarPage.css";


export default function PilihPengajarPage() {
    const [listPengajar, setListPengajar] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    // const [username, setUsername] = useState(useParams().username);


    const getPengajar = () => {
		APIConfig.get("/role/2")
			.then((response) => {
				// console.log(response.data.result.listUser);
				setListPengajar(response.data.result.listUser);
			})
			.catch((error) => {
				console.log(error);
			});
        // console.log(listPengajar);
	};

    const handleToJadwal = (e, username) => {
        console.log(username);
		window.location = "jadwal-pengajar/"+username;
	};

    useEffect(() => {
		getPengajar();
        // console.log(username);
	}, []);

	return (
		<div className="jadwal-container">
			<h1 className="text-center">Pilih Pengajar</h1>

			<div className="searchBar searchbox">
				<input
					type="text"
					placeholder="Filter nama"
					id="myInput"
					value={searchKey}
					onChange={(e) => setSearchKey(e.target.value)}
				/>
			</div>

			<div className="pengajar-container">
				{listPengajar
					.filter((pengajar) =>
						pengajar.namaLengkap
							.toLowerCase()
							.includes(searchKey.toLocaleLowerCase())
					)
					.map((filteredPengajar, key) => (
						<div
							className="jadwal-tersedia-container"
							key={key}
							onClick={(e) =>
								handleToJadwal(e, filteredPengajar.username)
							}
						>
							<div className="jadwal-tersedia-item">
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24XFw4cHA5l7ego7xF2V5fIaUfLajZgZKSA&usqp=CAU"
									width={50}
									height={50}
								/>
								<div className="jadwal-tersedia-item-left">
									<label>{filteredPengajar.namaLengkap}</label>
                                    <span>{filteredPengajar.username}</span>
								</div>
							</div>
							<div className="list-mapel-container">
								{filteredPengajar.staff.listMapel.map(
									(mapel, key) => (
										<span
											className="mapelPengajar"
											key={key}
										>
											{mapel.namaMapel}
										</span>
									)
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
