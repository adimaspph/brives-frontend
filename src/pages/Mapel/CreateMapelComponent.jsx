import React, { Component } from 'react';
import MapelService from '../../services/MapelService';
import "./MapelForm.css";


class CreateMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namaMapel: '',
            deskripsi: '',
            jenjang: { "idJenjang": 1, "namaJenjang": "1 SMA" },
            jenjanglist: [],
        }

        this.changeNamaMapelHandler = this.changeNamaMapelHandler.bind(this);
        this.changeDeskripsiHandler = this.changeDeskripsiHandler.bind(this);
        this.changeJenjangHandler = this.changeJenjangHandler.bind(this);
        this.saveMapel = this.saveMapel.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    // componentDidMount(){
    //     MapelService.getJenjang.then((res) => {
    //         this.setState({ jenjanglist: res.data});
    //     });
    // }

    saveMapel = (e) => {
        e.preventDefault();
        let mapel = { namaMapel: this.state.namaMapel, deskripsi: this.state.deskripsi, jenjang: this.state.jenjang };
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

    changeJenjangHandler = (event) => {
        console.log('mapel => ' + JSON.stringify(event.target.value));
        this.setState({ jenjang: event.target.value });
    }

    cancel() {
        this.props.history.push('/atur-mapel');
    }



    render() {
        return (

            <div className='outer'>
                <h2>Tambah Mata Pelajaran</h2>
                <div className='container tes'>
                    <div className='row'>
                        <div className='card'>
                            <h4>Formulir Mata Pelajaran</h4>
                            <div className='card-body'>
                                <form action="">
                                    <div className='form-group'>
                                        <label htmlFor="">Nama Mata Pelajaran <span className='star'>*</span> </label>
                                        <input type="text" name="namaMapel" className='form-control'
                                            value={this.state.namaMapel} onChange={this.changeNamaMapelHandler} />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor="">Jenjang <span className='star'>*</span> </label>
                                        <input type="text" name="jenjang" className='form-control'
                                            value={this.state.jenjang} onChange={this.changeJenjangHandler} />

                                        {/* <select name='jenjang' className='form-control' value={this.state.jenjang} onChange={this.changeJenjangHandler}>
                                            <option value={this.state.jenjang}>2 SMP</option>
                                            <option value={this.state.jenjang}>3 SMP</option>
                                        </select> */}

                                        {/* <input className="form-control" type="select">
                                            {jenjang.map(c => (<option key={c.idJenjang} value={c.idJenjang}>{c.namaJenjang}</option>))}
                                        </input> */}

                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor="">Deskripsi Mata Pelajaran <span className='star'>*</span> </label>
                                        <textarea rows="4" cols="50" name="deskripsi" className='form-control'
                                            value={this.state.deskripsi} onChange={this.changeDeskripsiHandler} > Enter text here...</textarea>
                                    </div>

                                    <div>
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
        );
    }
}

export default CreateMapelComponent;