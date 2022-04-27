import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import APIConfig from "../../api/APIConfig";
import "./CreateAkunPage.css";
import { Link } from 'react-router-dom';

function CreateAkunPage() {
    const [errMessage, setErrMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [pengajarShown, setPengajarShown] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);
    const [role, setRole] = useState("ADMIN");
    const [username, setUsername] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [noPegawai, setNoPegawai] = useState("");
    const [noHP, setNoHP] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tarif, setTarif] = useState("0");
    const [listMapel, setListMapel] = useState([]);
    const [allMapel, setAllMapel] = useState({
        status: 200,
        message: "success",
        result: [],
    });
    
    const eye = <FontAwesomeIcon icon={faEye} />;

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleChange = async (e) => {
        e.preventDefault();
        setHasError(false);

        if (!(role === "PENGAJAR")) {
            setListMapel([]);
            setTarif(0);
        }         

        APIConfig.post("/api/v1/user/create", {
			username: username,
			namaLengkap: namaLengkap,
            email: email,
            password: password,
            noHP: noHP,
            role: role,
            noPegawai: noPegawai,
            tarif: tarif,
            listMapel: listMapel
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
                        window.location.href = '/pengguna'; 
                    }
                    .bind(this),
                    2000
                );
                
            }
		});
    }


    useEffect(() => {
        // otentikasi
        if (localStorage.getItem("user") != null) {
            if(!(JSON.parse(localStorage.getItem("user")).role === 'ADMIN')) {
                window.location='/403';
            }
        } else {
            window.location='/login';
        }

        // hit api mapel
        APIConfig.get("/mapel/")
        .then((response) => {
            setAllMapel(response.data);
		});
    });

    const handleRoleChange = (e) => {
        e.preventDefault();
        setRole(e.target.value);
        if (e.target.value === "PENGAJAR") {
            setPengajarShown(true);
        } else {
            setPengajarShown(false);
        }
    }

    const handleUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handleNamaLengkapChange = (e) => {
        e.preventDefault();
        setNamaLengkap(e.target.value);
    }

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        
    }

    const handleNoHPChange = (e) => {
        e.preventDefault();
        setNoHP(e.target.value);
    }

    const handleNoPegawaiChange = (e) => {
        e.preventDefault();
        setNoPegawai(e.target.value);
    }
    const handleTarifChange = (e) => {
        e.preventDefault();
        setTarif(e.target.value);
    }

    const cancel = (e) => {
        window.location='/pengguna';
    }

	return (
        <div className="akun-container outer">
            <div className="">
                <ul className="breadcrumb">
                    <li><Link to="/pengguna">Daftar Pengguna</Link></li>
                    <li className='bractive'>Tambah Pengguna</li>
                </ul>
                <div className="create-akun-content">
                    <div>
                        <h2 className='judul-form'>Tambah Pengguna</h2>
                    </div>
                    <div className="akun-card">
                        <h3 className='judul-form'>Formulir Tambah Pengguna</h3>
                        {hasError&&hasSubmit? (<ErrorNotification text={errMessage}/>) : ("")}
                        {!hasError&&hasSubmit? (<NeutralNotification text="Akun berhasil terbuat"/>) : ("")}
                        <div>
                            <form onSubmit={handleChange}>
                                <div>
                                    <label htmlFor="">Role<span className='star'>*</span> </label>
                                    <select onChange={handleRoleChange} name="role" id="role">
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="PENGAJAR">PENGAJAR</option>
                                        <option value="STAF_KEUANGAN">STAF_KEUANGAN</option>
                                        <option value="STAF_OPERASIONAL">STAF_OPERASIONAL</option>
                                        <option value="MANAJEMEN">MANAGER</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Username<span className='star'>*</span> </label>
                                    <input onChange={handleUsernameChange} type="text" name="username" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">Nama Lengkap<span className='star'>*</span> </label>
                                    <input onChange={handleNamaLengkapChange} type="text" name="namaLengkap" className='form-control' required />
                                </div>
                                <div className="two-blocks">
                                    <div>
                                        <label htmlFor="">Nomor Pegawai<span className='star'>*</span> </label>
                                        <input onChange={handleNoPegawaiChange} type="text" name="noPegawai" className='form-control' required />
                                    </div>
                                    <div>
                                        <label htmlFor="">Nomor Handphone<span className='star'>*</span> </label>
                                        <input onChange={handleNoHPChange} type="text" name="noHP" className='form-control' required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Email<span className='star'>*</span> </label>
                                    <input onChange={handleEmailChange} type="email" name="email" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">Password<span className='star'>*</span> </label>
                                    <div className='d-flex flex justify-content-between'>
                                        <input id="create-pass" onChange={handlePasswordChange} type={passwordShown ? "text" : "password"} name="password" className='form-control' required />
                                        <i id="eyepas" onClick={togglePasswordVisiblity}>{eye}</i>
                                    </div>
                                    
                                </div>
                                {pengajarShown && 
                                <div>
                                    <div>
                                        <label htmlFor="">Tarif<span className='star'>*</span> </label>
                                        <input onChange={handleTarifChange} type="text" name="tarif" className='form-control' required />
                                    </div>
                                    <div>
                                        <label htmlFor="">Mata Pelajaran<span className='star'>*</span> </label>
                                        {allMapel?.result.map((mapel) => (
                                            <div className='checkbox-mapel' key={mapel.namaMapel}>
                                                <input onChange={(e)=> {
                                                    if (e.target.checked) {
                                                        setListMapel([...listMapel,mapel.namaMapel,]);
                                                    } else {
                                                        setListMapel(
                                                        listMapel.filter((mapel) => mapel !== mapel.namaMapel),
                                                        );
                                                    }
                                                    
                                                }} 
                                                type="checkbox" value={mapel.namaMapel} />
                                                {mapel.namaMapel}
                                            </div>
                                            
                                        ))}
                                    </div>
                                </div>}
                                <div className='box-right'>
                                <a className="button button-outline-blue twobutton" onClick={cancel}>
                                                Kembali
                                            </a>
                                    <button type="submit" className="twobutton button button-blue">Simpan</button>
                                </div>

                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
	);
}

export default CreateAkunPage;