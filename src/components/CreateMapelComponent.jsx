import React, { Component } from 'react';
import MapelService from '../services/MapelService';

class CreateMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namaMapel: '',
            deskripsi:'',
            jenjang: {"idJenjang": 1,"namaJenjang": "1 SMA"}
        }

        

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeJenjangHandler = this.changeJenjangHandler.bind(this);
        this.saveMapel = this.saveMapel.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    saveMapel = (e) => {
        e.preventDefault();
        let mapel = {namaMapel: this.state.namaMapel, deskripsi: this.state.deskripsi, jenjang: this.state.jenjang};
        console.log('mapel => ' + JSON.stringify(mapel));

        MapelService.createMapel(mapel).then(res =>{
            this.props.history.push('/mapel');
        })
    }

    changeNamaMapelHandler= (event) => {
        this.setState({namaMapel: event.target.value});
    }

    changeDeskripsiHandler= (event) => {
        this.setState({deskripsi: event.target.value});
    }

    changeJenjangHandler= (event) => {
        this.setState({jenjang: event.target.value});
    }

    cancel(){
        this.props.history.push('/atur-mapel');
    }

    render() {
        return (
            <div>
                <h2>Tambah Mata Pelajaran</h2>
                <div className='container'>
                    <div className='row'>
                        <div className='card'>
                            <h3>Formulir Mata Pelajaran</h3>
                            <div className='card-body'>
                                <form action="">
                                    <div className='form-group'>
                                        <label htmlFor="">Nama Mata Pelajaran</label>
                                        <input type="text" name="namaMapel" className='form-control'
                                            value={this.state.namaMapel} onChange={this.changeNamaMapelHandler} />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor="">Deskripsi Mata Pelajaran</label>
                                        <input type="text" name="deskripsi" className='form-control'
                                            value={this.state.deskripsi} onChange={this.changeDeskripsiHandler} />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor="">Jenjang</label>
                                        <input type="text" name="jenjang" className='form-control'
                                            value={this.state.jenjang} onChange={this.changeJenjangHandler} />
                                    </div>

                                    <a className="btn btn-blue" onClick={this.saveMapel}>
					                    Save
				                    </a>
                                    <a className="btn btn-blue" onClick={this.cancel}>
					                    Cancel
				                    </a>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMapelComponent;