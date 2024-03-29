import React, { Component } from 'react';
import MapelService from '../../services/MapelService';
import "./MapelForm.css";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';



class CreateMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namaMapel: '',
            deskripsi: '',
            listJenjang: [],
            jenjang: [],
            jenjangTerpilih: [],
            errorM: false,
            successM: false,

        }

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeListJenjangHandler = this.changeListJenjangHandler.bind(this);
        this.saveMapel = this.saveMapel.bind(this);
        this.cancel = this.cancel.bind(this);
    }


    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if( JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL') {
            } else {
                this.props.history.push('/403');
            }
        } else {

            this.props.history.push('/login');
        }

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

    saveMapel = (e) => {
        e.preventDefault();
        let mapel = { namaMapel: this.state.namaMapel.toUpperCase(), deskripsi: this.state.deskripsi, listJenjang: this.state.jenjangTerpilih };
        

        this.setState({ errorM: false });
        this.setState({ successM: false });

        MapelService.getMapelByNama(this.state.namaMapel.toUpperCase()).then((res) => {
            let mapell = res.data;

            if (mapell.status === 400) {
                this.setState({ errorM: true });
                
                // alert("Mata pelajaran ini telah dibuat sebelumnya. Silakan buat mata pelajaran baru!");

                this.setState({ statusNama: 400 });
            } else {
                this.setState({ successM: true });
                this.submitJenjang();
                MapelService.createMapel(mapel).then(res => {
                    this.demo();
                    // this.props.history.push('/atur-mapel');
                })

            }
        });




    }

    async demo() {
        this.setState({ successM: true });
        await this.sleep(2000);
        this.props.history.push('/atur-mapel');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    changeNamaMapelHandler = (event) => {
        this.setState({ namaMapel: event.target.value });
    }

    changeDeskripsiHandler = (event) => {
        this.setState({ deskripsi: event.target.value });
    }

    changeListJenjangHandler = (event) => {
        
        this.setState({ listJenjang: event.target.value });
    }

    cancel() {
        this.props.history.push('/atur-mapel');
    }

    handleChange = (event) => {
        let state = this.state;
        state.jenjang[event.target.value] = event.target.checked;
        this.setState(state);
    };

    submitJenjang = () => {
        for (var i = 0; i < 6; i++) {
            if (this.state.jenjang[i]) {
                
                this.state.jenjangTerpilih.push(this.state.listJenjang[(i) - 1])
                
            }
        }
    }

    



    render() {
        return (
            <div className='outer'>

                <ul class="breadcrumb">
                    <li><a href="/atur-mapel">Daftar Mata Pelajaran</a></li>
                    <li className='bractive'>Tambah Mata Pelajaran</li>
                </ul>

                {this.state.errorM ? (<ErrorNotification text="Mata pelajaran ini telah dibuat sebelumnya. Silakan buat mata pelajaran baru!" />) : ("")}
                {this.state.successM ? (<NeutralNotification text="Mata Pelajaran Berhasil Dibuat!" />) : ("")}

                <h2>Tambah Mata Pelajaran</h2>
                <div className='tes'>
                    <div className=''>
                        <div className='row'>
                            <div className='cardd'>
                                <div className='card-body'>
                                    <h4>Formulir Tambah Mata Pelajaran</h4>
                                    <form action="" onSubmit={this.saveMapel}>
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

                                            <a className="button button-outline-blue twobutton" onClick={this.cancel}>
                                                Kembali
                                            </a>
                                            <button type="submit" className="button button-blue twobutton">Simpan</button>

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

export default CreateMapelComponent;
