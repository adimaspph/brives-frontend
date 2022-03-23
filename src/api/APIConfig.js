import Axios from "axios";

// Axios.defaults.withCredentials = true;

const APIConfig = Axios.create({
	baseURL: "https://brives-staging-backend.herokuapp.com",
	//baseURL: "http://localhost:8080",
});


var AUTH_TOKEN = ""
if (localStorage.getItem("user") != null) {
	// console.log("ada token");
	const local = JSON.parse(localStorage.getItem("user"));
	AUTH_TOKEN = "Bearer " + local.token;
	// console.log(AUTH_TOKEN);
}

APIConfig.defaults.headers.common["Authorization"] = AUTH_TOKEN;
APIConfig.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

export default APIConfig;
