import React, { Component, useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import PesananService from '../../services/PesananService';
import LogService from '../../services/LogService';
import { generatePath } from 'react-router-dom';
import NeutralNotification from '../../components/Notification/NeutralNotification';



class DetailLog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            log: [],
            pesanan: [],
            idLog: this.props.match.params.idLog,
            catatan: '',
            catatanBaru: '',
            statusKehadiran: '',
            jenisKelas: '',
            waktuMulai: '',
            waktuSelesai: '',
            tanggal: '',
            namaMapel: '',
            status: '',
            idJadwal: 0,
            idStaff: 0,
            namaPengajar: '',
            isClickedHadir: false,
            isClickedTidakHadir: false,
            successHadir: false,
            successTidakHadir: false,
            idPesanan: 0,

        }

        this.pengajarTerpilih = this.pengajarTerpilih.bind(this);
        this.viewPesanan = this.viewPesanan.bind(this);
        this.handleCancelHadir = this.handleCancelHadir.bind(this);
        this.saveHadir = this.saveHadir.bind(this);
        this.saveTidakHadir = this.saveTidakHadir.bind(this);
    }

    viewPesanan(idPesanan) {
        this.props.history.push(generatePath("/pesanan/:idPesanan", { idPesanan }));

    }

    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if (JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL') {
            } else if (JSON.parse(localStorage.getItem("user")).role === 'PENGAJAR') {

            }
            else {
                this.props.history.push('/403');
            }
        } else {
            this.props.history.push('/login');
        }
        LogService.getLogByIdLog(this.state.idLog).then((res) => {
            this.setState({
                log: res.data.result,
                catatan: res.data.result.catatan,
                statusKehadiran: res.data.result.statusKehadiran,
                waktuMulai: res.data.result.jadwal.waktuMulai,
                waktuSelesai: res.data.result.jadwal.waktuSelesai,
                tanggal: res.data.result.jadwal.tanggal,
                namaMapel: res.data.result.jadwal.mapel.namaMapel,
                idJadwal: res.data.result.jadwal.idJadwal,
                jenisKelas: res.data.result.jadwal.jenisKelas,
            });

            PesananService.getStaffByIdJadwal(this.state.idJadwal).then((res) => {
                this.setState({
                    idStaff: res.data.result[0].idStaff,
                });
            });




        });


    }

    clickedHadirHandler = (event) => {
        this.setState({ isClickedHadir: true });
    };

    clickedTidakHadirHandler = (event) => {
        this.setState({ isClickedTidakHadir: true });
    };


    handleCancelHadir(idPesanan) {
        this.setState({ isClickedHadir: false, catatanBaru: '' });

    }

    handleCancelTidakHadir(idPesanan) {
        this.setState({ isClickedTidakHadir: false, catatanBaru: '' });

    }


    changecatatanBaruHandler = (event) => {
        this.setState({ catatanBaru: event.target.value });

    }

    saveHadir = (event) => {
        event.preventDefault();
        let log = { catatan: this.state.catatanBaru, statusKehadiran: 'HADIR' };
        LogService.updateKehadiran(log, this.state.idLog).then(res => {

            LogService.getJadwalStatusUnique(this.state.idJadwal, 5).then(res => {
                this.setState({
                    log: res.data.result,
                    idPesanan: res.data.result.idPesanan
                });
                let status = { idStatusPesanan: 6, jenisStatus: "Selesai" }
                PesananService.updateStatusPesanan(status, this.state.idPesanan).then(res => {
                    this.demoHadir(this.state.idLog);
                });
            });
        });
    }

    saveTidakHadir = (event) => {
        let log = { catatan: this.state.catatanBaru, statusKehadiran: 'TIDAK_HADIR' };
        LogService.updateKehadiran(log, this.state.idLog).then(res => {
            LogService.getJadwalStatusUnique(this.state.idJadwal, 5).then(res => {
                this.setState({
                    log: res.data.result,
                    idPesanan: res.data.result.idPesanan
                });
                let status = { idStatusPesanan: 6, jenisStatus: "Selesai" }
                PesananService.updateStatusPesanan(status, this.state.idPesanan).then(res => {
                    this.demoTidakHadir(this.state.idLog);
                });
            });
        });
    }


    async demoHadir(idLog) {
        this.setState({ successHadir: true });
        await this.sleep(1500);
        window.location.reload();

    }

    async demoTidakHadir(idLog) {
        this.setState({ successTidakHadir: true });
        await this.sleep(1500);
        window.location.reload();

    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    pengajarTerpilih(idStaff) {
        this.props.history.push(generatePath("/log-pengajar/:idStaff", { idStaff }));

    }


    render() {
        return (
            <div className='outer'>

                <Modal
                    show={this.state.isClickedHadir}
                    modalTitle="Verifikasi Kehadiran"
                >
                    <p>
                        <b>Mata Pelajaran : </b>
                        {this.state.namaMapel}
                    </p>
                    <p>
                        <b>Tanggal : </b>
                        {this.state.tanggal}
                    </p>
                    <p>
                        <b>Waktu : </b>
                        {this.state.waktuMulai} - {this.state.waktuSelesai} WIB
                    </p>
                    <form action="" onSubmit={this.saveHadir}>
                        <div className='form-group'>
                            <label htmlFor="">Catatan (Opsional) </label>
                            <input type="text" className='form-control'
                                value={this.state.catatanBaru} onChange={this.changecatatanBaruHandler} />
                        </div>
                        <div className='modalButtonContainer'>
                            <div className="button button-outline-blue" onClick={() => this.handleCancelHadir(this.state.idPesanan)}>
                                Kembali
                            </div>
                            <button type="submit" className="button button-blue">Simpan</button>
                        </div>
                    </form>
                </Modal>

                <Modal
                    show={this.state.isClickedTidakHadir}
                    modalTitle="Verifikasi Ketidakhadiran"
                >
                    <p>
                        <b>Mata Pelajaran : </b>
                        {this.state.namaMapel}
                    </p>
                    <p>
                        <b>Tanggal : </b>
                        {this.state.tanggal}
                    </p>
                    <p>
                        <b>Waktu : </b>
                        {this.state.waktuMulai} - {this.state.waktuSelesai} WIB
                    </p>
                    <form action="" onSubmit={this.saveTidakHadir}>
                        <div className='form-group'>

                            <label htmlFor="">Alasan Ketidakhadiran <span className='star'>*</span> </label>
                            <input type="text" className='form-control'
                                value={this.state.catatanBaru} onChange={this.changecatatanBaruHandler} required />
                        </div>
                        <div className='modalButtonContainer'>
                            <div className="button button-outline-blue" onClick={() => this.handleCancelTidakHadir(this.state.idPesanan)}>
                                Kembali
                            </div>
                            <button type="submit" className="button button-blue">Simpan</button>
                        </div>
                    </form>
                </Modal>

                {this.state.successHadir ? (<NeutralNotification text="Berhasil Memverifikasi Kehadiran!" />) : ("")}
                {this.state.successTidakHadir ? (<NeutralNotification text="Berhasil Memverifikasi Ketidakhadiran" />) : ("")}

                {JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL' ? (
                    <ul class="breadcrumb">
                        <li>
                            <a href="/log-pengajar">Pilih Pengajar</a>
                        </li>
                        <li>
                            <a className='' onClick={() => this.pengajarTerpilih(this.state.idStaff)} >Log Pengajar</a>
                        </li>
                        <li className="bractive">Detail Log</li>
                    </ul>
                ) : ('')}

                {JSON.parse(localStorage.getItem("user")).role === 'PENGAJAR' ? (
                    <ul class="breadcrumb">
                        <li>
                            <a href="/log">Daftar Log</a>
                        </li>
                        <li className="bractive">Detail Log</li>
                    </ul>
                ) : ('')}


                <h2>Detail Log</h2>

                <div className=''>
                    <div className='card-max-width'>
                        <div className='card-content'>

                            <table className='table-none'>
                                <tr>
                                    <td>Tanggal Bimbel</td>
                                    <td>{this.state.tanggal}</td>
                                </tr>
                                <tr>
                                    <td>Waktu Bimbel</td>
                                    <td>{this.state.waktuMulai} - {this.state.waktuSelesai} WIB</td>
                                </tr>
                                <tr>
                                    <td>Mata Pelajaran</td>
                                    <td>{this.state.namaMapel}</td>
                                </tr>

                                <tr>
                                    <td>Status Log</td>
                                    <td>{this.state.statusKehadiran}</td>
                                </tr>
                                {this.state.statusKehadiran === 'KOSONG' ? ('') : (
                                    <tr>
                                        <td>Catatan</td>
                                        <td>{this.state.catatan}</td>
                                    </tr>
                                )}


                            </table>

                            <hr />


                            {this.state.statusKehadiran === 'KOSONG' ? (
                                <div className='center'>
                                    <button onClick={this.clickedTidakHadirHandler} type="submit" className="button button-primary twobutton">Tidak Hadir</button>
                                    <button onClick={this.clickedHadirHandler} type="submit" className="button button-blue twobutton">Hadir</button>

                                </div>


                            ) : ('')}

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default DetailLog;
