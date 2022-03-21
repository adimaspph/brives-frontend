import { list } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import APIConfig from "../../api/APIConfig";
import "./CreateAkunPage.css";

function CreateAkunPage() {
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [nomorPegawai, setNomorPegawai] = useState("");
    const [nomorHP, setNomorHP] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
    const [tarif, setTarif] = useState("0");
    const [listMapel, setListMapel] = useState([]);
    const [allMapel, setAllMapel] = useState({
        status: 200,
        message: "success",
        result: [],
    });

    const handleChange = async (e) => {
        APIConfig.post("/api/v1/user/create", {
			username: username,
			namaLengkap: namaLengkap,
            email: email,
            password: password,
            nomorHP: nomorHP,
            role: role,
            nomorPegawai: nomorPegawai,
            tarif: tarif,
            listMapel: listMapel
		})
        .then((response) => {
            alert(response)
            console.log(response);
		});
    }

    useEffect(() => {
        APIConfig.get("/mapel/")
        .then((response) => {
            setAllMapel(response.data);
		});
    });

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleNamaLengkapChange = (e) => {
        setNamaLengkap(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleKonfirmasiPasswordChange = (e) => {
        setKonfirmasiPassword(e.target.value);
    }

    const handleNomorHPChange = (e) => {
        setNomorHP(e.target.value);
    }

    const handleNomorPegawaiChange = (e) => {
        setNomorPegawai(e.target.value);
    }
    const handleTarifChange = (e) => {
        setTarif(e.target.value);
    }

	return (
        <div className="akun-container">
            <div className="">
                <ul className="breadcrumb">
                    <li><a href="/atur-mapel">Daftar Pengguna</a></li>
                    <li className='bractive'>Tambah Pengguna</li>
                </ul>
                <div className="create-akun-content">
                    <div>
                        <h2>Tambah Pengguna</h2>
                    </div>
                    <div className="akun-card">
                        <h3>Formulir Tambah Pengguna</h3>
                        <div>
                            <form>
                                <div>
                                    <label htmlFor="">Role<span className='star'>*</span> </label>
                                    <select onChange={handleRoleChange} name="role" id="role">
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="PENGAJAR">PENGAJAR</option>
                                        <option value="STAF_KEUANGAN">STAF_KEUANGAN</option>
                                        <option value="STAF_OPERASIONAL">STAF_OPERASIONAL</option>
                                        <option value="MANAGER">MANAGER</option>
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
                                        <input onChange={handleNomorPegawaiChange} type="text" name="nomorPegawai" className='form-control' required />
                                    </div>
                                    <div>
                                        <label htmlFor="">Nomor Handphone<span className='star'>*</span> </label>
                                        <input onChange={handleNomorHPChange} type="text" name="nomorHP" className='form-control' required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Email<span className='star'>*</span> </label>
                                    <input onChange={handleEmailChange} type="email" name="email" className='form-control' required />
                                </div>
                                <div className="two-blocks">
                                    <div>
                                        <label htmlFor="">Password<span className='star'>*</span> </label>
                                        <input onChange={handlePasswordChange} type="password" name="password" className='form-control' required />
                                    </div>
                                    <div>
                                        <label htmlFor="">Konfirmasi Password<span className='star'>*</span> </label>
                                        <input onChange={handleKonfirmasiPasswordChange} type="password" name="konfirmasiPassword" className='form-control' required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Tarif<span className='star'>*</span> </label>
                                    <input onChange={handleTarifChange} type="text" name="tarif" className='form-control'  />
                                </div>
                                <div>
                                    <label htmlFor="">Mata Pelajaran<span className='star'>*</span> </label>
                                    {allMapel?.result.map((mapel) => (
                                        <div className='checkbox-mapel' key={mapel.namaMapel}>
                                            <input onChange={(e)=> {
                                                if (e.target.checked) {
                                                    setListMapel([...listMapel,mapel.namaMapel,]);
                                                  } else {
                                                    // remove from list
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
                                <div className='box-right'>
                                    <button onClick={handleChange} type="submit" className="twobutton btn btn-blue">Simpan</button>
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