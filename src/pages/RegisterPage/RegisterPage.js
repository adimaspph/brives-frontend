import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import APIConfig from "../../api/APIConfig";
import "./RegisterPage.css";
import { Link } from 'react-router-dom';

function RegisterPage() {
    const [errMessage, setErrMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);
    const [role, setRole] = useState("PELAJAR");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [asalSekolah, setAsalSekolah] = useState("");
    const [noHP, setNoHP] = useState("");
    const [email, setEmail] = useState("");
    const [data, setAllMapel] = useState({
        status: 0,
        message: "",
        result: [],
    });

    const eye = <FontAwesomeIcon icon={faEye} />;

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handleNamaLengkapChange = (e) => {
        e.preventDefault();
        setNamaLengkap(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleNoHPChange = (e) => {
        e.preventDefault();
        setNoHP(e.target.value);
    }

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    

    const handleAsalSekolahChange = (e) => {
        e.preventDefault();
        setAsalSekolah(e.target.value);
    }

    const cancel = (e) => {
        e.preventDefault();
        window.location='/login';
    }

    useEffect(() => {

    });

    const handleChange = async (e) => {
        e.preventDefault();
        APIConfig.post("/api/v1/user/create/akun", {
			username: username,
			namaLengkap: namaLengkap,
            email: email,
            password: password,
            noHP: noHP,
            asalSekolah: asalSekolah
		})
        .then((response) => {
            setHasSubmit(false);
            setHasError(false);
            setHasSubmit(true);
            if (response.data.status == 999) {
                setErrMessage(response.data.message);
                setHasError(true);
            } else {
                setTimeout(function(){}, 4000)
                console.log(response)
            }
		});
    }

    return (
        <div className="">
            <Navbar></Navbar>
            {hasError&&hasSubmit? (<ErrorNotification text={errMessage}/>) : ("")}
            {!hasError&&hasSubmit? (<NeutralNotification text="Akun berhasil terbuat"/>) : ("")}
            <div className="flex my-3">
                <div className='d-flex flex justify-content-center my-3'>
                    <h1>Register</h1>
                </div>
                <div className="register-card mb-3">
                    <div className='d-flex flex justify-content-center'>
                        <div className='justify-content-center my-2'>
                            <form onSubmit={handleChange}>
                                <div>
                                    <label htmlFor="">Nama Lengkap<span className='star'>*</span> </label>
                                    <input onChange={handleNamaLengkapChange} type="text" name="namaLengkap" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">Username<span className='star'>*</span> </label>
                                    <input onChange={handleUsernameChange} type="text" name="username" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">Email<span className='star'>*</span> </label>
                                    <input onChange={handleEmailChange} type="text" name="email" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">NoHP<span className='star'>*</span> </label>
                                    <input onChange={handleNoHPChange} type="text" name="noHP" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">Asal Sekolah<span className='star'>*</span> </label>
                                    <input onChange={handleAsalSekolahChange} type="text" name="asalSekolah" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">Password<span className='star'>*</span> </label>
                                    <div className='d-flex flex justify-content-between'>
                                        <input id="regis-pass" onChange={handlePasswordChange} type={passwordShown ? "text" : "password"} name="password" className='form-control' required />
                                        <i id="regiseye" onClick={togglePasswordVisiblity}>{eye}</i>
                                    </div>
                                    <p className='pass-constraint'>Gunakan minimal 8 karakter dengan campuran huruf, angka dan satu buah huruf kapital</p>
                                </div>
                                <div className='box-right mt-4'>
                                    <a className="btn btn-outline-blue twobutton" onClick={cancel}>Kembali</a>
                                    <button type="submit" className="twobutton btn btn-blue">Register</button>
                                </div>
                                
                            </form>
                            
                        </div>

                        
                        
                        
                    </div>
                    <div></div>
                </div>
            </div>
            {/* footer */}
            {/* <div className="footer">
                <div className="footer-menu">
                    <Link className="footer-logo" to="/">
                        <img src="/logo-navbar.png" width={60} alt="" />
                    </Link>
                    <p className="text-footer">BTA Group © 2022</p>
                </div>

            </div> */}
        </div>
    );
}

export default RegisterPage;