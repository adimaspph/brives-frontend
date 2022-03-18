import React from "react";
import "./AkunPage.css";
import SearchIcon from '@mui/icons-material/Search';
import './stylesheet.css';
import { Form } from 'react-bootstrap';
import Button from "../../components/Button/Button";
function AkunPage() {
	return (
		<div className="jadwal-container">
			<h1>Daftar Pengguna</h1>
            <div className=""> 
                <div>
                    {/* <SearchIcon></SearchIcon> */}
                    <input className="searchbar" type="text" placeholder="Masukkan nama"></input>
                </div>
                <div className="formm">
                    <Form.Select aria-label="Default select example">
                        <option value="0">Semua Role</option>
                        <option value="1">Admin</option>
                        <option value="2">Pengajar</option>
                        <option value="3">Staf Operasional</option>
                        <option value="4">Staf Keuangan</option>
                        <option value="5">Pelajar</option>
                    </Form.Select>
                </div>
                <div>
                    <Button className="btn btn-primary" href="/akun/tambah">
                        Tambah akun
                    </Button>
                </div>
            </div>
            
        </div>
	);
}

export default AkunPage;