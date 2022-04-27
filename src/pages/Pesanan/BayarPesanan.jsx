import React, { Component, useState, useEffect } from "react";
import "../../components/Button/Button.css";
import PesananService from "../../services/PesananService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RiwayatPesanan.css";

export default function BayarPesananComponent(props) {
  const [pesanan, setPesanan] = useState({});
  const [link, setLink] = useState("");
  useEffect(async () => {
    await getPesananData();
  }, []);

  const getPesananData = async () => {
    try {
      const { data } = await PesananService.getPesananById(props.match.params.idPesanan);
      const date = new Date(data?.result?.waktuDibuat);
      date.setHours(date.getHours() + 1);
      data.result.waktuDibuat = date.toLocaleString();

      setPesanan(data.result);
    } catch (err) {
      props.history.push(`/riwayat-pesanan/${props.match.params.idPesanan}`);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await PesananService.bayarPesanan(props.match.params.idPesanan, link);
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    props.history.push(`/detail-pesanan/${props.match.params.idPesanan}`);

  };

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
                  <td>Nominal + Kode Unik: </td>
                  <td> {pesanan?.nominal} </td>
                </tr>
                <tr>
                  <td>
                    <p>Maksimal Pembayaran: </p>
                    <p>
                      Catatan: Jika Anda tidak membayar dalam kurun waktu 60 menit setelah pesanan
                      dibuat, maka admin BTA berhak untuk membatalkan pesanan Anda
                    </p>
                  </td>
                  <td>
                    <p>{pesanan?.waktuDibuat}</p>
                  </td>
                </tr>
                <tr>
                  <td>Daftar Rekening BTA </td>
                  <td>
                    <p>Bank BCA - 29711111111</p>
                    <p>Bank Mandiri - 29711111111</p>
                  </td>
                </tr>
                <tr>
                  <td>Link Google drive bukti pembayaran</td>
                  <td>
                    <input type="text" onChange={(e) => setLink(e.target.value)}></input>
                  </td>
                </tr>
              </table>
              <div className="center">
                <input
                  type="submit"
                  className="button button-outline-blue twobutton"
                  value="Bayar Nanti"
                ></input>
                <input
                  type="submit"
                  className="button button-blue twobutton"
                  value="Submit"
                  onClick={handleSubmit}
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
