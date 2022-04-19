import axios from 'axios';
import APIConfig from '../api/APIConfig';

class PesananService {
    getPesanan(){
        return APIConfig.get("/pesanan/");
    }

    getPesananById(idPesanan){
        return APIConfig.get("/pesanan/" + idPesanan);
    }
    
    getUserByIdSiswa(idSiswa){
        return APIConfig.get("/api/v1/user/siswa/" + idSiswa);
    }

}

export default new PesananService()