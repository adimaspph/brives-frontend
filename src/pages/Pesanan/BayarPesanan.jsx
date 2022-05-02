import React, { Component, useState, useEffect } from "react";
import "../../components/Button/Button.css";
import PesananService from "../../services/PesananService";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RiwayatPesanan.css";
import NeutralNotification from '../../components/Notification/NeutralNotification';


export default function BayarPesananComponent(props) {
  const [pesanan, setPesanan] = useState({});
  const [link, setLink] = useState("");
  const [metode, setMetode] = useState("Bank BCA");
  const [idPesanan, setIdPesanan] = props.match.params.idPesanan;
  const [isNotifSubmit, setIsNotifSubmit] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(async () => {
    await getPesananData();
  }, []);

  const getPesananData = async () => {
    try {
      const { data } = await PesananService.getPesananById(props.match.params.idPesanan);
      const date = new Date(data?.result?.waktuDibuat);
      date.setHours(date.getHours() + 1);
      data.result.waktuDibuat = date.toLocaleString();
      setStatus(data.result.status.idStatusPesanan)

      setPesanan(data.result);
    } catch (err) {
      props.history.push(`/riwayat-pesanan/${props.match.params.idPesanan}`);
    }
  };

  // const handleSubmit = async () => {
  //   console.log(link)
  //   console.log()
  //   // try {
  //   //   const { data } = await PesananService.bayarPesanan(props.match.params.idPesanan, link);
  //   //   console.log(data);
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }

  //   // props.history.push(`/detail-pembayaran/${props.match.params.idPesanan}`);

  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(idPesanan)
    let updateMapel = { buktiBayar: link, metodePembayaran: metode }
    PesananService.addPembayaran(updateMapel, idPesanan).then(res => {
      let updateStatus = { idStatusPesanan: 2, jenisStatus: "Menunggu Verifikasi" }
      PesananService.updateStatusPesanan(updateStatus, idPesanan).then(res => {
        demoSubmit();
      });
    });

  }
  const demoSubmit = async () => {
    setIsNotifSubmit(true);
    await sleep(1500);
    window.location = "/riwayat-pesanan/" + idPesanan;

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const bayarNanti = () => {
    window.location = "/riwayat-pesanan/";
  };

  const handleMetodePembayaranChange = (event) => {
    setMetode(event.target.value);
  }

  return (
    <>

      <div className="">
        {isNotifSubmit ? (<NeutralNotification text="Pembayaran Berhasil Dibuat!" />) : ("")}

        <div className="d-flex flex-column page-container">
          <Navbar />

          <div className="outer-pelajar">
            <h2>Bayar Pesanan Anda</h2>
            <div className="">
              <div className="card-max-width">
                <div className="card-content">
                  <table className="table-none">
                    <tr>
                      <td>Nomor pesanan: </td>
                      <td> {pesanan?.idPesanan} </td>
                    </tr>
                    <tr>
                      <td>Total Pembayaran: </td>
                      <td> Rp {pesanan?.nominal} </td>
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
                    {status === 2 ? (
                      <tr>
                        <td> Link Google Drive Bukti Pembayaran</td>
                        <td>{pesanan?.buktiBayar}</td>
                      </tr>
                      
                    ) : ('')}
                    {status === 2 ? (
                      <tr>
                        <td> Metode Pembayaran</td>
                        <td>{pesanan?.metodePembayaran}</td>
                      </tr>
                      
                    ) : ('')}

                  </table>

                  {/* form */}

                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                      <label htmlFor="">Pilih Metode Pembayaran <span className='star'>*</span> </label>
                      <select onChange={handleMetodePembayaranChange} name="role" id="role" className='twobutton p-2'>
                        <option value="Bank BCA">Bank BCA - 31730571006</option>
                        <option value="Bank Mandiri">Bank Mandiri - 60029711177</option>
                      </select>

                      <br></br>
                      <label htmlFor="">Masukkan Link Google Drive <span className='star'>*</span> </label>
                      <input type="text" className='form-control'
                        value={link} onChange={(e) => setLink(e.target.value)} required />

                    </div>
                    <hr />
                    <div className='modalButtonContainer'>
                      <div className="button button-outline" onClick={bayarNanti}>
                        Bayar Nanti
                      </div>
                      <button type="submit" className="button button-primary">Simpan Pembayaran</button>
                    </div>
                  </form>

                  

                  


                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
}
