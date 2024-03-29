import React, { Component, useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import LogService from '../../services/LogService';
import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';
import NeutralNotification from '../../components/Notification/NeutralNotification';
import ErrorNotification from '../../components/Notification/ErrorNotification';
import PenggunaService from '../../services/PenggunaService';




class ListLogPengajarTerpilih extends Component {
    constructor(props) {
        super(props)
        this.state = {
            log: [],
            pesanan: [],
            idStaff: 0,
            namaPengajar: '',
            status: 'KOSONG',
            catatan: '',
            catatanBaru: '',
            statusKehadiran: '',
            jenisKelas: '',
            waktuMulai: '',
            waktuSelesai: '',
            tanggal: '',
            namaMapel: '',
            idJadwal: 0,
            isClickedHadir: false,
            isClickedTidakHadir: false,
            successHadir: false,
            successTidakHadir: false,
            idPesanan: 0,

        }

        this.handleCancelHadir = this.handleCancelHadir.bind(this);
        this.saveHadir = this.saveHadir.bind(this);
        this.saveTidakHadir = this.saveTidakHadir.bind(this);

    }

    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if (JSON.parse(localStorage.getItem("user")).role === 'PENGAJAR') {
            } else {
                this.props.history.push('/403');
            }
        } else {
            this.props.history.push('/login');
        }
        let status = this.getQueryParams('status')
        if (status === 'HADIR') {
            this.setState({status})
        } else if (status === 'TIDAK_HADIR') {
            this.setState({status})
        } else {
            status = "KOSONG"
        }

        PenggunaService.getAuthenticatedUser().then((res) => {
            let pengguna = res.data;
            this.setState({
                idStaff: pengguna.result.staff.idStaff,
            });
            LogService.getLogByStatusKehadiranSatuPengajar(this.state.idStaff, status).then((res) => {
                this.setState({
                    log: res.data.result,
                });
                PesananService.getUserByIdStaff(this.state.idStaff).then((res) => {
                    this.setState({
                        namaPengajar: res.data.result[0].namaLengkap,
                    });
                });
            });
        });
    }

    clickedHadirHandler = (log) => {
        const {tanggal, waktuMulai, waktuSelesai, idJadwal} =  log.jadwal
        this.setState({ isClickedHadir: true, idLog: log.idLog, namaMapel: log.jadwal.mapel.namaMapel, tanggal, waktuMulai, waktuSelesai, idJadwal  });
        // LogService.getLogByIdLog(idLog);
        // console.log(idLog);
    };

    clickedTidakHadirHandler = (log) => {
        const {tanggal, waktuMulai, waktuSelesai, idJadwal} =  log.jadwal
        this.setState({ isClickedTidakHadir: true, idLog: log.idLog, namaMapel: log.jadwal.mapel.namaMapel, tanggal, waktuMulai, waktuSelesai, idJadwal  });
        // LogService.getLogByIdLog(idLog);
        // console.log(idLog);

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

    handleRoleChange = (event) => {
        window.location.search = '?status=' + event.target.value;
        this.setState({ status: event.target.value });
        // LogService.getLogByStatusKehadiranSatuPengajar(this.state.idStaff, event.target.value).then((res) => {
        //     this.setState({ log: res.data.result });

        // });
    };

    lihatLog(idLog) {
        this.props.history.push(generatePath("/log/:idLog", { idLog }));

    }

    saveHadir = async (event) => {
        event.preventDefault();
        let log = { catatan: this.state.catatanBaru, statusKehadiran: 'HADIR' };
        try {
            // LogService.updateKehadiran(log, this.state.idLog).then(res => {

            //     LogService.getJadwalStatusUnique(this.state.idJadwal, 5).then(res => {
            //         this.setState({
            //             log: res.data.result,
            //             idPesanan: res.data.result.idPesanan
            //         });
            //         let status = { idStatusPesanan: 6, jenisStatus: "Selesai" }
            //         PesananService.updateStatusPesanan(status, this.state.idPesanan).then(res => {
            //             this.demoHadir(this.state.idLog);
            //         });
            //     });
            // });
            const updateKehadiran = await LogService.updateKehadiran(log, this.state.idLog)
            const getJadwalStatusUnique = await LogService.getJadwalStatusUnique(this.state.idJadwal, 5)
            this.setState({
                idPesanan: getJadwalStatusUnique.data.result.idPesanan
            });
            let status = { idStatusPesanan: 6, jenisStatus: "Selesai" }
            const updateStatusPesanan = await PesananService.updateStatusPesanan(status, getJadwalStatusUnique.data.result.idPesanan)
            this.demoHadir(this.state.idLog);
        } catch (e) {
            this.errorMessage()
        }
    }

    saveTidakHadir = async (event) => {
        event.preventDefault();
        let log = { catatan: this.state.catatanBaru, statusKehadiran: 'TIDAK_HADIR' };
        try {
            // LogService.updateKehadiran(log, this.state.idLog).then(res => {
            //     LogService.getJadwalStatusUnique(this.state.idJadwal, 5).then(res => {
            //         this.setState({
            //             log: res.data.result,
            //             idPesanan: res.data.result.idPesanan
            //         });
            //         let status = { idStatusPesanan: 6, jenisStatus: "Selesai" }
            //         PesananService.updateStatusPesanan(status, this.state.idPesanan).then(res => {
            //             this.demoTidakHadir(this.state.idLog);
            //         });
            //     });
            // });
            const updateKehadiran = await LogService.updateKehadiran(log, this.state.idLog)
            const getJadwalStatusUnique = await LogService.getJadwalStatusUnique(this.state.idJadwal, 5)
            this.setState({
                idPesanan: getJadwalStatusUnique.data.result.idPesanan
            });
            let status = { idStatusPesanan: 6, jenisStatus: "Selesai" }
            const updateStatusPesanan = await PesananService.updateStatusPesanan(status, getJadwalStatusUnique.data.result.idPesanan)
            this.demoTidakHadir(this.state.idLog);

        } catch (e) {
            this.errorMessage()

        }
    }

    async demoHadir(idLog) {
        this.setState({ successHadir: true });
        await this.sleep(1500);
        // window.location.reload();
        window.location.search = '?status=HADIR';
        this.setState({ isClickedHadir: false });

    }

    async demoTidakHadir(idLog) {
        this.setState({ successTidakHadir: true });
        await this.sleep(1500);
        // window.location.reload();
        window.location.search = '?status=TIDAK_HADIR';
        this.setState({ isClickedTidakHadir: false });

    }

    async errorMessage() {
        this.setState({ errorMessage: true });
        await this.sleep(1500);
        window.location.reload();
    }


    getQueryParams(k) {
        var p = {};
        this.props.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (s, k, v) => {
            p[k] = v;
        })
        return k ? p[k] : p;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (
            <div className='outer'>


                <h1 className=''>Daftar Log</h1>

                <div className='space'>
                    <div className='d-flex flex-row'>
                        <p className="p-2 align-self-end">Pilih Status: </p>
                        <select onChange={this.handleRoleChange} value={this.state.status} name="role" id="role" className='twobutton'>
                            <option value="KOSONG">Belum Diisi</option>
                            <option value="HADIR">Hadir</option>
                            <option value="TIDAK_HADIR">Tidak Hadir</option>
                        </select>
                    </div>
                </div>

                <div className=''>
                    <table className='table-max table-none' id='myTable'>
                        <thead>
                        <tr className=''>
                            <th scope="col">No</th>
                            <th className='text-center' scope='col'>Id Log</th>
                            <th className='text-center' scope='col'>Mata Pelajaran</th>
                            <th className='text-center' scope='col'>Tanggal Kelas</th>
                            <th className='text-center' scope='col'>Waktu</th>
                            <th className='text-center' scope='col'>Jenis Kelas</th>
                            {this.state.status === 'KOSONG' ? (
                                <th className='text-center' scope='col'>Hadir</th>
                            ) : ('')}
                            {this.state.status === 'KOSONG' ? (
                                <th className='text-center' scope='col'>Tidak Hadir</th>
                            ) : ('')}
                            <th className='text-center' scope='col'>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.log.map((satuMapel, index) => (
                            // <tr key={satuMapel.idUser}>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td> {satuMapel.idLog} </td>
                                <td>{satuMapel.jadwal.mapel.namaMapel} </td>
                                <td>{satuMapel.jadwal.tanggal}</td>
                                <td>{satuMapel.jadwal.waktuMulai} - {satuMapel.jadwal.waktuSelesai} </td>
                                <td>{satuMapel.jadwal.jenisKelas} </td>

                                {this.state.status === 'KOSONG' ? (
                                    <td>
                                        <div className='col'>
                                            <div className='my-2 d-flex flex justify-content-center'>
                                                <button type="submit" className="btn btn-success px-3" onClick={()=> this.clickedHadirHandler(satuMapel) }>
                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                ) : ('')}

                                {this.state.status === 'KOSONG' ? (
                                    <td>
                                        <div className='col'>
                                            <div className='my-2 d-flex flex justify-content-center'>
                                                <button type="submit" className="btn btn-danger px-3" onClick={() => this.clickedTidakHadirHandler(satuMapel)}>
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                ) : ('')}

                                <td>
                                    <div className='col'>
                                        <div className='my-2 d-flex flex justify-content-center'>
                                            <a className="button button-outline" onClick={() => this.lihatLog(satuMapel.idLog)}>
                                                Pilih
                                            </a>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        </tbody>


                    </table>
                </div>

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
                {this.state.errorMessage ? (<ErrorNotification text="Submisi Gagal!" />) : ("")}

            </div>
        );
    }
}

export default ListLogPengajarTerpilih;
