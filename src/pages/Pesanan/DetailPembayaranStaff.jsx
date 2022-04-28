import React, { Component, useState, useEffect } from "react";
import "../../components/Button/Button.css";
import PesananService from "../../services/PesananService";
import MapelService from "../../services/MapelService";
import APIConfig from "../../api/APIConfig";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RiwayatPesanan.css";
import Modal from "../../components/Modal/Modal";

export default function DetailPembayaranStaffComponent(props) {
  const [pesanan, setPesanan] = useState({});
  const [pengajar, setPengajar] = useState({});
  const [siswa, setSiswa] = useState({});
  const [isOpen, setIsOpen] = useState(false);

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
      console.log(data.result);

      const res2 = await PesananService.getStaffByIdJadwal(data.result.jadwal.idJadwal);
      // console.log(res2)

      const res3 = await PesananService.getUserByIdStaff(res2.data.result[0].idStaff);
      // console.log(res3)

      setPengajar(res3.data.result[0]);

      const res4 = await APIConfig.get("/api/v1/user/siswa/" + data.result.siswa.idSiswa);
      console.log(res4.data.result[0]);
      setSiswa(res4.data.result[0]);
    } catch (err) {
      console.log(err);
      props.history.push(`/riwayat-pesanan/${props.match.params.idPesanan}`);
    }
  };

  const riwayatSubmit = () => {
    props.history.push(`/riwayat-pesanan`);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const tolakHandler = () => {
    setIsOpen(true);
  };

  const tolakModalHandler = () => {}
  return (
    <>
      <Modal show={isOpen} handleCloseModal={handleCloseModal} modalTitle="Tolak Pembayaran User">

          <p>Alasan penolakan</p>
          <input type={'text'} />
        <input
          type="submit"
          className="button button-outline-blue twobutton"
          value="Batal"
          onClick={handleCloseModal}
        ></input>
        <input
          type="submit"
          className="button button-outline-blue twobutton"
          value="Tolak"
          onClick={tolakModalHandler}
        ></input>
      </Modal>
      <Navbar />
      <h2>Detail Pembayaran</h2>
      <div className="outer">
        <ul class="breadcrumb">
          <li>
            <a href="/pesanan">Daftar Pesanan</a>
          </li>
          <li className="bractive">
            <a href={`/riwayat-pesanan/${props.match.params.idPesanan}`}>Detail Pesanan</a>
          </li>
        </ul>

        <div>
          <div className="card-max-width">
            <div className="card-content">
              <h3>Data Pesanan</h3>
              <table className="table-none">
                <tr>
                  <td>Nomor pesanan: </td>
                  <td> {pesanan?.idPesanan} </td>
                </tr>
                <tr>
                  <td>Tanggal pesanan: </td>
                  <td> {pesanan?.waktuDibuat} </td>
                </tr>
                <tr>
                  <td>Total pesanan: </td>
                  <td> {pesanan?.nominal} </td>
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
                  <td>Pengajar</td>
                  <td>{pengajar?.namaLengkap}</td>
                </tr>
                <tr>
                  <td>Mata Pelajaran </td>
                  <td> {pesanan?.jadwal?.mapel?.namaMapel} </td>
                </tr>
                <tr>
                  <td>Link Zoom </td>
                  <td> {pesanan?.jadwal?.linkZoom} </td>
                </tr>
                <tr>
                  <td> status pesanan</td>
                  <td>{pesanan?.status?.jenisStatus}</td>
                </tr>
                <tr>
                  <td> Materi</td>
                  <td>{pesanan?.materi}</td>
                </tr>
                <tr>
                  <td> Bukti</td>
                  <td>
                    <a target="_blank" href={pesanan?.buktiBayar}>
                      {" "}
                      {pesanan?.buktiBayar}{" "}
                    </a>
                  </td>
                </tr>
              </table>
              <div className="center">
                <input
                  type="submit"
                  className="button button-outline-blue twobutton"
                  value="Tolak"
                  onClick={tolakHandler}
                ></input>
                <input
                  type="submit"
                  className="button button-blue twobutton"
                  value="Terima"
                  onClick={riwayatSubmit}
                ></input>
              </div>

              <h3>Data Pemesan</h3>
              <table className="table-none">
                <tr>
                  <td>Nama Pemesan: </td>
                  <td> {siswa?.namaLengkap} </td>
                </tr>
                <tr>
                  <td>Username Pemesan: </td>
                  <td> {siswa?.username} </td>
                </tr>
                <tr>
                  <td>Nama Pemesan: </td>
                  <td> {siswa?.email} </td>
                </tr>
                <tr>
                  <td>Nama Pemesan: </td>
                  <td> {siswa?.noHP} </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
