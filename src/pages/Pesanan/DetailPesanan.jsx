import React, { Component, useState, useEffect } from "react";

import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';



class ListPesanan extends Component {
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
            idJadwal:0,
            idStaff:0,
            namaPengajar: '',
        }

        this.viewPesanan = this.viewPesanan.bind(this);
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
                console.log(res.data)
                this.setState({
                    idStaff: res.data.result[0].idStaff,
                    
                });
                // console.log(this.state.idStaff);
                PesananService.getUserByIdStaff(this.state.idStaff).then((res) => {
                    console.log(res.data)
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




    render() {
        return (
            <div className='outer'>


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
                                <tr>
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

export default ListPesanan;
