import React, { Component, useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';
import NeutralNotification from '../../components/Notification/NeutralNotification';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


class DetailRiwayatPesanan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesanan: [],
            idPesanan: this.props.match.params.idPesanan,
            linkZoom: '',
            waktuMulai: '',
            waktuSelesai: '',
            tanggal: '',
            namaMapel: '',
            status: '',
            idSiswa: 0,
            namaSiswa: '',
            usernameSiswa: '',
            emailSiswa: '',
            nomorHpSiswa: '',
            idJadwal: 0,
            idStaff: 0,
            namaPengajar: '',
            isClickedTolakPesanan: false,
            isTolak: false,
        }

        this.viewPesanan = this.viewPesanan.bind(this);
    }

    viewPesanan(idPesanan) {
        this.props.history.push(generatePath("/pesanan/:idPesanan", { idPesanan }));

    }

    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if (JSON.parse(localStorage.getItem("user")).role === 'PELAJAR') {
            } else {
                this.props.history.push('/403');
            }
        } else {
            this.props.history.push('/login');
        }
        PesananService.getPesananById(this.state.idPesanan).then((res) => {
            this.setState({
                pesanan: res.data.result,
                linkZoom: res.data.result.jadwal.linkZoom,
                waktuMulai: res.data.result.jadwal.waktuMulai,
                waktuSelesai: res.data.result.jadwal.waktuSelesai,
                tanggal: res.data.result.jadwal.tanggal,
                mapel: res.data.result.jadwal.mapel.namaMapel,
                status: res.data.result.status.jenisStatus,
                idSiswa: res.data.result.siswa.idSiswa,
                idJadwal: res.data.result.jadwal.idJadwal
            });

            PesananService.getStaffByIdJadwal(this.state.idJadwal).then((res) => {
                this.setState({
                    idStaff: res.data.result[0].idStaff,

                });
                PesananService.getUserByIdStaff(this.state.idStaff).then((res) => {
                    this.setState({
                        namaPengajar: res.data.result[0].namaLengkap,

                    });

                });
            });

            PesananService.getUserByIdSiswa(res.data.result.siswa.idSiswa).then((res) => {

                this.setState({
                    namaSiswa: res.data.result[0].namaLengkap,
                    usernameSiswa: res.data.result[0].username,
                    emailSiswa: res.data.result[0].email,
                    nomorHpSiswa: res.data.result[0].noHP,
                });
            });


        });


    }


    clickedtTolakPesanan = (event) => {
        this.setState({ isClickedTolakPesanan: true });
    };

    ClickedBayar = (event) => {
        this.props.history.push(generatePath("/bayar-pesanan/:idPesanan", { idPesanan: this.state.idPesanan }));

    };

    handleCancelTolak(idPesanan) {
        this.setState({ isClickedTolakPesanan: false });

    }

    tolakPesanan = (event) => {
        event.preventDefault();

        let status = { idStatusPesanan: 7, jenisStatus: "Dibatalkan" }
        PesananService.updateStatusPesanan(status, this.state.idPesanan).then(res => {
        });

        this.demoTolak();

    }

    async demoTolak() {
        this.setState({ isTolak: true });
        await this.sleep(1500);
        window.location.reload();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className='outer-pelajar'>

                    <Modal
                        show={this.state.isClickedTolakPesanan}
                        handleCloseModal={this.handleCancel}
                        modalTitle="Konfirmasi"
                    >
                        <p>Apakah Anda yakin akan membatalkan pesanan ini?</p>
                        <div className="modalButtonContainer">

                            <div className="button button-outline" onClick={() => this.handleCancelTolak(this.state.idPesanan)}>
                                Kembali
                            </div>

                            <div className="button button-primary" onClick={this.tolakPesanan}>
                                Batalkan
                            </div>
                        </div>


                    </Modal>

                    {this.state.isTolak ? (<NeutralNotification text="Pesanan Berhasil Dibatalkan!" />) : ("")}

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <ul class="breadcrumb">
                        <li><a href="/riwayat-pesanan">Riwayat Pesanan</a></li>
                        <li className='bractive'>Detail Pesanan</li>
                    </ul>

                    <h2>Detail Pesanan</h2>

                    <div className=''>
                        <div className='card-max-width'>
                            <div className='card-content'>

                                <table className='table-none'>
                                    <tr>
                                        <td>Nomor Pesanan</td>
                                        <td>{this.state.pesanan.idPesanan}</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal Dibuat</td>
                                        <td>{this.state.pesanan.waktuDibuat}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Pesanan</td>
                                        <td>Rp {this.state.pesanan.nominal}</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal Bimbel</td>
                                        <td>{this.state.tanggal}</td>
                                    </tr>
                                    <tr>
                                        <td>Waktu Bimbel</td>
                                        <td>{this.state.waktuMulai} - {this.state.waktuSelesai}</td>
                                    </tr>
                                    <tr>
                                        <td>Pengajar</td>
                                        <td>{this.state.namaPengajar}</td>
                                    </tr>
                                    <tr>
                                        <td>Mata Pelajaran</td>
                                        <td>{this.state.mapel}</td>
                                    </tr>

                                    <tr >
                                        <td>Link Meeting</td>
                                        <td>{this.state.linkZoom}</td>
                                    </tr>

                                    <tr>
                                        <td>Status Pesanan</td>
                                        <td>{this.state.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Materi</td>
                                        <td>{this.state.pesanan.materi}</td>
                                    </tr>
                                    <tr>
                                        <td>Bukti Bayar</td>
                                        <td>{this.state.pesanan.buktiBayar}</td>
                                    </tr>
                                </table>

                                <hr />

                                {this.state.status === 'Belum Dibayar' ? (
                                    <div className='center'>
                                        <button onClick={this.clickedtTolakPesanan} type="submit" className="button button-outline-blue twobutton">Batalkan Pesanan</button>
                                        <button onClick={this.ClickedBayar} type="submit" className="button button-blue  twobutton">Bayar</button>
                                    </div>
                                ) : ('')}



                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}

export default DetailRiwayatPesanan;
