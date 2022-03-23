import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import "./LoginPage.css";
import APIConfig from "../../api/APIConfig";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
	const [hasError, setHasError] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);

    const eye = <FontAwesomeIcon icon={faEye} />;
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handlerLogin = () => {
        console.log("melakukan login");
        APIConfig.post("/api/user/login", {
            username: username,
            password: password,
        }).then((response) => {
            setHasSubmit(false);
            setHasSubmit(true);
			setHasError(false);
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify({login:true, token: response.data.token, role : response.data.role[0].authority}));
                window.location = "/";   
            }
        }).catch((error) => {
            setHasSubmit(false);
            setHasError(false);
            setHasSubmit(true);
            setHasError(true);
        });
    };

    return (
        <div className="jadwal-container">
            <Navbar></Navbar>
			{hasError&&hasSubmit? (<ErrorNotification text="Akun tidak terverifikasi, silahkan coba lagi"/>) : ("")}
            {!hasError&&hasSubmit? (<NeutralNotification text="Akun terverifikasi, berhasil login"/>) : ("")}
            <div className="container">
                <div className="row">
                    <div className="page-title">
                        <h1>Login</h1>
                    </div>
                    <div className="login-card">
                        <div className="error-message">
                            <p></p>
                        </div>
                        <div className="login-form">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="">
                                        Username<span className="star">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        className="form-control"
                                        required
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">
                                        Password<span className="star">*</span>{" "}
                                    </label>
                                    <input
                                        id="log-pos"
                                        type={passwordShown ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        className="form-control"
                                        required
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <i id="eyepas" onClick={togglePasswordVisiblity}>{eye}</i>
                                </div>
                            </form>
                            <div
                                onClick={handlerLogin}
                                className="btn btn-blue fsubmit"
                            >
                                Login
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;