import React, { Component, useState, useEffect } from "react";

import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RiwayatPesanan.css";
import APIConfig from "../../api/APIConfig";



class RiwayatPesanan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesanan: [],
            usernameSiswa: '',
            siswa: [],
            idSiswa: '',
            selectedPesanan: "Semua",
            statusPesanan: [
                "Semua",
                "Belum Dibayar",
                "Menunggu Verifikasi",
                "Terverifikasi",
                "Pembayaran Ditolak",
                "Dijadwalkan",
                "Selesai",
                "Dibatalkan"
            ]
        }

        this.viewPesanan = this.viewPesanan.bind(this);
    }

    viewPesanan(idPesanan) {
        this.props.history.push(generatePath("/riwayat-pesanan/:idPesanan", { idPesanan }));

    }

    async componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if (JSON.parse(localStorage.getItem("user")).role === 'PELAJAR') {
            } else {
                this.props.history.push('/403');
            }
        } else {
            this.props.history.push('/login');
        }

        APIConfig.get("/api/v1/user/auth/")
            .then(async (response) => {
                this.setState({ idSiswa: response.data.result.siswa.idSiswa })

                let res = await PesananService.getPesananByIdSiswa(this.state.idSiswa)
                let pesanan = res.data.result


                let newPesanan = []
                for (let i = 0; i < pesanan.length; i++) {
                    let psn = pesanan[i];
                    let staffRes = await PesananService.getStaffByIdJadwal(psn.jadwal.idJadwal)
                    const idStaff =  staffRes.data.result[0].idStaff

                    let resUser = await PesananService.getUserByIdStaff(idStaff)
                    psn = {...psn, namaPengajar: resUser.data.result[0].namaLengkap}
                    newPesanan.push(psn)
                }

                this.setState({ pesanan: newPesanan });

            });
    }




    handleStatusChange = async (status, index) => {
        this.setState({ selectedPesanan: status})
        let res = await  PesananService.getPesananByStatusSiswa(this.state.idSiswa, index)
        let pesanan = res.data.result


        let newPesanan = []
        for (let i = 0; i < pesanan.length; i++) {
            let psn = pesanan[i];
            let staffRes = await PesananService.getStaffByIdJadwal(psn.jadwal.idJadwal)
            const idStaff =  staffRes.data.result[0].idStaff

            let resUser = await PesananService.getUserByIdStaff(idStaff)
            psn = {...psn, namaPengajar: resUser.data.result[0].namaLengkap}
            newPesanan.push(psn)
        }

        this.setState({ pesanan: newPesanan });


    };

    render() {
        return (
            <div className="">
                <div className="d-flex flex-column page-container">
                    <Navbar />
                    <h1 className="text-center title-riwayat">Riwayat Pesanan</h1>
                    <div className="outer-pelajar">
                        <div className='d-flex flex-row'>
                            {/*<p className="p-2 align-self-end">Pilih Status: </p>*/}
                            <div className="jenjang-select">
                                {this.state.statusPesanan.map((status, key) => (
                                    <span
                                        key={key}
                                        className={
                                            this.state.selectedPesanan === status
                                                ? "jenjang-btn jenjang-selected"
                                                : "jenjang-btn"
                                        }
                                        onClick={() => this.handleStatusChange(status, key)}
                                    >
                                        {status}
                                    </span>
                                ))}
                            </div>

                        </div>
                        {this.state.pesanan.length === 0 ? <><p>Tidak ada riwayat pesanan {this.state.selectedPesanan}</p></> : <div>
                        <table className="table-max table-none">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Tanggal Dibuat</th>
                                <th scope="col">Nomor Pesanan</th>
                                <th scope="col">Mata Pelajaran</th>
                                <th scope="col">Nama Pengajar</th>
                                <th scope="col">Total Pesanan</th>
                                <th scope="col">Tanggal Bimbel</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.pesanan.map((SatuPesanan, index) => (
                                <tr key={SatuPesanan.idPesanan}>
                                    <td>{index + 1}</td>
                                    <td> {SatuPesanan.waktuDibuat} </td>
                                    <td scope='row'> {SatuPesanan.idPesanan} </td>
                                    <td scope='row'> {SatuPesanan.jadwal.mapel.namaMapel} </td>
                                    <td scope='row'> {SatuPesanan.namaPengajar} </td>
                                    <td> Rp {SatuPesanan.nominal} </td>
                                    <td> {SatuPesanan.jadwal.tanggal} {SatuPesanan.jadwal.waktuMulai} - {SatuPesanan.jadwal.waktuSelesai}  </td>
                                    <td> {SatuPesanan.status.jenisStatus} </td>
                                    <td>
                                        <a className="button button-outline" onClick={() => this.viewPesanan(SatuPesanan.idPesanan)}>
                                            Lihat
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                            </div>}
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

export default RiwayatPesanan;
