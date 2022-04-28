import React, { Component, useState, useEffect } from "react";

import PesananService from "../../services/PesananService";
import { generatePath } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RiwayatPesanan.css";
import APIConfig from "../../api/APIConfig";

export default function DaftarPembayaranComponent(props) {
  const [pesanan, setPesanan] = useState([]);

  useEffect(async () => {
    await getListPesanan();
  }, []);

  const getListPesanan = async () => {
    try {
      const { data } = await PesananService.getPesanan();
      console.log(data.result);
      setPesanan(data.result);
    } catch (err) {
      console.log(err);
      props.history.push("/riwayat-pesanan");
    }
  };

  const pesananHandle = (id) => {
    props.history.push("/detail-pembayaran-staff/" + id);

  };

  const handleStatusChange = () => {};

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <h1 className="text-center title-riwayat">Riwayat Pesanan</h1>
        <div className="outer-pelajar">
          <div className="d-flex flex-row">
            <p className="p-2 align-self-end">Pilih Status: </p>
            <select onChange={handleStatusChange} name="role" id="role" className="twobutton p-2">
              <option value="0">Semua</option>
              <option value="1">Belum Dibayar</option>
              <option value="2">Menunggu Verifikasi</option>
              <option value="3">Terverifikasi</option>
              <option value="4">Pembayaran Ditolak</option>
              <option value="5">Dijadwalkan</option>
              <option value="6">Selesai</option>
              <option value="7">Dibatalkan</option>
            </select>
          </div>

          <table className="table-max table-none">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Tanggal Dibuat</th>
                <th scope="col">Nomor Pesanan</th>
                <th scope="col">Id Pemesan</th>
                <th scope="col">Total Pesanan</th>
                <th scope="col">Tanggal Bimbel</th>
                <th scope="col">Status</th>
                <th scope="col">Bukti</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {pesanan.map((SatuPesanan, index) => (
                <tr key={SatuPesanan.idPesanan}>
                  <td>{index + 1}</td>
                  <td> {SatuPesanan.waktuDibuat} </td>
                  <td scope="row"> {SatuPesanan.idPesanan} </td>
                  <td> {SatuPesanan?.siswa?.idSiswa} </td>
                  <td> Rp {SatuPesanan.nominal} </td>
                  <td>
                    {" "}
                    {SatuPesanan.jadwal.tanggal} {SatuPesanan.jadwal.waktuMulai} -{" "}
                    {SatuPesanan.jadwal.waktuSelesai}{" "}
                  </td>
                  <td> {SatuPesanan.status.jenisStatus} </td>
                  <td> <a target="_blank" href={SatuPesanan?.buktiBayar}> {SatuPesanan?.buktiBayar} </a> </td>
                  <td>
                    <a
                      className="button button-outline"
                      onClick={() => pesananHandle(SatuPesanan.idPesanan)}
                    >
                      Lihat
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </>
  );
}
