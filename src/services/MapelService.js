import axios from 'axios';


const MAPEL_API_BASE_URL = "http://localhost:8080/mapel/";
const JENJANG_API_BASE_URL = "http://localhost:8080/jenjang/";

class MapelService {
    getMapel(){
        return axios.get(MAPEL_API_BASE_URL);
    }

    createMapel(mapel){
        return axios.post(MAPEL_API_BASE_URL, mapel);
    }

    getJenjang(){
        return axios.get(JENJANG_API_BASE_URL);
    }

}

export default new MapelService()