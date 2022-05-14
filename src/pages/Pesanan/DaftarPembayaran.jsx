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
      const { data } = await PesananService.getPesananByIdStatus(2);
      setPesanan(data.result);
    } catch (err) {
      props.history.push("/riwayat-pesanan");
    }
  };

  const pesananHandle = (id) => {
    props.history.push("/detail-pembayaran-staff/" + id);

  };

  const handleStatusChange = () => { 
    const select = document.getElementById('status');
    PesananService.getPesananByIdStatus(select.value).then((res) => {
      setPesanan(res.data.result)

  });
  };

  return (
    <>
      <div className='outer'>

        <h1 className=''>Daftar Pembayaran</h1>

          <div className="d-flex flex-row">
            <p className="p-2 align-self-end">Pilih Status: </p>
            <select onChange={handleStatusChange} name="role" id="status" className="twobutton p-2">
              <option value="2">Menunggu Verifikasi</option>
              <option value="3">Terverifikasi</option>
              <option value="4">Pembayaran Ditolak</option>
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
                <th scope="col">Metode Pembayaran</th>
                <th scope="col">Tanggal Bimbel</th>
                <th scope="col">Status</th>
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
                  <td> {SatuPesanan.metodePembayaran} </td>
                  <td>
                    {" "}
                    {SatuPesanan.jadwal.tanggal} {SatuPesanan.jadwal.waktuMulai} -{" "}
                    {SatuPesanan.jadwal.waktuSelesai}{" "}
                  </td>
                  <td> {SatuPesanan.status.jenisStatus} </td>
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
    </>
  );
}
