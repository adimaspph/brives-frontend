import React, { Component, useState, useEffect } from "react";

import PesananService from '../../services/PesananService';
import { generatePath } from 'react-router-dom';



class ListPesanan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesanan: [],
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
        PesananService.getPesanan().then((res) => {
            this.setState({ pesanan: res.data.result });
            console.log(res.data.result);
        });
    }


    getUsernamee(idSiswa) {
        // const {x} = await PesananService.getUserByIdSiswa(idSiswa);
        // var x = 'a';
        // PesananService.getUserByIdSiswa(idSiswa)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        // PesananService.getUserByIdSiswa(idSiswa).then((res) => {
            
        //     x = res.data.result[0].username;
        //     // console.log('request received:', request, response);
        //     // console.log(res.data.result[0].username);
        // });
        // return x;
    };



    render() {
        return (
            <div className='outer'>

                <h1 className=''>Daftar Pesanan</h1>
                <div>
                </div>

                <table className="table-max table-none">
                    <thead>
                        <tr>
                            <th scope="col">Tanggal Dibuat</th>
                            <th scope="col">Nomor Pesanan</th>
                            <th scope="col">Username Pemesan</th>
                            <th scope="col">Total Pesanan</th>
                            {/* <th scope="col">Pengajar</th> */}
                            <th scope="col">Tanggal Bimbel</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.pesanan.map(
                                SatuPesanan =>
                                    <tr key={SatuPesanan.idPesanan}>
                                        <td> {SatuPesanan.waktu_dibuat} </td>
                                        <td scope='row'> {SatuPesanan.idPesanan} </td>
                                        <td> {SatuPesanan.siswa.idSiswa} </td>
                                        {/* <td> {this.getUsernamee(SatuPesanan.siswa.idSiswa)} </td> */}
                                        <td> {SatuPesanan.nominal} </td>
                                        {/* <td> baru bisa id jadwal </td> */}
                                        <td> {SatuPesanan.jadwal.tanggal} </td>
                                        <td> {SatuPesanan.status.jenisStatus} </td>
                                        <td>
                                            <a className="btn btn-outline" onClick={() => this.viewPesanan(SatuPesanan.idPesanan)}>
                                                Lihat
                                            </a>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>



                </table>

            </div>
        );
    }
}

export default ListPesanan;
