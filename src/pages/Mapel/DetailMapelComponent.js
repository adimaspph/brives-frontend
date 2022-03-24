import React, { Component, useState, useEffect } from 'react';
import MapelService from '../../services/MapelService';
import "./MapelForm.css";
import "./Mapel.css";
import Modal from "../../components/Modal/Modal";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';



export default function DetailMapelComponent(props) {
    const [mapel, setMapel] = useState({})
    const [pengajar, setPengajar] = useState([])
    const [idMapel,] = useState(parseInt(props.match.params.idMapel))
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isModal, setIsModal] = useState(false);

    useEffect(async () => {
        checkUserRole()
        await getMapelDetail()
        await getPengajar()
    }, [])


    const checkUserRole = () => {
        const userRaw = localStorage.getItem("user")
        if (userRaw) {
            const user = JSON.parse(userRaw)
            if (user.role === 'STAF_OPERASIONAL') {
            } else {
                props.history.push('/403');
            }
        } else {
            props.history.push('/login');
        }
    }

    const getMapelDetail = async () => {
        try {
            const { data } = await MapelService.getMapelById(idMapel)
            setMapel(data.result)
        } catch (err) {
            props.history.push('/atur-mapel');
            setError(err.message)
        }
    }

    const getPengajar = async () => {
        try {
            const { data } = await MapelService.getPengajarByMapelId(idMapel)
            console.log('pengajar', data.result)
            setPengajar(data.result)
        } catch (err) {
            props.history.push('/atur-mapel');
            setError(err.message)
        }
    }

    const deleteHandler = async () => {
        try {
            await MapelService.deleteMapel(idMapel)
            setSuccess('Mapel berhasil dihapus')
            setIsModal(false)
            await sleep(3000)
            props.history.push('/atur-mapel')
        } catch (err) {
            setError('Mapel gagal dihapus')
            setIsModal(false)
        }
    }

    const cancleHandler = () => {
        setIsModal(false);
    }

    const editHandler = () => {
        props.history.push(`/atur-mapel/${idMapel}/update`);
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const DeleteModalComponent = () => {
        return (
            <>
                <h5>Konfirmasi</h5>
                <p>Apakah Anda yakin akan menghapus mata Pelajaran ini?</p>
                <div className='center'>
                    <button onClick={cancleHandler} type="submit" className="btn btn-outline-secondary twobutton">Kembali</button>
                    <button onClick={deleteHandler} type="submit" className="btn btn-red twobutton">Hapus</button>
                </div>
            </>
        )
    }

    return (
        <>
            {error ? <ErrorNotification text={error} /> : <></>}
            {success ? <NeutralNotification text={success} /> : <></>}

            <Modal
                show={isModal}
                handleCloseModal={cancleHandler}
                modalTitle="Hapus Mata Pelajaran"
            >
                <DeleteModalComponent />
            </Modal>
            <div className='outer'>
                <ul class="breadcrumb">
                    <li><a href="/atur-mapel">Daftar Mata Pelajaran</a></li>
                    <li className='bractive'>Detail Mata Pelajaran</li>
                </ul>

                <h2>Detail Mata Pelajaran</h2>

                <div className='container'>
                    <div className='row'>
                        <div className='card-max-width'>
                            <div className='card-content'>
                                <table className='table-none'>
                                    <tr>
                                        <td>ID Mata Pelajaran</td>
                                        <td>{mapel.idMapel}</td>
                                    </tr>
                                    <tr>
                                        <td>Nama Mata Pelajaran</td>
                                        <td>{mapel.namaMapel}</td>
                                    </tr>
                                    <tr>
                                        <td>Jenjang</td>
                                        <td>{mapel.listJenjang?.map(m => <p> {m.namaJenjang} </p>)}</td>
                                    </tr>
                                    <tr>
                                        <td>Deskripsi Mata Pelajaran</td>
                                        <td>{mapel.deskripsi}</td>
                                    </tr>
                                </table>

                                <hr />
                                <div className='center'>
                                    <button onClick={() => setIsModal(true)} type="submit" className="btn btn-outline-blue twobutton">Hapus</button>
                                    <button onClick={editHandler} type="submit" className="btn btn-blue twobutton">Ubah</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h5>Pengajar pada Mata Pelajaran Ini</h5>
                        <table className='table-max'>
                            <tr id='head'>
                                <td>No</td>
                                <td>Nama Lengkap</td>
                                <td>Email</td>
                                <td>Nomor HP</td>
                                <td>Nomor Pegawai</td>
                            </tr>
                            {pengajar?.map((user, index) => (
                                <tr>

                                    <td>{index + 1}</td>
                                    <td>{user?.namaLengkap}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.noHP}</td>
                                    <td>{user?.staff?.noPegawai}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}