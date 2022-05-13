import React, { Component, useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';
import NeutralNotification from '../../components/Notification/NeutralNotification';



class ListLogPengajarTerpilih extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesanan: [],
            idStaff: this.props.match.params.idStaff,
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
            namaPengajar: '',
        }

    }


    render() {
        return (
            <div className='outer'>

                <ul class="breadcrumb">
                    <li>
                        <a href="/log-pengajar">Pilih Pengajar</a>
                    </li>
                    <li className="bractive">Log Pengajar</li>
                </ul>

                <h1 className=''>Daftar Log</h1>

                <div className='space'>
                    <h4 className=''>Pengajar {this.state.idStaff}</h4>
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
                                <th className='text-center' scope='col'>Hadir</th>
                                <th className='text-center' scope='col'>Tidak Hadir</th>
                                <th className='text-center' scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                        </tbody>


                    </table>
                </div>

            </div>
        );
    }
}

export default ListLogPengajarTerpilih;
