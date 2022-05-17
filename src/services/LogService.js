import axios from 'axios';
import APIConfig from '../api/APIConfig';

class LogService {
    getLog(){
        return APIConfig.get("/log/");
    }

    getLogByIdStaff(idStaff){
        return APIConfig.get("/log/pengajar/" + idStaff);
    }

    getLogByStatusKehadiranSatuPengajar(idStaff, status){
        return APIConfig.get("/log/pengajar/" + idStaff + "/status/" + status);
    }

    getLogByIdLog(idLog){
        return APIConfig.get("/log/detail/" + idLog);
    }
    
    updateKehadiran(log, idLog){
        return APIConfig.put("/log/updateKehadiran/" + idLog, log);
    }
    
    getJadwalStatusUnique(idJadwal, idStatus) {
        return APIConfig.get("/pesanan/jadwal/" + idJadwal + "/status/" + idStatus);
    }

}

export default new LogService()