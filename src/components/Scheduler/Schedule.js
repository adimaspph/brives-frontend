import React, { useState, useEffect } from "react";
import APIConfig from "../../api/APIConfig";

export default function Schedule({ date, hari }) {
	const [listJadwal, setListJadwal] = useState([]);

	useEffect(() => {
		const parameter = {
			tanggal: date.getDate(),
			bulan: date.getMonth()+1,
			tahun: date.getFullYear(),
		};
console.log(parameter);
		APIConfig.get("/jadwal", {
			params: parameter,
		})
			.then((response) => {
				setListJadwal(response.data.result);
                console.log(response.data);
			})
			.catch((error) => {
				console.log("error data");
			});
	}, [date]);

    const timeToRow = (waktu) => {
        let result = 0;
        let jam = Number(waktu.slice(0, 2));
        let menit = Number(waktu.slice(3));
        console.log(jam);
        console.log(menit);
        jam = (jam - 4 ) * 4;

        result = result + jam + 2;
        result = result + (menit/15);

        return result;
    }

	return (
		<React.Fragment>
			{listJadwal.map((jadwal, key) => (
				<div
					className="schedule"
					style={{
						gridRowStart: timeToRow(jadwal.waktuMulai),
						gridRowEnd: timeToRow(jadwal.waktuSelesai),
						gridColumnStart: hari + 1,
					}}
				>
					<span><b>{jadwal.mapel.namaMapel}</b></span>
					<span>{`${jadwal.waktuMulai} - ${jadwal.waktuSelesai}`}</span>
				</div>
			))}
		</React.Fragment>
	);
}
