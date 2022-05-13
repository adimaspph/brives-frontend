import axios from 'axios';
import APIConfig from '../api/APIConfig';

class LogService {
    getLog(){
        return APIConfig.get("/log/");
    }

    

}

export default new LogService()