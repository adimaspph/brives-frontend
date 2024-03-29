import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import APIConfig from "../../api/APIConfig";
import { Link } from 'react-router-dom';

class EditPengguna extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.match.params.idUser,
            errMessage: "",
            passwordShown: false,
            pengajarShown: false,
            hasError: false,
            hasSubmit: false,
            role:"",
            namaLengkap: "",
            noPegawai: "",
            email: "",
            noHP: "",
            password:"",
            tarif:'0',
            listMapel: [],
            selectedMapel:[],
            listRole: ["ADMIN","PENGAJAR","STAF_KEUANGAN","STAF_OPERASIONAL","MANAJEMEN"],
            allMapel: {
                status: 200,
                message: "success",
                result: [],
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleNamaLengkapChange = this.handleNamaLengkapChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNoHPChange = this.handleNoHPChange.bind(this);
        this.handleNoPegawaiChange = this.handleNoPegawaiChange.bind(this);
        this.handleTarifChange = this.handleTarifChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange = async (e) => {
        e.preventDefault();
        this.setState({ hasError : false });  

        APIConfig.post("/api/v1/user/update/staf/" + this.state.username, {
			username: this.state.username,
			namaLengkap: this.state.namaLengkap,
            email: this.state.email,
            password: this.state.password,
            noHP: this.state.noHP,
            role: this.state.role,
            noPegawai: this.state.noPegawai,
            tarif: this.state.tarif,
            listMapel: this.state.listMapel
		})
        .then((response) => {
            this.setState({ hasSubmit : false });
            this.setState({ hasError : false });
            this.setState({ hasSubmit : true });
            if (response.data.status == 999) {
                this.setState({ errMessage : response.data.message });
                this.setState({ hasError : true });
            } else {
                setTimeout(
                    function() {
                        window.location.href = '/pengguna';
                    }
                    .bind(this),
                    1500
                );
            }
		});
    }


    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if(!(JSON.parse(localStorage.getItem("user")).role === 'ADMIN')) {
                window.location='/403';
            }
        } else {
            window.location='/login';
        }

        APIConfig.get("/mapel/")
        .then((response) => {
            this.setState({ allMapel : response.data });
		});

        APIConfig.get("/api/v1/user/"+this.state.username)
        .then((response) => {
            this.setState({ namaLengkap : response.data.result.namaLengkap });
            this.setState({ noPegawai : response.data.result.staff.noPegawai });
            this.setState({ noHP : response.data.result.noHP });
            this.setState({ email : response.data.result.email });
            this.setState({ tarif : response.data.result.staff.tarif });
            this.setState({ selectedMapel : response.data.result.staff.listMapel });

            this.state.selectedMapel.forEach(element => {
                this.setState({
                    listMapel: this.state.listMapel.concat(element.namaMapel)
                })
            });

           
        });

        APIConfig.get("/api/v1/user/role/" + this.state.username)
        .then((response) => {
            this.setState({ role : response.data.result.namaRole });
            if (this.state.role === "PENGAJAR") {
                this.setState({ pengajarShown: true })
            }
        });
    };

    handleRoleChange = (e) => {
        e.preventDefault();
        this.setState({ role : e.target.value });
        if (e.target.value === "PENGAJAR") {
            this.setState({ pengajarShown : true });
        } else {
            this.setState({ pengajarShown : false });
        }
    }

    handleNamaLengkapChange = (e) => {
        e.preventDefault();
        this.setState({ namaLengkap : e.target.value });
    }

    handleCheckBoxChange = async (e) => {
        const target = e.target;
        const value = target.checked
        const name = target.name;

        value ? 
        this.setState({
            listMapel: this.state.listMapel.concat([name])
        }) :
        this.setState({
            listMapel: this.state.listMapel.filter(mapel => mapel!==name)
        })
    }

    handleEmailChange = (e) => {
        e.preventDefault();
        this.setState({ email : e.target.value });
    }

    handleNoHPChange = (e) => {
        e.preventDefault();
        this.setState({ noHP : e.target.value });
    }

    handleNoPegawaiChange = (e) => {
        e.preventDefault();
        this.setState({ noPegawai : e.target.value });
    }
    handleTarifChange = (e) => {
        e.preventDefault();
        this.setState({ tarif : e.target.value });
    }

    cancel = (e) => {
        window.location='/pengguna';
    }

    render() {
        return (
            <div className="akun-container outer">
                <div className="">
                    <ul className="breadcrumb">
                        <li><Link to="/pengguna">Daftar Pengguna</Link></li>
                        <li className='bractive'>Edit Pengguna</li>
                    </ul>
                    <div className="create-akun-content">
                        <div>
                            <h2 className='judul-form'>Edit Pengguna</h2>
                        </div>
                        <div className="akun-card">
                            <h3 className='judul-form'>Formulir Edit Pengguna</h3>
                            {this.state.hasError&&this.state.hasSubmit? (<ErrorNotification text={this.state.errMessage}/>) : ("")}
                            {!this.state.hasError&&this.state.hasSubmit? (<NeutralNotification text="Akun Anda berhasil diubah!"/>) : ("")}
                            <div>
                                <form onSubmit={this.handleChange}>
                                    <div>
                                        <label htmlFor="">Role<span className='star'>*</span> </label>
                                        <select onChange={this.handleRoleChange} name="role" id="role">
                                            {(this.state.role==="ADMIN" ? <option value="ADMIN" selected>ADMIN</option> : <option value="ADMIN">ADMIN</option>)}
                                            {(this.state.role==="PENGAJAR" ? <option value="PENGAJAR" selected>PENGAJAR</option> : <option value="PENGAJAR">PENGAJAR</option>)}
                                            {(this.state.role==="STAF_KEUANGAN" ? <option value="STAF_KEUANGAN" selected>STAF_KEUANGAN</option> : <option value="STAF_KEUANGAN">STAF_KEUANGAN</option>)}
                                            {(this.state.role==="STAF_OPERASIONAL" ? <option value="STAF_OPERASIONAL" selected>STAF_OPERASIONAL</option> : <option value="STAF_OPERASIONAL">STAF_OPERASIONAL</option>)}
                                            {(this.state.role==="MANAJEMEN" ? <option value="MANAJEMEN" selected>MANAGER</option> : <option value="MANAJEMEN">MANAGER</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">Username<span className='star'>*</span> </label>
                                        <input disabled type="text" value={this.state.username} name="username" className='form-control' required />
                                    </div>
                                    <div>
                                        <label htmlFor="">Nama Lengkap<span className='star'>*</span> </label>
                                        <input value={this.state.namaLengkap} onChange={this.handleNamaLengkapChange} type="text" name="namaLengkap" className='form-control' required />
                                    </div>
                                    <div className="two-blocks">
                                        <div>
                                            <label htmlFor="">Nomor Pegawai<span className='star'>*</span> </label>
                                            <input value={this.state.noPegawai} onChange={this.handleNoPegawaiChange} type="text" name="noPegawai" className='form-control' required />
                                        </div>
                                        <div>
                                            <label htmlFor="">Nomor Handphone<span className='star'>*</span> </label>
                                            <input value={this.state.noHP} onChange={this.handleNoHPChange} type="text" name="noHP" className='form-control' required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Email<span className='star'>*</span> </label>
                                        <input value={this.state.email} onChange={this.handleEmailChange} type="email" name="email" className='form-control' required />
                                    </div>
                                    {this.state.pengajarShown && 
                                    <div>
                                        <div>
                                            <label htmlFor="">Tarif<span className='star'>*</span> </label>
                                            <input value={this.state.tarif} onChange={this.handleTarifChange} type="text" name="tarif" className='form-control' required />
                                        </div>
                                        <div>
                                            <label htmlFor="">Mata Pelajaran<span className='star'>*</span> </label>
                                            {this.state.allMapel?.result.map((mapel) => (
                                                <div className='checkbox-mapel' key={mapel.namaMapel}>
                                                    <input 
                                                    onChange={this.handleCheckBoxChange} 
                                                    type="checkbox"
                                                    checked={this.state.listMapel.some(precheckedMapel => precheckedMapel === mapel.namaMapel)}
                                                    value={mapel.namaMapel}
                                                    name={mapel.namaMapel}
                                                    id={mapel.namaMapel} />
                                                    {mapel.namaMapel}
                                                </div>
                                                
                                            ))}
                                        </div>
                                    </div>}
                                    <div className='box-right'>
                                    <a className="button button-outline-blue twobutton" onClick={this.cancel}>
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
	
}

export default EditPengguna;