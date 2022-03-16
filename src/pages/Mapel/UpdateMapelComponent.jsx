import React, { Component } from 'react';
import MapelService from '../../services/MapelService';
import "./Mapel.css";
import { generatePath } from 'react-router-dom';



class UpdateMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idMapel: this.props.match.params.idMapel,
            namaMapel: '',
            deskripsi: '',
            listJenjang: [{"idJenjang":1,"namaJenjang":"2 SMP"},{"idJenjang":2,"namaJenjang":"3 SMP"}],
        }

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeListJenjangHandler = this.changeListJenjangHandler.bind(this);
        this.updateMapel = this.updateMapel.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount() {
        MapelService.getMapelById(this.state.idMapel).then((res) => {
            let mapel = res.data;
            this.setState({
                namaMapel: mapel.namaMapel,
                deskripsi: mapel.deskripsi,
                listJenjang: mapel.listJenjang
            });
        });
    }

    updateMapel = (e) => {
        e.preventDefault();
        let mapel = { namaMapel: this.state.namaMapel, deskripsi: this.state.deskripsi, listJenjang: this.state.listJenjang };
        console.log('mapel => ' + JSON.stringify(mapel));

        MapelService.updateMapel(mapel, this.state.idMapel).then(res => {
            this.props.history.push('/atur-mapel');
        });

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
                <h2>Ubah Mata Pelajaran</h2>
                <div className='tes'>
                    <div className='container'>
                        <div className='row'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4>Formulir Ubah Mata Pelajaran</h4>
                                    <form action="">
                                        <div className='form-group'>
                                            <label htmlFor="">Id Mata Pelajaran  </label>
                                            <input type="text" name="namaMapel" className='form-control'
                                                value={this.state.idMapel} readOnly />
                                        </div>

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
                                            <a className="btn btn-blue twobutton" onClick={this.updateMapel}>
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


export default UpdateMapelComponent;