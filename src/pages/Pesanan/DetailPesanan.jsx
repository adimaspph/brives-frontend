import React, { Component, useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';
import NeutralNotification from '../../components/Notification/NeutralNotification';



class DetailPesanan extends Component {
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
            isClickedAddLink: false,
            isClickedUpdateLink: false,
            isClickedTolakPesanan: false,
            successAdd: false,
            successUpdate: false,
            isTolak: false,
        }

        this.viewPesanan = this.viewPesanan.bind(this);
        this.handleCancelAddLink = this.handleCancelAddLink.bind(this);
        this.saveAddLink = this.saveAddLink.bind(this);
        this.saveUpdateLink = this.saveUpdateLink.bind(this);
    }

    viewPesanan(idPesanan) {
        this.props.history.push(generatePath("/pesanan/:idPesanan", { idPesanan }));

    }

    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if (JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL') {
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
                // console.log(this.state.idStaff);
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

    addLink = (event) => {
        this.setState({ isClickedAddLink: true });
    };

    updateLink = (event) => {
        this.setState({ isClickedUpdateLink: true });
    };

    clickedtTolakPesanan = (event) => {
        this.setState({ isClickedTolakPesanan: true });
    };


    handleCancelAddLink(idPesanan) {
        this.setState({ isClickedAddLink: false });

    }

    handleCancelUpdateLink(idPesanan) {
        this.setState({ isClickedUpdateLink: false });

    }

    handleCancelTolak(idPesanan) {
        this.setState({ isClickedTolakPesanan: false });

    }

    changeLinkZoomBaruHandler = (event) => {
        this.setState({ linkZoomBaru: event.target.value });

    }

    tolakPesanan = (event) => {
        event.preventDefault();

        let status = { idStatusPesanan: 7, jenisStatus: "Dibatalkan" }
        PesananService.updateStatusPesanan(status, this.state.idPesanan).then(res => {
        });

        this.demoTolak(this.state.idJadwal);

    }

    saveAddLink = (event) => {
        event.preventDefault();

        PesananService.getStaffByIdJadwal(this.state.idJadwal).then((res) => {
            let jadwal = { linkZoom: this.state.linkZoomBaru, staff: res.data.result[0] };
            PesananService.updateLinkZoomJadwal(jadwal, this.state.idJadwal).then(res => {
                let status = { idStatusPesanan: 5, jenisStatus: "Dijadwalkan" }
                PesananService.updateStatusPesanan(status, this.state.idPesanan).then(res => {
                    this.demoSave(this.state.idJadwal);
                });
            });

        });

    }

    saveUpdateLink = (event) => {
        event.preventDefault();
        let jadwal = { linkZoom: this.state.linkZoomBaru };
        PesananService.updateLinkZoomJadwal(jadwal, this.state.idJadwal).then(res => {
            this.demoUpdate(this.state.idJadwal);
        });



    }

    async demoSave(idPesanan) {
        this.setState({ successAdd: true });
        await this.sleep(1500);
        window.location.reload();
        // this.props.history.push(generatePath("/pesanan/:idPesanan", { idPesanan }));

    }

    async demoUpdate(idPesanan) {
        this.setState({ successUpdate: true });
        await this.sleep(1500);
        window.location.reload();
        // this.props.history.push(generatePath("/pesanan/:idPesanan", { idPesanan }));


    }

    async demoTolak(idPesanan) {
        this.setState({ isTolak: true });
        await this.sleep(1500);
        window.location.reload();
        // this.props.history.push(generatePath("/pesanan/:idPesanan", { idPesanan }));

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    render() {
        return (
            <div className='outer'>

                <Modal
                    show={this.state.isClickedAddLink}
                    modalTitle="Tambah Link Zoom"
                >
                    <form action="" onSubmit={this.saveAddLink}>
                        <div className='form-group'>
                            <label htmlFor="">Link Zoom <span className='star'>*</span> </label>
                            <input type="text" className='form-control'
                                value={this.state.linkZoomBaru} onChange={this.changeLinkZoomBaruHandler} required />
                        </div>
                        <div className='modalButtonContainer'>
                            <div className="button button-outline-blue" onClick={() => this.handleCancelAddLink(this.state.idPesanan)}>
                                Kembali
                            </div>
                            <button type="submit" className="button button-blue">Simpan</button>
                        </div>
                    </form>
                </Modal>

                <Modal
                    show={this.state.isClickedUpdateLink}
                    modalTitle="Update Link Zoom"
                >
                    <form action="" onSubmit={this.saveUpdateLink}>
                        <div className='form-group'>
                            <label htmlFor="">Link Zoom <span className='star'>*</span> </label>
                            <input type="text" className='form-control'
                                value={this.state.linkZoomBaru} onChange={this.changeLinkZoomBaruHandler} required />
                        </div>
                        <div className='modalButtonContainer'>
                            <div className="button button-outline-blue" onClick={() => this.handleCancelUpdateLink(this.state.idPesanan)}>
                                Kembali
                            </div>
                            <button type="submit" className="button button-blue">Simpan</button>
                        </div>
                    </form>
                </Modal>


                <Modal
                    show={this.state.isClickedTolakPesanan}
                    handleCloseModal={this.handleCancel}
                    modalTitle="Konfirmasi"
                >
                    <p>Apakah Anda yakin akan menolak pesanan ini?</p>
                    <div className="modalButtonContainer">

                        <div className="button button-outline" onClick={() => this.handleCancelTolak(this.state.idPesanan)}>
                            Kembali
                        </div>

                        <div className="button button-primary" onClick={this.tolakPesanan}>
                            Tolak
                        </div>
                    </div>


                </Modal>

                {this.state.successAdd ? (<NeutralNotification text="Link Meeting Berhasil Ditambahkan!" />) : ("")}
                {this.state.successUpdate ? (<NeutralNotification text="Link Meeting Berhasil Diubah!" />) : ("")}
                {this.state.isTolak ? (<NeutralNotification text="Pesanan Berhasil Ditolak!" />) : ("")}


                <ul class="breadcrumb">
                    <li><a href="/pesanan">Daftar Pesanan</a></li>
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
                                    <div className=" flex-row">
                                        {this.state.status === 'Terverifikasi' ? (<div><a className="button button-blue" onClick={this.addLink}>Tambah Link </a></div>) : (<td>{this.state.linkZoom}</td>)}
                                        {this.state.status === 'Dijadwalkan' ? (<td><a className="button button-blue" onClick={this.updateLink}>Update Link </a></td>) : (<td>{this.state.linkZoom}</td>)}
                                    </div>
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

                            {this.state.status === 'Belum Dibayar' ? (<div className='center'>
                                <button onClick={this.clickedtTolakPesanan} type="submit" className="button button-primary twobutton">Tolak Pesanan</button>
                            </div>) : ('')}

                        </div>
                    </div>
                </div>

                <h4>Detail Pemesan</h4>

                <div className=''>
                    <div className='card-max-width'>
                        <div className='card-content'>

                            <table className='table-none'>
                                <tr>
                                    <td>Nama Lengkap</td>
                                    <td>{this.state.namaSiswa}</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>{this.state.usernameSiswa}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.emailSiswa}</td>
                                </tr>
                                <tr>
                                    <td>Nomor HP</td>
                                    <td>{this.state.nomorHpSiswa}</td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailPesanan;
