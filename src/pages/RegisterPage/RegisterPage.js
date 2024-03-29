import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import APIConfig from "../../api/APIConfig";
import "./RegisterPage.css";
import Footer from "../../components/Footer/Footer";

function RegisterPage() {
    const [errMessage, setErrMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);
    const [notAvailable, setNotAvailable] = useState(false);
    const [role, setRole] = useState("PELAJAR");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [asalSekolah, setAsalSekolah] = useState("");
    const [noHP, setNoHP] = useState("");
    const [email, setEmail] = useState("");
    const [listJenjang, setListJenjang] = useState([]);
    const [jenjang, setJenjang] = useState("8 SMP");
    const [data, setAllMapel] = useState({
        status: 0,
        message: "",
        result: [],
    });

    const eye = <FontAwesomeIcon icon={faEye} />;

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const handleJenjangChange = (e) => {
        e.preventDefault();
        setJenjang(e.target.value);
    }

    const handleUsernameChange = (e) => {
        e.preventDefault();
        setNotAvailable(false);
        setUsername(e.target.value)
        console.log(e.target.value)
        APIConfig.get("/api/v1/user/check/"+e.target.value).then((res) => {
            if (res.data.status == 999) {
                setNotAvailable(true);
            } else {
                setNotAvailable(false);
            }
        });
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
        APIConfig.get("/jenjang/").then((res) => {
            setListJenjang(res.data.result);
        });
    });

    const handleChange = async (e) => {
        e.preventDefault();

        console.log(jenjang);
        APIConfig.post("/api/v1/user/create/akun", {
			username: username,
			jenjang: jenjang,
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
                setTimeout(
                    function() {
                        window.location.href = '/login';
                    }
                    .bind(this),
                    1500
                );
            }
		});
    }

    return (
        <div className="">
            <Navbar></Navbar>
            {hasError&&hasSubmit? (<ErrorNotification text={errMessage}/>) : ("")}
            {!hasError&&hasSubmit? (<NeutralNotification text="Akun berhasil terbuat"/>) : ("")}
            <div className="page-container">
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
                                    {/* {notAvailable? (<p>Username tidak tersedia</p>) : (<p>Username tersedia</p>)} */}
                                </div>
                                <div>
                                    <label htmlFor="">Jenjang<span className='star'>*</span> </label>
                                    <select onChange={handleJenjangChange} name="jenjang" id="jenjang">
                                        {
                                            listJenjang.map(
                                                satuJenjang =>
                                                    <option value={satuJenjang.id}>{satuJenjang.namaJenjang}</option>
                                            )
                                        }

                                    </select>
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
                                    <a className="button button-outline-blue twobutton" onClick={cancel}>Kembali</a>
                                    <button type="submit" className="twobutton button button-blue">Register</button>
                                </div>
                                
                            </form>
                            
                        </div>                     
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default RegisterPage;