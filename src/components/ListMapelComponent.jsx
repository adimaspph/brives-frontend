import React, { Component } from 'react';
import MapelService from '../services/MapelService';

class ListMapelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mapel: []
        }
    }

    componentDidMount(){
        MapelService.getMapel().then((res) => {
            this.setState({ mapel: res.data});
        });
    }

    render() {
        return (
            <div>

                <h2 className='text-center'>Daftar Mapel</h2>
                <div className='row'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Id Mapel</th>
                                <th>Nama Mapel</th>
                                <th>Jenjang</th>
                                <th>Deskripsi</th>
                                <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                this.state.mapel.map(
                                    satuMapel => 
                                    <tr key = {satuMapel.idMapel}>
                                        <td> {satuMapel.idMapel} </td>
                                        <td> {satuMapel.namaMapel} </td>
                                        <td> {satuMapel.jenjang.namaJenjang} </td>
                                        <td> {satuMapel.deskripsi} </td>
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