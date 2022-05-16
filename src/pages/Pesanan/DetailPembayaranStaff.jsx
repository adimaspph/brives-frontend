import React, { Component, useState, useEffect } from "react";
import "../../components/Button/Button.css";
import PesananService from "../../services/PesananService";
import MapelService from "../../services/MapelService";
import APIConfig from "../../api/APIConfig";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RiwayatPesanan.css";
import Modal from "../../components/Modal/Modal";
import NeutralNotification from '../../components/Notification/NeutralNotification';


export default function DetailPembayaranStaffComponent(props) {
  const [pesanan, setPesanan] = useState({});
  const [pengajar, setPengajar] = useState({});
  const [siswa, setSiswa] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifTerima, setIsNotifTerima] = useState(false);
  const [isNotifTolak, setIsNotifTolak] = useState(false);
  const [status, setStatus] = useState('');
  const [idPesanan, setIdPesanan] = useState('');
  const [alasanPenolakan, setAlasanPenolakan] = useState('');

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
      // console.log(data.result.status.idStatusPesanan);
      // console.log(data.result.idPesanan);
      setIdPesanan(data.result.idPesanan)
      setStatus(data.result.status.idStatusPesanan)


      const res2 = await PesananService.getStaffByIdJadwal(data.result.jadwal.idJadwal);
      // console.log(res2)

      const res3 = await PesananService.getUserByIdStaff(res2.data.result[0].idStaff);
      // console.log(res3)

      setPengajar(res3.data.result[0]);

      const res4 = await APIConfig.get("/api/v1/user/siswa/" + data.result.siswa.idSiswa);
      // console.log(res4.data.result[0]);
      setSiswa(res4.data.result[0]);
    } catch (err) {
      // console.log(err);
      props.history.push(`/riwayat-pesanan/${props.match.params.idPesanan}`);
    }
  };

  // const terimaHandler = () => {
  //   // props.history.push(`/riwayat-pesanan`);
  //   console.log('terima')
  // };

  const terimaHandler = (event) => {
    event.preventDefault();
    let updateStatus = { idStatusPesanan: 3, jenisStatus: "Terverifikasi" }
    PesananService.updateStatusPesanan(updateStatus, idPesanan).then(res => {
      demoTerima();
    });

  }


  const demoTerima = async () => {
    setIsNotifTerima(true);
    await sleep(1500);
    window.location.reload();

  }

  const demoTolak = async () => {
    setIsNotifTolak(true);
    await sleep(1500);
    window.location.reload();

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const tolakHandler = () => {
    setIsOpen(true);
    // console.log('tolak')
  };

  const changeAlasanPenolakan = (event) => {
    setAlasanPenolakan(event.target.value);
  }


  const tolakModalHandler = (event) => {
    event.preventDefault();

    let pesanan = { alasan: alasanPenolakan };
    PesananService.updateAlasanPenolakan(pesanan, idPesanan).then(res => {
      let status = { idStatusPesanan: 4, jenisStatus: "Pembayaran Ditolak" }
      PesananService.updateStatusPesanan(status, idPesanan).then(res => {
        demoTolak();
      });
    });

  }

  return (
    <>

      <Modal show={isOpen} handleCloseModal={handleCloseModal} modalTitle="Tolak Pembayaran">
        <form onSubmit={tolakModalHandler}>
          <div className='form-group'>
            <label htmlFor="">Alasan Penolakan <span className='star'>*</span> </label>
            <input type="text" className='form-control'
              value={alasanPenolakan} onChange={changeAlasanPenolakan} required />
          </div>
          <div className='modalButtonContainer'>
            <div className="button button-outline" onClick={handleCloseModal}>
              Kembali
            </div>
            <button type="submit" className="button button-primary">Simpan</button>
          </div>
        </form>
      </Modal>

      {isNotifTerima ? (<NeutralNotification text="Pesanan Berhasil Diverifikasi!" />) : ("")}
      {isNotifTolak ? (<NeutralNotification text="Pesanan Berhasil Ditolak!" />) : ("")}

      <div className="outer">
        <ul class="breadcrumb">
          <li>
            <a href="/daftar-pembayaran">Daftar Pembayaran</a>
          </li>
          <li className="bractive">
            <a href={`/riwayat-pesanan/${props.match.params.idPesanan}`}>Detail Pembayaran</a>
          </li>
        </ul>

        <h2>Detail Pembayaran</h2>

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
                  <td>{pesanan?.jadwal?.waktuMulai} - {pesanan?.jadwal?.waktuSelesai}</td>
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
                  <td> status pesanan</td>
                  <td>{pesanan?.status?.jenisStatus}</td>
                </tr>
                <tr>
                  <td> Materi</td>
                  <td>{pesanan?.materi}</td>
                </tr>
                {status === 4 ? (
                  <tr>
                    <td> Alasan Penolakan</td>
                    <td>{pesanan?.alasan}</td>
                  </tr>
                ) : ('')}
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
              <hr />

              {status === 2 ? (
                <div className='center'>
                  <button onClick={tolakHandler} type="submit" className="button button-primary twobutton">Tolak Pembayaran</button>
                  <button onClick={terimaHandler} type="submit" className="button button-blue twobutton">Terima Pembayaran</button>

                </div>
              ) : ('')}






            </div>
          </div>

        </div>
        <h3>Data Pemesan</h3>
        <div className=''>
          <div className='card-max-width'>
            <div className='card-content'>
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

    </>
  );
}
