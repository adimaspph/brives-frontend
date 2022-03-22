import React, { Component } from 'react';
import MapelService from '../../services/MapelService';
import "./Mapel.css";
import { generatePath } from 'react-router-dom';



class ListMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mapel: []
        }

        this.addMapel = this.addMapel.bind(this);
        this.editMapel = this.editMapel.bind(this);
    }

    editMapel(idMapel) {
        this.props.history.push(generatePath("/atur-mapel/:idMapel/update", { idMapel }));

    }

    componentDidMount() {
        MapelService.getMapel().then((res) => {
            this.setState({ mapel: res.data.result });
        });
    }

    addMapel() {
        this.props.history.push('/atur-mapel/add');
    }

    render() {
        return (
            <div>


                <h2 className='text-center'>Daftar Mapel</h2>
                <a className="btn btn-blue" onClick={this.addMapel}>
                    + Tambah Mata Pelajaran
                </a>
                <div className='row'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Id Mapel</th>
                                <th scope='col'>Nama Mapel</th>
                                <th scope='col'>Jenjang</th>
                                <th scope='col'>Deskripsi</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.mapel.map(
                                    satuMapel =>
                                        <tr key={satuMapel.idMapel}>
                                            <td scope='row'> {satuMapel.idMapel} </td>
                                            <td> {satuMapel.namaMapel} </td>
                                            <td>
                                                {
                                                    satuMapel.listJenjang.map(
                                                        jenjang =>
                                                            <p> {jenjang.namaJenjang}</p>
                                                    )
                                                }


                                            </td>
                                            <td> {satuMapel.deskripsi} </td>
                                            <td>
                                                <a className="btn btn-blue" onClick={() => this.editMapel(satuMapel.idMapel)}>
                                                    Update
                                                </a>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>

            </div>
        );
    }
}

export default ListMapelComponent;