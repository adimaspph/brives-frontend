import React, { Component } from 'react';
import PenggunaService from '../../services/PenggunaService';
import "./DetailPengguna";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';



class DetailPengguna extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idUser: this.props.match.params.idUser,
            username: '',
            namaLengkap: '',
            email: '',
            password: '',
            noHP: '',
            idStaff: '',
            noPegawai: null,
            tarif: null,
            listMapel: [],
            namaRole: '',
            idRole: '',

        }

    }


    componentDidMount() {
        PenggunaService.getPenggunaById(this.state.idUser).then((res) => {
            let pengguna = res.data;
            this.setState({
                username: pengguna.result.username,
                namaLengkap: pengguna.result.namaLengkap,
                email: pengguna.result.email,
                password: pengguna.result.password,
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
                namaRole: pengguna.result.namaRole,
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

                <ul class="breadcrumb">
                    <li><a href="/pengguna">Daftar Pengguna</a></li>
                    <li className='bractive'>Detail Pengguna</li>
                </ul>


                <h2>Detail Pengguna </h2>
                <div className='tes'>
                    <div className='container'>
                        <div className='row'>
                            <div className='card'>
                                <div className='card-body'>

                                    <p>IdUser = {this.state.idUser}</p>
                                    <p>Nama Lengkap = {this.state.namaLengkap}</p>
                                    <p>Username = {this.state.username}</p>
                                    <p>Email = {this.state.email}</p>
                                    <p>Password = {this.state.password}</p>
                                    <p>Nomor Handphone = {this.state.noHP}</p>
                                    <p>Id Staff = {this.state.idStaff}</p>
                                    <p>Nomor Pegawai = {this.state.noPegawai}</p>
                                    <p>Role = {this.state.namaRole}</p>

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


                                    <a className="btn btn-outline-blue twobutton">
                                        Hapus
                                    </a>
                                    <a className="btn btn-blue twobutton">
                                        Ubah
                                    </a>





                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailPengguna;
