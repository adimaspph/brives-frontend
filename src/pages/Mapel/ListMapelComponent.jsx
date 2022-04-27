import React, { Component, useState, useEffect } from "react";
import MapelService from "../../services/MapelService";
import "./Mapel.css";

export default function DetailMapelComponent(props) {
  const [mapels, setMapels] = useState([{}]);

  useEffect(async () => {
    checkUserRole();       
    await getMapelsData();
  }, []);

  const checkUserRole = () => {
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      const user = JSON.parse(userRaw);
      if (user.role === "STAF_OPERASIONAL") {
      } else {
        props.history.push("/403");
      }
    } else {
      props.history.push("/login");
    }
  };

  const getMapelsData = async () => {
    try {
      const { data } = await MapelService.getMapel();
      setMapels(data.result);
    } catch (err) {
      props.history.push("/atur-mapel");
    }
  };

  const addMapelHandler = () => {
    console.log("return to / add");
    props.history.push(`/atur-mapel/${"add"}`);
  };

  const viewMapel = (idMapel) => {
    props.history.push(`/atur-mapel/view/${idMapel}`);
  };

  return (
    <>
      <div className="outer">
        <h1>Daftar Mata Pelajaran</h1>
        <a className="button button-blue" onClick={addMapelHandler}>
          + Tambah Mata Pelajaran
        </a>
        <br />
        <div className="">
          <div className="">
            <table className="table-max table-none">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Mapel</th>
                <th scope="col">Jenjang</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Action</th>
              </tr>
              {mapels?.map((mapel, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{mapel.namaMapel}</td>
                  <td>
                    {mapel.listJenjang?.map((m) => (
                      <p> {m.namaJenjang} </p>
                    ))}
                  </td>
                  <td>{mapel.deskripsi}</td>
                  <td>
                    <a
                      className="button button-outline"
                      // href={`/atur-mapel/${mapel.idMapel}`}
                      onClick={() => viewMapel(mapel.idMapel)}
                    >
                      lihat
                    </a>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
