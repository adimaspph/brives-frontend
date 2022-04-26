import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import APIConfig from "../../api/APIConfig";
import "./AkunPage.css";
import { Link } from 'react-router-dom';

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
        this.handleNamaLengkapChange = this.handleNamaLengkapChange.bind(this);
        this.handleNoHPChange = this.handleNoHPChange.bind(this);
        this.handleAsalSekolahChange = this.handleAsalSekolahChange.bind(this);
    }
    
    redirectUbahProfilPage() {
        window.location="/akun/profil/edit";
        console.log("guemasuk")
    }
    redirectUbahPasswordPage () {
        this.props.history.push("/akun/profil/ganti-password");
    }
    componentDidMount() {
        // authentication
        if (localStorage.getItem("user") != null) {
            if(!(JSON.parse(localStorage.getItem("user")).role === 'PELAJAR')) {
                window.location='/403';
            }
        }

        APIConfig.get("/api/v1/user/auth/")
        .then((response) => {
            this.setState({ username: response.data.result.username })
            this.setState({ namaLengkap: response.data.result.namaLengkap })
            this.setState({ noHP: response.data.result.noHP })
            this.setState({ email: response.data.result.email })
            this.setState({ asalSekolah: response.data.result.siswa.asalSekolah })
        })
    };

    handleNamaLengkapChange = (e) => {
        e.preventDefault();
        this.setState({ namaLengkap: e.target.value })
    }

    handleNoHPChange = (e) => {
        e.preventDefault();
        this.setState({ noHP: e.target.value })
    }

    
    handleAsalSekolahChange = (e) => {
        e.preventDefault();
        this.setState({ asalSekolah: e.target.value })
    }

    cancel = (e) => {
        e.preventDefault();
        window.location='/akun/profil';
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ hasSubmit: false })
        this.setState({ hasError: false })
        this.setState({ hasSubmit: true })
        APIConfig.post("/api/v1/user/update/"+this.state.username, {
            username: this.state.username,
			namaLengkap: this.state.namaLengkap,
            email: this.state.email,
            password: "",
            noHP: this.state.noHP,
            asalSekolah: this.state.asalSekolah
        })
        .then((response) => {
            this.setState({ username: response.data.result.username })
            this.setState({ namaLengkap: response.data.result.namaLengkap })
            this.setState({ noHP: response.data.result.noHP })
            this.setState({ email: response.data.result.email })
            this.setState({ asalSekolah: response.data.result.siswa.asalSekolah })

            setTimeout(
                function() {
                    window.location.href = '/akun/profil';
                }
                .bind(this),
                2000
            );

            
        })
        .catch((error) => {
            this.setState({ hasError: true })
        })
    }

    render() {
        return (
            <div className="">
                {this.state.hasError&&this.state.hasSubmit? (<ErrorNotification text="Akun gagal diubah, silahkan coba lagi!"/>) : ("")}
                {!this.state.hasError&&this.state.hasSubmit? (<NeutralNotification text="Akun Anda berhasil diubah!"/>) : ("")}
                <Navbar></Navbar>
                <div className="jumbotron-akun">
                    <div className='d-flex flex justify-content-center'>
                        <h1>Edit Profil Saya</h1>
                    </div>
                    <div className=" mb-3">
                        <div className='d-flex flex justify-content-center'>
                            <div className='justify-content-center my-2'>
                                <div className='cardd'>
                                    <div className='card-body'>
                                        <form onSubmit={this.handleChange}>
                                            <div>
                                                <label htmlFor="">Username<span className='star'>*</span> </label>
                                                <input readOnly disabled value={this.state.username} onChange={this.handleUsernameChange} type="text" name="username" className='form-control' required />
                                            </div>
                                            <div>
                                                <label htmlFor="">Nama Lengkap<span className='star'>*</span> </label>
                                                <input value={this.state.namaLengkap} onChange={this.handleNamaLengkapChange} type="text" name="namaLengkap" className='form-control' required />
                                            </div>
                                            <div>
                                                <label htmlFor="">NoHP<span className='star'>*</span> </label>
                                                <input value={this.state.noHP} onChange={this.handleNoHPChange} type="text" name="noHP" className='form-control' required />
                                            </div>
                                            <div>
                                                <label htmlFor="">Asal Sekolah<span className='star'>*</span> </label>
                                                <input value={this.state.asalSekolah} onChange={this.handleAsalSekolahChange} type="text" name="asalSekolah" className='form-control' required />
                                            </div>
                                            <div className='box-right mt-4'>
                                                <a className="btn btn-outline-blue twobutton" onClick={this.cancel}>Kembali</a>
                                                <button type="submit" className="twobutton btn btn-blue">Update</button>
                                            </div>
                                        
                                        </form>
                                        
                                            
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