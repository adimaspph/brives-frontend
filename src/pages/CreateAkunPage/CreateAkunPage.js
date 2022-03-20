import React from "react";

import "./CreateAkunPage.css";

function CreateAkunPage() {
    const handleChange = async (e) => {
        alert("yeah");
    };

	return (
        <div className="akun-container">
            <div className="">
                <ul class="breadcrumb">
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
                            <form onSubmit={handleChange}>
                                <div>
                                    <label htmlFor="">Role<span className='star'>*</span> </label>
                                    <select name="role" id="role">
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="PENGAJAR">PENGAJAR</option>
                                        <option value="STAF_KEUANGAN">STAF_KEUANGAN</option>
                                        <option value="STAF_OPERASIONAL">STAF_OPERASIONAL</option>
                                        <option value="MANAGER">MANAGER</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Username<span className='star'>*</span> </label>
                                    <input type="text" name="username" className='form-control' required />
                                </div>
                                <div>
                                    <label htmlFor="">Nama Lengkap<span className='star'>*</span> </label>
                                    <input type="text" name="namaLengkap" className='form-control' required />
                                </div>
                                <div className="two-blocks">
                                    <div>
                                        <label htmlFor="">Nomor Pegawai<span className='star'>*</span> </label>
                                        <input type="text" name="nomorPegawai" className='form-control' required />
                                    </div>
                                    <div>
                                        <label htmlFor="">Nomor Handphone<span className='star'>*</span> </label>
                                        <input type="text" name="nomorHP" className='form-control' required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Email<span className='star'>*</span> </label>
                                    <input type="text" name="email" className='form-control' required />
                                </div>
                                <div className="two-blocks">
                                    <div>
                                        <label htmlFor="">Password<span className='star'>*</span> </label>
                                        <input type="text" name="password" className='form-control' required />
                                    </div>
                                    <div>
                                        <label htmlFor="">Konfirmasi Password<span className='star'>*</span> </label>
                                        <input type="text" name="konfirmasiPassword" className='form-control' required />
                                    </div>
                                </div>
                                <div className='box-right'>
                                    <button type="submit" className="twobutton btn btn-blue">Simpan</button>
                                    <a className="twobutton btn btn-outline-blue ">
                                        Kembali
                                    </a>
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