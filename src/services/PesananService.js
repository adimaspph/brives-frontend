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

    getUserByIdStaff(idStaff){
        return APIConfig.get("/api/v1/user/staff/" + idStaff);
    }

    getStaffByIdJadwal(idJadwal){
        return APIConfig.get("/api/v1/staf/jadwal/" + idJadwal);
    }

    getPesananByIdStatus(idStatus){
        return APIConfig.get("/pesanan/status/" + idStatus);
    }

    getPesananByIdSiswa(idSiswa){
        return APIConfig.get("/pesanan/siswa/" + idSiswa);
    }

    getPesananByStatusSiswa(idSiswa, idStatus){
        return APIConfig.get("/pesanan/siswa/" + idSiswa + "/status/" + idStatus);
    }

    updateLinkZoomJadwal(jadwal, idJadwal){
        return APIConfig.put("/jadwal/addLink/" + idJadwal, jadwal);
    }

    updateStatusPesanan(status, idPesanan){
        return APIConfig.put("/pesanan/status/" + idPesanan, status);
    }

    bayarPesanan(idPesanan, link) {
        return APIConfig.post(`/pesanan/bayar/${idPesanan}?bukti=${link}` );

    }

}

export default new PesananService()