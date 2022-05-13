import React, { Component } from 'react';
import PenggunaService from '../../services/PenggunaService';
import "./ViewProfilePage";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';



class ViewProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idUser: this.props.match.params.idUser,
            username: '',
            namaLengkap: '',
            email: '',
            noHP: '',
            idStaff: '',
            noPegawai: null,
            namaRole: JSON.parse(localStorage.getItem("user")).role,
            tarif: null,
            listMapel: [],
            idRole: '',

        }

    }


    componentDidMount() {
        PenggunaService.getAuthenticatedUser().then((res) => {
            let pengguna = res.data;
            this.setState({
                idUser: pengguna.result.idUser,
                username: pengguna.result.username,
                namaLengkap: pengguna.result.namaLengkap,
                email: pengguna.result.email,
                noHP: pengguna.result.noHP,
                idStaff: pengguna.result.staff.idStaff,
                noPegawai: pengguna.result.staff.noPegawai,
                tarif: pengguna.result.staff.tarif,
                listMapel: pengguna.result.staff.listMapel,

            });
        });

        PenggunaService.getRolePengguna(this.state.idUser).then((res) => {
            let pengguna = res.data;
            this.setState({
                // namaRole: pengguna.result.namaRole,
                idRole: pengguna.result.idRole,

            });
        });



    }


    cancel() {
        this.props.history.push('/atur-mapel');
    }


    render() {
        return (
            <div className='outer'>

                <h2>Profil Saya </h2>
                <div className='tes'>
                    <div className=''>
                        <div className='row'>
                            <div className='cardd'>
                                <div className='card-body'>
                                    <table className='table-none'>
                                        <tr>
                                            <td>IdUser</td>
                                            <td>{this.state.idUser}</td>
                                        </tr>
                                        <tr>
                                            <td>Nama Lengkap</td>
                                            <td>{this.state.namaLengkap}</td>
                                        </tr>
                                        <tr>
                                            <td>Username</td>
                                            <td>{this.state.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{this.state.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Nomor Handphone</td>
                                            <td>{this.state.noHP}</td>
                                        </tr>
                                        <tr>
                                            <td>Id Staff</td>
                                            <td>{this.state.idStaff}</td>
                                        </tr>
                                        <tr>
                                            <td>Nomor Pegawai</td>
                                            <td>{this.state.noPegawai}</td>
                                        </tr>
                                        <tr>
                                            <td>Role</td>
                                            <td>{this.state.namaRole}</td>
                                        </tr>
                                    </table>

                                    <hr />

                                    {this.state.idRole === 2 ? (<div>
                                            <p> Tarif = {this.state.tarif}</p>
                                            <p>List Mata Pelajaran = </p>
                                            <ul>
                                                {
                                                    this.state.listMapel.map(
                                                        satuJenjang =>
                                                            <li>{satuJenjang.namaMapel}</li>
                                                    )
                                                }
                                            </ul>

                                        </div>
                                    ) : ("")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// let ViewProfilePage;
export default ViewProfilePage;
