import axios from 'axios';


const MAPEL_API_BASE_URL = "http://localhost:8080/mapel/";
class MapelService {
    getMapel(){
        return axios.get(MAPEL_API_BASE_URL);
    }
}

export default new MapelService()