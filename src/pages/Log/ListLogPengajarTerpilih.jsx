import React, { Component, useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import LogService from '../../services/LogService';
import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';
import NeutralNotification from '../../components/Notification/NeutralNotification';



class ListLogPengajarTerpilih extends Component {
    constructor(props) {
        super(props)
        this.state = {
            log: [],
            idStaff: this.props.match.params.idStaff,
            namaPengajar: '',
            status: 'KOSONG',
            
        }

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
        LogService.getLogByStatusKehadiranSatuPengajar(this.state.idStaff, "KOSONG").then((res) => {
            this.setState({
                log: res.data.result,
            });

            PesananService.getUserByIdStaff(this.state.idStaff).then((res) => {
                this.setState({
                    namaPengajar: res.data.result[0].namaLengkap,
                });

            });


        });


    }

    handleRoleChange = (event) => {
        this.setState({ status: event.target.value });
        LogService.getLogByStatusKehadiranSatuPengajar(this.state.idStaff, event.target.value).then((res) => {
            this.setState({ log: res.data.result });

        });
    };

    lihatLog(idLog) {
        this.props.history.push(generatePath("/log/:idLog", { idLog }));

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

                <h2 className=''>Daftar Log</h2>

                <div className='space'>
                    <h5 className=''>Pengajar : {this.state.namaPengajar}</h5>
                    <div className='d-flex flex-row'>
                        <p className="p-2 align-self-end">Pilih Status: </p>
                        <select onChange={this.handleRoleChange} name="role" id="role" className='twobutton'>
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
                                <tr>
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
                                                    <button type="button" class="btn btn-success px-3">
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    ) :('')}

                                    {this.state.status === 'KOSONG' ? (
                                        <td>
                                            <div className='col'>
                                                <div className='my-2 d-flex flex justify-content-center'>
                                                    <button type="button" class="btn btn-danger px-3">
                                                        <i class="fa fa-times" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    ) :('')}

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

            </div>
        );
    }
}

export default ListLogPengajarTerpilih;
