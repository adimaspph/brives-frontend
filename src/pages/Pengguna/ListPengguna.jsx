import React, { Component } from 'react';
import PenggunaService from '../../services/PenggunaService';
import "./ListPengguna.css";
import { generatePath } from 'react-router-dom';
import searchIcon from "../../image/searchIcon.png"



class ListPengguna extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pengguna: [],
            number: 1,
            // q: [],
            // setQ: [],
        }

        this.addPengguna = this.addPengguna.bind(this);
        this.editPengguna = this.editPengguna.bind(this);
    }

    editPengguna(username) {
        this.props.history.push(generatePath("/pengguna/:username", { username }));

    }

    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            console.log(JSON.parse(localStorage.getItem("user")).role);
            if (JSON.parse(localStorage.getItem("user")).role === 'ADMIN') {
                console.log('staf op');
            } else {
                this.props.history.push('/403');
            }
        } else {
            this.props.history.push('/login');
        }
        console.log(this.state.number)
        PenggunaService.getPenggunaByRole(this.state.number).then((res) => {
            this.setState({ pengguna: res.data.result.listUser });
            console.log(res.data.result.listUser);
        });

    }

    addPengguna() {
        this.props.history.push('/akun/create');
    }

    handleRoleChange = (event) => {
        this.setState({ number: event.target.value });
        PenggunaService.getPenggunaByRole(event.target.value).then((res) => {
            this.setState({ pengguna: res.data.result.listUser });

        });
        console.log(this.state.number);
    };

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
            <div>

                <h2 className='text-center'>Daftar Pengguna</h2>
<div>
</div>

                <div className='space'>
                    <div className="searchbox">
                        {/* <img src={searchIcon} className="search-logo" alt="searchIcon" /> */}
                        <input onKeyUp={this.myFunction} type="text" id="myInput" placeholder="Cari nama pengguna" />
                    </div>

                    <select onChange={this.handleRoleChange} name="role" id="role" className='twobutton'>
                        <option value="1">ADMIN</option>
                        <option value="2">PENGAJAR</option>
                        <option value="6">STAF_KEUANGAN</option>
                        <option value="4">STAF_OPERASIONAL</option>
                        <option value="5">MANAGER</option>
                    </select>

                    <a className="btn btn-blue twobutton" onClick={this.addPengguna}>
                        + Tambah Pengguna
                    </a>
                </div>

                <div className='row'>
                    <table className='table' id='myTable'>
                        <thead>
                            <tr>
                                <th scope='col'>Id User</th>
                                <th scope='col'>Nama Lengkap</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Nomor Pegawai</th>
                                <th scope='col'>Nomor Handphone</th>
                                <th scope='col'>Action</th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.pengguna.map(
                                    satuMapel =>
                                        <tr key={satuMapel.idUser}>
                                            <td scope='row'> {satuMapel.idUser} </td>
                                            <td> {satuMapel.namaLengkap} </td>
                                            <td> {satuMapel.username} </td>
                                            <td> {satuMapel.email} </td>
                                            <td> {satuMapel.staff.noPegawai} </td>
                                            <td> {satuMapel.noHP} </td>
                                            <td>
                                                <a className="btn btn-outline" onClick={() => this.editPengguna(satuMapel.username)}>
                                                    Lihat
                                                </a>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>


                    </table>
                </div>

            </div>
        );
    }
}

export default ListPengguna;
