import axios from 'axios';
import APIConfig from '../api/APIConfig';

const MAPEL_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/mapel/";
const JENJANG_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/jenjang/";
const MAPEL_API_BASE_URL_2 = "https://brives-staging-backend.herokuapp.com/mapel";
const MAPEL_API_NAMA_URL_2 = "https://brives-staging-backend.herokuapp.com/mapel/nama";

// const MAPEL_API_BASE_URL = "http://localhost:8080/mapel/";
// const JENJANG_API_BASE_URL = "http://localhost:8080/jenjang/";
// const MAPEL_API_BASE_URL_2 = "http://localhost:8080/mapel";
// const MAPEL_API_NAMA_URL_2 = "http://localhost:8080/mapel/nama";

class MapelService {
    getMapel(){
        return APIConfig.get("/mapel/");
        // return axios.get(MAPEL_API_BASE_URL);
    }

    createMapel(mapel){
        return APIConfig.post("/mapel/", mapel);
        // return axios.post(MAPEL_API_BASE_URL, mapel);
    }

    getJenjang(){
        return APIConfig.get("/jenjang/");
        // return axios.get(JENJANG_API_BASE_URL);
    }

    getMapelById(idMapel){
        return APIConfig.get("/mapel/" + idMapel);
        // return axios.get(MAPEL_API_BASE_URL_2 + '/' + idMapel);
    }
    getMapelByNama(namaMapel){
        return APIConfig.get(("/mapel/nama/" + namaMapel));
        // return axios.get(MAPEL_API_NAMA_URL_2 + '/' + namaMapel);
    }

    updateMapel(mapel, idMapel){
        return axios.put(MAPEL_API_BASE_URL_2 + '/' + idMapel, mapel);
    }

}

export default new MapelService()