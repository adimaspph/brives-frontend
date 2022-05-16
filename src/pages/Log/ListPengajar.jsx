import React, { Component } from 'react';
import PenggunaService from '../../services/PenggunaService';
import "./ListPengajar.css";
import { generatePath } from 'react-router-dom';
import searchIcon from "../../image/searchIcon.png"



class ListPengajar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pengguna: [],
            number: 1,
        }

        this.lihatPengguna = this.lihatPengguna.bind(this);
    }

    lihatPengguna(username) {
        this.props.history.push(generatePath("/log-pengajar/:username", { username }));

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
        PenggunaService.getPenggunaByRole(2).then((res) => {
            this.setState({ pengguna: res.data.result.listUser });
        });

    }

    myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    render() {
        return (
            <div className='outer'>

                <h1 className=''>Log Pengajar</h1>


                <div className='space'>
                    <h4 className=''>Tahap 1 - Pilih Pengajar</h4>
                    <div className="searchbox">
                        <input onKeyUp={this.myFunction} type="text" id="myInput" placeholder="Cari nama pengajar" />
                    </div>
                </div>



                <div className=''>
                    <table className='table-max table-none' id='myTable'>
                        <thead>
                            <tr className=''>
                                <th scope="col">No</th>
                                <th className='text-center' scope='col'>Nama Lengkap</th>
                                <th className='text-center' scope='col'>Username</th>
                                <th className='text-center' scope='col'>Email</th>
                                <th className='text-center' scope='col'>Nomor Pegawai</th>
                                <th className='text-center' scope='col'>Nomor Handphone</th>
                                <th className='text-center' scope='col'>Log</th>

                            </tr>
                        </thead>

                        <tbody>
                            {this.state.pengguna.map((satuMapel, index) => (
                                <tr key={satuMapel.idUser}>
                                    <td>{index + 1}</td>
                                    <td> {satuMapel.namaLengkap} </td>
                                    <td> {satuMapel.username} </td>
                                    <td> {satuMapel.email} </td>
                                    <td> {satuMapel.staff.noPegawai} </td>
                                    <td> {satuMapel.noHP} </td>
                                    <td>
                                        <div className='col'>
                                            <div className='my-2 d-flex flex justify-content-center'>
                                                <a className="button button-outline" onClick={() => this.lihatPengguna(satuMapel.staff.idStaff)}>
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

export default ListPengajar;
