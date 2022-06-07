import React, { Component } from 'react';
import PenggunaService from '../../services/PenggunaService';
import "./ListPengguna";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import Modal from "../../components/Modal/Modal";



class DetailPengguna extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idUser: this.props.match.params.idUser,
            username: '',
            namaLengkap: '',
            email: '',
            noHP: '',
            idStaff: '',
            link: '',
            noPegawai: null,
            tarif: null,
            listMapel: [],
            namaRole: '',
            idRole: '',
            idUserReal: null,
            modal: false,
            successM: false,
            errorM: false,

        }

    }

    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if (JSON.parse(localStorage.getItem("user")).role === 'ADMIN') {
            } else {
                this.props.history.push('/403');
            }
        } else {

            this.props.history.push('/login');
        }

        PenggunaService.getPenggunaById(this.state.idUser).then((res) => {
            let pengguna = res.data;
            this.setState({
                username: pengguna.result.username,
                namaLengkap: pengguna.result.namaLengkap,
                email: pengguna.result.email,
                noHP: pengguna.result.noHP,
                idStaff: pengguna.result.staff.idStaff,
                noPegawai: pengguna.result.staff.noPegawai,
                tarif: pengguna.result.staff.tarif,
                listMapel: pengguna.result.staff.listMapel,
                idUserReal: pengguna.result.idUser,
                link: pengguna.result.staff.urlFoto,

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

    handleCancel = (event) => {
        event.preventDefault();
        this.setState({ modal: false });
    };

    popup = (event) => {
        event.preventDefault();
        this.setState({ modal: true });
    };

    hapusPengguna = (event) => {
        event.preventDefault();

        PenggunaService.hapusUser(this.state.idUser).then((res) => {
            let mapell = res.data;

            if (mapell.status === 400) {
                this.setState({ errorM: true });

                this.setState({ statusNama: 400 });
            } else if (mapell.status === 200) {

                this.demo();

            }
        });
    };

    async demo() {
        this.setState({ successM: true });
        await this.sleep(2000);
        this.props.history.push('/pengguna');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    render() {
        return (
            <div className='outer'>
                {this.state.errorM ? (<ErrorNotification text="Pengguna gagal dihapus karena terdapat mata pelejaran yang masih ada!" />) : ("")}
                {this.state.successM ? (<NeutralNotification text="Pengguna berhasil dihapus!" />) : ("")}

                <Modal
                    show={this.state.modal}
                    handleCloseModal={this.handleCancel}
                    modalTitle="Konfirmasi"
                >
                    <p>Apakah Anda yakin akan menghapus pengguna ini?</p>
                    <div className="modalButtonContainer">

                        <div className="button button-outline" onClick={this.handleCancel}>
                            Kembali
                        </div>

                        <div className="button button-primary" onClick={this.hapusPengguna}>
                            Hapus
                        </div>
                    </div>


                </Modal>

                <ul class="breadcrumb">
                    <li><a href="/pengguna">Daftar Pengguna</a></li>
                    <li className='bractive'>Detail Pengguna</li>
                </ul>


                <h2>Detail Pengguna </h2>
                <div className='tes'>
                    <div className=''>
                        <div className='row'>
                            <div className='cardd'>
                                <div className='card-body'>

                                    <table className='table-none'>
                                        <tr>    
                                            <td><img src={this.state.link}  ></img></td>
                                        </tr>
                                        <tr>
                                            <td>Id User</td>
                                            <td >{this.state.idUserReal}</td>
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

                                        {this.state.idRole === 2 ? (
                                            <tr>
                                                <td>Tarif</td>
                                                <td>{this.state.tarif}</td>
                                            </tr>


                                        ) : ("")}

                                        {this.state.idRole === 2 ? (
                                            <tr>
                                                <td>List Mata Pelajaran</td>
                                                <td>{
                                                    this.state.listMapel.map(
                                                        satuJenjang =>
                                                            <li>{satuJenjang.namaMapel}</li>
                                                    )
                                                }</td>
                                            </tr>


                                        ) : ("")}

                                    </table>

                                    <hr />

                                    <div className='center'>
                                        <a className="button button-outline-blue twobutton" onClick={this.popup}>
                                            Hapus
                                        </a>
                                        <a className="button button-blue twobutton" >
                                            Ubah
                                        </a>
                                    </div>
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
