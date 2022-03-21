import React, { Component } from 'react';
import MapelService from '../../services/MapelService';
import "./Mapel.css";
import { generatePath } from 'react-router-dom';
import ErrorNotification from "../../components/Notification/ErrorNotification";
import { ToastContainer, toast } from 'react-toastify';
import { StyledEngineProvider } from '@mui/material';
import NeutralNotification from '../../components/Notification/NeutralNotification';


class UpdateMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idMapel: this.props.match.params.idMapel,
            namaMapel: '',
            deskripsi: '',
            listJenjang: [],
            jenjang: [],
            jenjangTerpilih: [],
            statusNama: '',
            namaAwal: 'jk',
            errorM: false,
            successM: false,
        }

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeListJenjangHandler = this.changeListJenjangHandler.bind(this);
        this.updateMapel = this.updateMapel.bind(this);
        this.cancel = this.cancel.bind(this);
        this.editMapel = this.editMapel.bind(this);
    }
    componentDidMount() {

        MapelService.getJenjang().then((res) => {
            this.setState({ listJenjang: res.data.result });
        });

        MapelService.getMapelById(this.state.idMapel).then((res) => {
            let mapel = res.data;
            this.setState({
                namaMapel: mapel.result.namaMapel,
                deskripsi: mapel.result.deskripsi,
            });
        });
    }

    editMapel(idMapel) {
        this.props.history.push(generatePath("/atur-mapel/:idMapel", { idMapel }));

    }


    async demo() {
        this.setState({ successM: true });
        await this.sleep(2000);
        this.props.history.push('/atur-mapel');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateMapel = (e) => {
        e.preventDefault();

        let mapel = { namaMapel: this.state.namaMapel.toUpperCase(), deskripsi: this.state.deskripsi, listJenjang: this.state.jenjangTerpilih };


        this.setState({ errorM: false });
        this.setState({ successM: false });

        MapelService.getMapelByNama(this.state.namaMapel.toUpperCase()).then((res) => {
            let mapell = res.data;

            if (mapell.status == 400) {
                this.setState({ statusNama: 400 });

                MapelService.getMapelById(this.state.idMapel).then((res) => {
                    let mapel = res.data.result.namaMapel;
                    if (mapel == this.state.namaMapel.toUpperCase()) {
                        console.log("Mata Pelajaran Tidak Berubah")
                        let mapel = { namaMapel: this.state.namaMapel.toUpperCase(), deskripsi: this.state.deskripsi, listJenjang: this.state.jenjangTerpilih };
                        console.log('mapel => ' + JSON.stringify(mapel));

                        this.submitJenjang();

                        MapelService.updateMapel(mapel, this.state.idMapel).then(res => {
                            console.log('mapel => ' + JSON.stringify(mapel));
                            
                            this.demo();
                            
                            
                        });

                    } else {
                        this.setState({ errorM: true });
                        // alert("Mata pelajaran ini telah dibuat sebelumnya. Silakan buat mata pelajaran baru!");

                    }
                });

            } else {
                this.submitJenjang();
                MapelService.updateMapel(mapel, this.state.idMapel).then(res => {
                    console.log('mapel => ' + JSON.stringify(mapel));
                    
                    this.demo();
                    // this.props.history.push('/atur-mapel');
                });

            }
        });

    }

    submitJenjang = () => {
        for (var i = 0; i < 6; i++) {
            if (this.state.jenjang[i]) {
                this.state.jenjangTerpilih.push(this.state.listJenjang[(i) - 1])

                console.log(this.state.jenjangTerpilih)
            }
        }
    }

    handleChange = (event) => {
        let state = this.state;
        state.jenjang[event.target.value] = event.target.checked;
        this.setState(state);
        console.log(this.state.jenjang);
        // console.log(this.state.listJenjang[(event.target.value)-1]);
    };

    changeNamaMapelHandler = (event) => {
        this.setState({ namaMapel: event.target.value });
    }

    changeDeskripsiHandler = (event) => {
        this.setState({ deskripsi: event.target.value });
    }

    changeListJenjangHandler = (event) => {
        console.log('mapel => ' + JSON.stringify(event.target.value));
        this.setState({ listJenjang: event.target.value });
    }

    cancel() {
        this.props.history.push('/atur-mapel');
    }

    notify = (event) => {
        toast("Wow so easy!");
    }



    render() {
        return (

            <div className='outer'>
                <ToastContainer />
                <ul class="breadcrumb">
                    <li><a href="/atur-mapel">Daftar Mata Pelajaran</a></li>
                    <li><a onClick={() => this.editMapel(this.state.idMapel)}>Detail Mata Pelajaran</a></li>
                    <li className='bractive'>Ubah Mata Pelajaran</li>
                </ul>

                {this.state.errorM ? (<ErrorNotification text="Mata pelajaran ini telah dibuat sebelumnya. Silakan buat mata pelajaran baru!" />) : ("")}
                {this.state.successM ? (<NeutralNotification text="Mata Pelajaran Berhasil Diubah!" />) : ("")}

                <h2>Ubah Mata Pelajaran</h2>
                <div className='tes'>
                    <div className='container'>
                        <div className='row'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4>Formulir Ubah Mata Pelajaran</h4>
                                    <form action="" onSubmit={this.updateMapel}>
                                        <div className='form-group'>
                                            <label htmlFor="">Id Mata Pelajaran  </label>
                                            <input type="text" name="namaMapel" className='form-control inactive'
                                                value={this.state.idMapel} readOnly />
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor="">Nama Mata Pelajaran <span className='star'>*</span> </label>
                                            <input type="text" name="namaMapel" className='form-control'
                                                value={this.state.namaMapel.toUpperCase()} onChange={this.changeNamaMapelHandler} required />
                                        </div>

                                        <div className='form-group jenjang'>
                                            <label htmlFor="">Jenjang </label>

                                            <div>
                                                {
                                                    this.state.listJenjang.map(
                                                        satuJenjang =>
                                                            <div key={satuJenjang.id}>
                                                                <><input type="checkbox" name="jenjang" value={satuJenjang.idJenjang} onChange={this.handleChange} ></input>
                                                                    <label className='namalabel' htmlFor="">{satuJenjang.namaJenjang}</label></>
                                                            </div>
                                                    )
                                                }
                                            </div>

                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor="">Deskripsi Mata Pelajaran <span className='star'>*</span> </label>
                                            <textarea rows="4" cols="50" name="deskripsi" className='form-control'
                                                value={this.state.deskripsi} onChange={this.changeDeskripsiHandler} required > Enter text here...</textarea>
                                        </div>

                                        <div className='box-right'>

                                            <a className="btn btn-outline-blue twobutton" onClick={() => this.editMapel(this.state.idMapel)}>
                                                Kembali
                                            </a>

                                            <button type="submit" className="btn btn-blue twobutton">Simpan</button>

                                        </div>


                                    </form>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UpdateMapelComponent;
