import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import APIConfig from "../../api/APIConfig";
import "./AkunPage.css";
import { generatePath } from 'react-router-dom';

class EditAkunPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            namaLengkap:"",
            asalSekolah:"",
            noHP:"",
            email:"",
            errMessage: "",
            passwordShown: false,
            pengajarShown: false,
            hasError: false,
            hasSubmit: false,
        }
        this.redirectUbahProfilPage = this.redirectUbahProfilPage.bind(this);
        this.redirectUbahPasswordPage = this.redirectUbahPasswordPage.bind(this);
    }
    
    redirectUbahProfilPage() {
        this.props.history.push("/akun/profil/edit");
    }
    redirectUbahPasswordPage () {
        this.props.history.push("/akun/profil/ganti-password");
    }
    componentDidMount() {
        APIConfig.get("/api/v1/user/auth/")
        .then((response) => {
            this.setState({ username: response.data.result.username })
            this.setState({ namaLengkap: response.data.result.namaLengkap })
            this.setState({ noHP: response.data.result.noHP })
            this.setState({ email: response.data.result.email })
            this.setState({ asalSekolah: response.data.result.siswa.asalSekolah })
        })
    };

    render() {
        return (
            <div className="">
                <Navbar></Navbar>
                <div className="jumbotron jumbotron-akun">
                    <div className='d-flex flex justify-content-center'>
                        <h1>Profil Saya</h1>
                    </div>
                    <div className=" mb-3">
                        <div className='d-flex flex justify-content-center'>
                            <div className='justify-content-center my-2'>
                            <div className='cardd'>
                                    <div className='card-body'>
                                        <table className='table-none'>
                                            <tr>
                                                <td><b>Username</b></td>
                                                <td></td>
                                                <td>{this.state.username}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Nama Lengkap</b></td>
                                                <td></td>
                                                <td>{this.state.namaLengkap}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td><b>Email</b></td>
                                                <td></td>
                                                <td>{this.state.email}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Nomor Handphone</b></td>
                                                <td></td>
                                                <td>{this.state.noHP}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Asal Sekolah</b></td>
                                                <td></td>
                                                <td>{this.state.asalSekolah}</td>
                                            </tr>
                                        </table>
                                        <hr />
                                        <div className='col'>
                                        <div className='d-flex flex justify-content-center my-3'>
                                                <a className="btn btn-outline" onClick={() => this.redirectUbahPasswordPage()}>
                                                    Ubah Profil
                                                </a>
                                            </div>
                                            <div className='d-flex flex justify-content-center my-3'>
                                                <a className="btn btn-outline" onClick={() => this.redirectUbahPasswordPage()}>
                                                    Ubah Password
                                                </a>
                                            </div>
                                            
                                            
                                        </div>
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

export default EditAkunPage;