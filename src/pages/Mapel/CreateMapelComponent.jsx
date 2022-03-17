import React, { Component, Fragment } from 'react';
import MapelService from '../../services/MapelService';
import "./MapelForm.css";
import { generatePath } from 'react-router-dom';


class CreateMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namaMapel: '',
            deskripsi: '',
            listJenjang: [],
            jenjang: [],
            jenjangTerpilih: [],

        }

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeListJenjangHandler = this.changeListJenjangHandler.bind(this);
        this.saveMapel = this.saveMapel.bind(this);
        this.cancel = this.cancel.bind(this);
    }


    componentDidMount() {
        MapelService.getJenjang().then((res) => {
            this.setState({ listJenjang: res.data.result });
        });


    }

    saveMapel = (e) => {
        e.preventDefault();
        let mapel = { namaMapel: this.state.namaMapel, deskripsi: this.state.deskripsi, listJenjang: this.state.jenjangTerpilih };
        console.log('mapel => ' + JSON.stringify(mapel));
        this.submitJenjang();

        MapelService.createMapel(mapel).then(res => {
            this.props.history.push('/atur-mapel');
        })

    }

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

    handleChange = (event) => {
        let state = this.state;
        state.jenjang[event.target.value] = event.target.checked;
        this.setState(state);
        console.log(this.state.jenjang);
        // console.log(this.state.listJenjang[(event.target.value)-1]);
    };

    submitJenjang = () => {
        for (var i = 0; i < 5; i++) {
            if (this.state.jenjang[i]) {
                // console.log(this.state.listJenjang[(i)-1])
                this.state.jenjangTerpilih.push(this.state.listJenjang[(i) - 1])
                console.log(this.state.jenjangTerpilih)
            }
        }
    }



    render() {
        return (
            <div className='outer'>
                <ul class="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Pictures</a></li>
                    <li>Italy</li>
                </ul>

                <h2>Tambah Mata Pelajaran</h2>
                <div className='tes'>
                    <div className='container'>
                        <div className='row'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4>Formulir Tambah Mata Pelajaran</h4>
                                    <form action="" onSubmit={this.saveMapel}>
                                        <div className='form-group'>
                                            <label htmlFor="">Nama Mata Pelajaran <span className='star'>*</span> </label>
                                            <input type="text" name="namaMapel" className='form-control'
                                                value={this.state.namaMapel} onChange={this.changeNamaMapelHandler} required />
                                        </div>

                                        <div className='form-group jenjang'>
                                            <label htmlFor="">Jenjang </label>
                                            {/* <input type="text" name="jenjang" className='form-control'
                                                value={this.state.listJenjang} onChange={this.changeListJenjangHandler} /> */}

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

export default CreateMapelComponent;