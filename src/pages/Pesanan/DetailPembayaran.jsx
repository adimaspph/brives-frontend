import React, { Component, useState, useEffect } from "react";
import "../../components/Button/Button.css";
import PesananService from "../../services/PesananService";
import MapelService from "../../services/MapelService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RiwayatPesanan.css";

export default function DetailPembayaranComponent(props) {
  const [pesanan, setPesanan] = useState({});
  const [pengajar, setPengajar] = useState({});
  const [staffId, setStaffId] = useState(0);
  const [link, setLink] = useState("");

  useEffect(async () => {
    await getPesananData();
  }, []);

  const getPesananData = async () => {
    try {
      let { data } = await PesananService.getPesananById(props.match.params.idPesanan);
      const date = new Date(data?.result?.waktuDibuat);
      date.setHours(date.getHours() + 1);
      data.result.waktuDibuat = date.toLocaleString();

      setPesanan(data.result);
      console.log(data.result)

        const res2 =  await PesananService.getStaffByIdJadwal(data.result.jadwal.idJadwal)
        // console.log(res2)

        const res3 = await PesananService.getUserByIdStaff(res2.data.result[0].idStaff)
        // console.log(res3)

        setPengajar(res3.data.result[0])
    } catch (err) {
        console.log(err)
      props.history.push(`/riwayat-pesanan/${props.match.params.idPesanan}`);
    }
  };


  const riwayatSubmit = () => {
    props.history.push(`/riwayat-pesanan`);

  }

  return (
    <>
      <Navbar />
      <h2>Pembayaran</h2>
      <div className="outer">
        <ul class="breadcrumb">
          <li>
            <a href="/pesanan">Daftar Pesanan</a>
          </li>
          <li>
            <a href={`/riwayat-pesanan/${props.match.params.idPesanan}`}>Detail Pesanan</a>
          </li>
          <li className="bractive">Bayar Pesanan</li>
        </ul>

        <div>
          <div className="card-max-width">
            <div className="card-content">
              <table className="table-none">
                <tr>
                  <td>Nomor pesanan: </td>
                  <td> {pesanan?.idPesanan} </td>
                </tr>
                <tr>
                  <td>Mata Pelajaran </td>
                  <td> {pesanan?.jadwal?.mapel?.namaMapel} </td>
                </tr>
                <tr>
                  <td>Pengajar</td>
                  <td>{pengajar?.namaLengkap}</td>
                </tr>
                <tr>
                  <td> Tanggal</td>
                  <td>{pesanan?.jadwal?.tanggal}</td>
                </tr>
                <tr>
                  <td> Waktu</td>
                  <td>{pesanan?.jadwal?.waktuMulai}</td>
                </tr>
                <tr>
                  <td> Materi</td>
                  <td>{pesanan?.materi}</td>
                </tr>
                <tr>
                  <td> status pesanan</td>
                  <td>{pesanan?.status?.jenisStatus}</td>
                </tr>
              </table>
              <div className="center">
                <input
                  type="submit"
                  className="button button-outline-blue twobutton"
                  value="Lihat Riwayat Pesanan"
                  onClick={riwayatSubmit}

                ></input>
                <input
                  type="submit"
                  className="button button-blue twobutton"
                  value="Pesan Lagi"
                  onClick={riwayatSubmit}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
