import React from 'react';
import APIConfig from "../../api/APIConfig";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
                    pendapatan: 10020,
                },
                {
                    name: 'Feb',
                    pendapatan: 10020,
                },
                {
                    name: 'Mar',
                    pendapatan: 10020,
                },
                {
                    name: 'Apr',
                    pendapatan: 10020,
                },
                {
                    name: 'May',
                    pendapatan: 30020,
                },
                {
                    name: 'Jun',
                    pendapatan: 10020,
                },
                {
                    name: 'Jul',
                    pendapatan: 70020,
                },
                {
                    name: 'Aug',
                    pendapatan: 45020,
                },
                {
                    name: 'Sep',
                    pendapatan: 13220,
                },
                {
                    name: 'Oct',
                    pendapatan: 20020,
                },
                {
                    name: 'Nov',
                    pendapatan: 10020,
                },
                {
                    name: 'Des',
                    pendapatan: 10020,
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
                    kelasPrivat: 3,
                },
                {
                    name: 'Feb',
                    kelasPrivat: 4,
                },
                {
                    name: 'Mar',
                    kelasPrivat: 6,
                },
                {
                    name: 'Apr',
                    kelasPrivat: 1,
                },
                {
                    name: 'May',
                    kelasPrivat: 0,
                },
                {
                    name: 'Jun',
                    kelasPrivat: 9,
                },
                {
                    name: 'Jul',
                    kelasPrivat: 20,
                },
                {
                    name: 'Aug',
                    kelasPrivat: 21,
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
        this.setState(({ pendapatanYear: e.target.value }), () => {
            this.hitAPIPendapatan();
        });


    }

    handleKelasTambahanYear = async(e) => {
        e.preventDefault();
        this.setState(({ tambahanYear: e.target.value }), () => {
            this.hitAPIKelasTambahan();
        });
        
    }

    handleKelasPrivatYear = async(e) => {
        e.preventDefault();
        this.setState(({ privatYear: e.target.value }), () => {
            this.hitAPIKelasPrivat();
        });
        
    }

    hitAPIPendapatan = async(e) => {
        APIConfig.get("/pesanan/allTransaction/"+this.state.pendapatanYear)
        .then((response) => {
            this.setState({ dataPendapatan: response.data.result });
		});
    }

    hitAPIKelasTambahan = async(e) => {
        APIConfig.get("/pesanan/allTambahan/"+this.state.tambahanYear)
        .then((response) => {
            this.setState({ dataKelasTambahan: response.data.result });
		});
    }

    hitAPIKelasPrivat = async(e) => {
        APIConfig.get("/pesanan/allPrivat/"+this.state.privatYear)
        .then((response) => {
            this.setState({ dataKelasPrivat: response.data.result });
		});
    }


    componentDidMount() {
        if (localStorage.getItem("user") != null) {
            if(!(JSON.parse(localStorage.getItem("user")).role === 'MANAJEMEN')) {
                window.location='/403';
            }
        } else {
            window.location='/login';
        }
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
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option selected value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                        <div className='chart-container'>
                        <ResponsiveContainer width="100%" aspect={3/1}>
                            <LineChart data={this.state.dataPendapatan}>
                                <XAxis dataKey="name"/>
                                <YAxis type="number" domain={[0, 'dataMax+1000']} />
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
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option selected value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </select>
                            </div>
                            <div className='chart-container'>
                            <ResponsiveContainer width="100%" aspect={3/1}>
                                <BarChart data={this.state.dataKelasPrivat}>
                                    <XAxis dataKey="name"/>
                                    <YAxis type="number" domain={[0, 'dataMax   ']} />
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
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option selected value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
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