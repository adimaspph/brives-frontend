import axios from 'axios';


// const PENGGUNA_API_BASE_URL = "http://localhost:8080/api/v1/user/all";
// const ROLE_API_BASE_URL = "http://localhost:8080/role";
// const IDPENGGUNA_API_BASE_URL = "http://localhost:8080/api/v1/user";

const PENGGUNA_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/api/v1/user/all";
const ROLE_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/role";
const IDPENGGUNA_API_BASE_URL = "https://brives-staging-backend.herokuapp.com/api/v1/user";

class PenggunaService {
    getPengguna(){
        return axios.get(PENGGUNA_API_BASE_URL);
    }

    getPenggunaByRole(idRole){
        return axios.get(ROLE_API_BASE_URL + '/' + idRole);
    }

    getPenggunaById(idUser){
        return axios.get(IDPENGGUNA_API_BASE_URL + '/' + idUser);
    }

    getRolePengguna(idUser){
        return axios.get(IDPENGGUNA_API_BASE_URL + '/role/' + idUser);
    }

}

export default new PenggunaService()