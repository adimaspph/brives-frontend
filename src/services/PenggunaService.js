import axios from 'axios';
import APIConfig from '../api/APIConfig';


const PENGGUNA_API_BASE_URL = "http://localhost:8080/api/v1/user/all";
const ROLE_API_BASE_URL = "http://localhost:8080/role";
const IDPENGGUNA_API_BASE_URL = "http://localhost:8080/api/v1/user";

// const PENGGUNA_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/api/v1/user/all";
// const ROLE_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/role";
// const IDPENGGUNA_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/api/v1/user";

class PenggunaService {
    getPengguna(){
        return APIConfig.get("/api/v1/user/all");
        // return axios.get(PENGGUNA_API_BASE_URL);
    }

    getPenggunaByRole(idRole){
        return APIConfig.get("/role/" + idRole);
        // return axios.get(ROLE_API_BASE_URL + '/' + idRole);
    }

    getPenggunaById(username){
        return APIConfig.get("/api/v1/user/" + username);
        // return axios.get(IDPENGGUNA_API_BASE_URL + '/' + idUser);
    }

    getRolePengguna(idUser){
        return APIConfig.get("/api/v1/user/role/" + idUser);
        // return axios.get(IDPENGGUNA_API_BASE_URL + '/role/' + idUser);
    }

    hapusUser(username){
        return APIConfig.delete("/api/v1/user/" + username);
    }

    getAuthenticatedUser() {
        return APIConfig.get("/api/v1/user/auth/");

    }
}

export default new PenggunaService()
