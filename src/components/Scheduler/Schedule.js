import React, { useState, useEffect } from "react";
import APIConfig from "../../api/APIConfig";

export default function Schedule({ date, hari }) {
	const [listJadwal, setListJadwal] = useState([]);
    const [deletedNotif, setDeletedNotif] = useState(false);
    const [deleteFailNotif, setdeleteFailNotif] = useState(false);

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

    const handleDelete = id => () => {
        setDeletedNotif(false);
		APIConfig.delete(("/jadwal/" + id))
			.then((response) => {
				console.log("berhasil delete");
                setDeletedNotif(true);
			})
			.catch((error) => {
				console.log("error delete");
				console.log(error);
			});
	};

	return (
		<React.Fragment>
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
						onClick={handleDelete(jadwal.idJadwal)}
					>
						Delete
					</div>
				</div>
			))}
		</React.Fragment>
	);
}
