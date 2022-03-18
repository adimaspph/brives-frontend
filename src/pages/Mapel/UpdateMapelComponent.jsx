import React, { Component } from 'react';
import MapelService from '../../services/MapelService';
import "./Mapel.css";
import { generatePath } from 'react-router-dom';
import NeutralNotification from "../../components/Notification/NeutralNotification";



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
        }

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeListJenjangHandler = this.changeListJenjangHandler.bind(this);
        this.updateMapel = this.updateMapel.bind(this);
        this.cancel = this.cancel.bind(this);
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

    updateMapel = (e) => {
        e.preventDefault();

        let mapel = { namaMapel: this.state.namaMapel, deskripsi: this.state.deskripsi, listJenjang: this.state.jenjangTerpilih };

        this.submitJenjang();

        MapelService.getMapelByNama(this.state.namaMapel).then((res) => {
            let mapell = res.data;

            if (mapell.status == 400) {
                this.setState({ statusNama: 400 });

                MapelService.getMapelById(this.state.idMapel).then((res) => {
                    let mapel = res.data.result.namaMapel;
                    if (mapel == this.state.namaMapel) {
                        console.log("Mata Pelajaran Tidak Berubah")
                        let mapel = { namaMapel: this.state.namaMapel, deskripsi: this.state.deskripsi, listJenjang: this.state.jenjangTerpilih };
                        console.log('mapel => ' + JSON.stringify(mapel));

                        MapelService.updateMapel(mapel, this.state.idMapel).then(res => {
                            console.log('mapel => ' + JSON.stringify(mapel));
                            this.props.history.push('/atur-mapel');
                        });

                    } else {
                        alert("Mata pelajaran ini telah dibuat sebelumnya. Silakan buat mata pelajaran baru!");
                        // <NeutralNotification text="Ini adalah notifikasi singkat" />

                    }
                });

            } else {

                MapelService.updateMapel(mapel, this.state.idMapel).then(res => {
                    console.log('mapel => ' + JSON.stringify(mapel));
                    this.props.history.push('/atur-mapel');
                });

            }
        });

    }

    submitJenjang = () => {
        for (var i = 0; i < 5; i++) {
            if (this.state.jenjang[i]) {
                // console.log(this.state.listJenjang[(i)-1])
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



    render() {
        return (

            <div className='outer'>
                <ul class="breadcrumb">
                    <li><a href="/atur-mapel">Daftar Mata Pelajaran</a></li>
                    <li><a href="/atur-mapel">Detail Mata Pelajaran</a></li>
                    <li className='bractive'>Update Mata Pelajaran</li>
                </ul>

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
                                            <input type="text" name="namaMapel" className='form-control'
                                                value={this.state.idMapel} readOnly />
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor="">Nama Mata Pelajaran <span className='star'>*</span> </label>
                                            <input type="text" name="namaMapel" className='form-control'
                                                value={this.state.namaMapel} onChange={this.changeNamaMapelHandler} required />
                                        </div>

                                        <div className='form-group jenjang'>
                                            <label htmlFor="">Jenjang </label>

                                            <div>
                                                {
                                                    this.state.listJenjang.map(
                                                        satuJenjang =>
                                                            <div key={satuJenjang.id}>
                                                                <><input type="checkbox" name="jenjang" value={satuJenjang.idJenjang} onChange={this.handleChange}></input>
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
                                            <button type="submit" className="btn btn-blue twobutton">Simpan</button>
                                            <a className="btn btn-outline-blue twobutton" onClick={this.cancel}>
                                                Kembali
                                            </a>
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
