import React, { Component } from 'react';
import MapelService from '../../services/MapelService';
import "./MapelForm.css";


class CreateMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namaMapel: '',
            deskripsi: '',
            listJenjang: [{"idJenjang":1,"namaJenjang":"2 SMP"},{"idJenjang":2,"namaJenjang":"3 SMP"}],
        }

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeListJenjangHandler = this.changeListJenjangHandler.bind(this);
        this.saveMapel = this.saveMapel.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    saveMapel = (e) => {
        e.preventDefault();
        let mapel = { namaMapel: this.state.namaMapel, deskripsi: this.state.deskripsi, listJenjang: this.state.listJenjang };
        console.log('mapel => ' + JSON.stringify(mapel));

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



    render() {
        return (
            
                <div className='outer'>
                    <h2>Tambah Mata Pelajaran</h2>
                    <div className='tes'>
                    <div className='container'>
                        <div className='row'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4>Formulir Tambah Mata Pelajaran</h4>
                                    <form action="">
                                        <div className='form-group'>
                                            <label htmlFor="">Nama Mata Pelajaran <span className='star'>*</span> </label>
                                            <input type="text" name="namaMapel" className='form-control'
                                                value={this.state.namaMapel} onChange={this.changeNamaMapelHandler} />
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor="">Jenjang <span className='star'>*</span> </label>
                                            <input type="text" name="jenjang" className='form-control'
                                                value={this.state.listJenjang} onChange={this.changeListJenjangHandler} />

                                            

                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor="">Deskripsi Mata Pelajaran <span className='star'>*</span> </label>
                                            <textarea rows="4" cols="50" name="deskripsi" className='form-control'
                                                value={this.state.deskripsi} onChange={this.changeDeskripsiHandler} > Enter text here...</textarea>
                                        </div>

                                        <div className='box-right'>
                                            <a className="btn btn-blue twobutton" onClick={this.saveMapel}>
                                                Simpan
                                            </a>
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