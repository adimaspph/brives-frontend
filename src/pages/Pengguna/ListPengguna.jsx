import React, { Component } from 'react';
import PenggunaService from '../../services/PenggunaService';
import "./ListPengguna.css";
import { generatePath } from 'react-router-dom';



class ListPengguna extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pengguna: [],
            number: 1,
        }

        this.addPengguna = this.addPengguna.bind(this);
        this.editPengguna = this.editPengguna.bind(this);
    }

    editPengguna(idUser) {
        this.props.history.push(generatePath("/pengguna/:idUser", { idUser }));

    }

    componentDidMount() {
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

    render() {
        return (
            <div>

                <h2 className='text-center'>Daftar Pengguna</h2>

                <div className='twobutton'>
                    <select onChange={this.handleRoleChange} name="role" id="role">
                        <option value="1">ADMIN</option>
                        <option value="2">PENGAJAR</option>
                        <option value="3">STAF_KEUANGAN</option>
                        <option value="4">STAF_OPERASIONAL</option>
                        <option value="5">MANAGER</option>
                    </select>

                    <a className="btn btn-blue" onClick={this.addPengguna}>
                        Tambah Pengguna
                    </a>
                </div>

                <div className='row'>
                    <table className='table'>
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
                                                <a className="btn btn-blue" onClick={() => this.editPengguna(satuMapel.idUser)}>
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
