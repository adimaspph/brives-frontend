import React, { useEffect, useState } from 'react';
import APIConfig from "../../api/APIConfig";
import { BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DashboardPage.css'

class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pendapatanYear: "2022",
            privatYear: "2022",
            tambahanYear: "2022",
            maxPendapatan: [0,0],
            maxPrivat: [],
            maxTambahan: [],
            dataPendapatan: [
                {
                    name: 'Jan',
                    pendapatan: 0,
                },
                {
                    name: 'Feb',
                    pendapatan: 0,
                },
                {
                    name: 'Mar',
                    pendapatan: 0,
                },
                {
                    name: 'Apr',
                    pendapatan: 0,
                },
                {
                    name: 'May',
                    pendapatan: 0,
                },
                {
                    name: 'Jun',
                    pendapatan: 0,
                },
                {
                    name: 'Jul',
                    pendapatan: 0,
                },
                {
                    name: 'Aug',
                    pendapatan: 0,
                },
                {
                    name: 'Sep',
                    pendapatan: 0,
                },
                {
                    name: 'Oct',
                    pendapatan: 0,
                },
                {
                    name: 'Nov',
                    pendapatan: 0,
                },
                {
                    name: 'Des',
                    pendapatan: 0,
                },
            ],

            dataKelasTambahan: [
                {
                    name: 'Jan',
                    kelasTambahan: 3,
                },
                {
                    name: 'Feb',
                    kelasTambahan: 4,
                },
                {
                    name: 'Mar',
                    kelasTambahan: 1,
                },
                {
                    name: 'Apr',
                    kelasTambahan: 5,
                },
                {
                    name: 'May',
                    kelasTambahan: 6,
                },
                {
                    name: 'Jun',
                    kelasTambahan: 19,
                },
                {
                    name: 'Jul',
                    kelasTambahan: 50,
                },
                {
                    name: 'Aug',
                    kelasTambahan: 0,
                },
                {
                    name: 'Sep',
                    kelasTambahan: 0,
                },
                {
                    name: 'Oct',
                    kelasTambahan: 0,
                },
                {
                    name: 'Nov',
                    kelasTambahan: 0,
                },
                {
                    name: 'Des',
                    kelasTambahan: 0,
                },
            ],
            dataKelasPrivat: [
                {
                    name: 'Jan',
                    kelasPrivat: 0,
                },
                {
                    name: 'Feb',
                    kelasPrivat: 0,
                },
                {
                    name: 'Mar',
                    kelasPrivat: 0,
                },
                {
                    name: 'Apr',
                    kelasPrivat: 0,
                },
                {
                    name: 'May',
                    kelasPrivat: 0,
                },
                {
                    name: 'Jun',
                    kelasPrivat: 0,
                },
                {
                    name: 'Jul',
                    kelasPrivat: 0,
                },
                {
                    name: 'Aug',
                    kelasPrivat: 0,
                },
                {
                    name: 'Sep',
                    kelasPrivat: 0,
                },
                {
                    name: 'Oct',
                    kelasPrivat: 0,
                },
                {
                    name: 'Nov',
                    kelasPrivat: 0,
                },
                {
                    name: 'Des',
                    kelasPrivat: 0,
                },
            ]
        }

        this.handlePendapatanYear = this.handlePendapatanYear.bind(this);
        this.handleKelasTambahanYear = this.handleKelasTambahanYear.bind(this);
        this.handleKelasPrivatYear = this.handleKelasPrivatYear.bind(this);
        this.hitAPIPendapatan = this.hitAPIPendapatan.bind(this);
        this.hitAPIKelasTambahan = this.hitAPIKelasTambahan.bind(this);
        this.hitAPIKelasPrivat = this.hitAPIKelasPrivat.bind(this);
    }

    handlePendapatanYear = async(e) => {
        e.preventDefault(e); 
        this.setState({ pendapatanYear: e.target.value });
        this.hitAPIPendapatan();
        

    }

    handleKelasTambahanYear = async(e) => {
        e.preventDefault();
        this.setState({ kelasTambahanYear: e.target.value });
        this.hitKelasTambahan();
    }

    handleKelasPrivatYear = async(e) => {
        e.preventDefault();
        this.setState({ kelasPrivatYear: e.target.value });
        this.hitKelasPrivat();
    }

    hitAPIPendapatan = async(e) => {
        APIConfig.get("/pesanan/allTransaction/"+this.state.pendapatanYear)
        .then((response) => {
            this.setState({ dataPendapatan: response.data.result });
		});
    }

    hitAPIKelasTambahan = async(e) => {
        APIConfig.get("/pesanan/allTambahan/"+this.state.kelasTambahanYear)
        .then((response) => {
            this.setState({ dataKelasTambahan: response.data.result });
		});
    }

    hitAPIKelasPrivat = async(e) => {
        APIConfig.get("/pesanan/allPrivat/"+this.state.kelasPrivatYear)
        .then((response) => {
            this.setState({ dataKelasPrivat: response.data.result });
		});
    }


    componentDidMount() {
        // otentikasi
        // if (localStorage.getItem("user") != null) {
        //     if(!(JSON.parse(localStorage.getItem("user")).role === 'MANAJEMEN')) {
        //         window.location='/403';
        //     }
        // } else {
        //     window.location='/login';
        // }
        this.hitAPIPendapatan();
        this.hitAPIKelasPrivat();
        this.hitAPIKelasTambahan();
        
    }
    render() {
        return (
            <div className='dashboard-container'>
                <h1 className=''>Dashboard</h1>
                <div className='d-flex flex mt-3'>
                    <div className='chart'>
                        <h3>Statistik Pendapatan per Bulan - {this.state.pendapatanYear}</h3>
                        <div className='d-flex'>
                            <p className="p-2 align-self-end">Pilih Tahun: </p>
                            <select onChange={this.handlePendapatanYear} name="role" id="role" className='twobutton'>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </select>
                        </div>
                        <div className='chart-container'>
                        <ResponsiveContainer width="100%" aspect={3/1}>
                            <LineChart data={this.state.dataPendapatan}>
                                <XAxis dataKey="name"/>
                                <YAxis type="number" domain={[0, 'dataMax']} />
                                <Line type="monotone" dataKey="pendapatan" stroke='#fc182a'/>
                                <Tooltip/>
                                <CartesianGrid stroke='#E0DFDF' strokeDasharray="5 5"/>
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className='combine row mt-3 mb-5'>
                    <div className='d-flex flex mt-3 col-lg-6'>
                        <div className='chart'>
                            <h3>Statistik Kelas Privat - {this.state.privatYear}</h3>
                            <div className='d-flex'>
                                <p className="p-2 align-self-end">Pilih Tahun: </p>
                                <select onChange={this.handleKelasPrivatYear} name="role" id="role" className='twobutton'>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>
                            <div className='chart-container'>
                            <ResponsiveContainer width="100%" aspect={3/1}>
                                <BarChart data={this.state.dataKelasPrivat}>
                                    <XAxis dataKey="name"/>
                                    <YAxis type="number" domain={[0, 'dataMax']} />
                                    <Bar fill="#fc182a" type="monotone" dataKey="kelasPrivat" background={{ fill: '#eee' }}/>
                                    <Tooltip/>
                                </BarChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    
                    <div className='d-flex flex mt-3 col-lg-6'>
                        <div className='chart'>
                            <h3>Statistik Kelas Tambahan - {this.state.tambahanYear}</h3>
                            <div className='d-flex'>
                                <p className="p-2 align-self-end">Pilih Tahun: </p>
                                <select onChange={this.handleKelasTambahanYear} name="role" id="role" className='twobutton'>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>
                            <div className='chart-container'>
                            <ResponsiveContainer width="100%" aspect={3/1}>
                                <BarChart data={this.state.dataKelasTambahan}>
                                    <XAxis dataKey="name"/>
                                    <YAxis type="number" domain={[0, 'dataMax']} />
                                    <Bar fill="#fc182a" type="monotone" dataKey="kelasTambahan" background={{ fill: '#eee' }}/>
                                    <Tooltip/>
                                </BarChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
    
            
        );
    }
    

}

export default DashboardPage;