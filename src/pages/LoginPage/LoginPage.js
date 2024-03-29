import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import "./LoginPage.css";
import APIConfig from "../../api/APIConfig";
import ErrorNotification from "../../components/Notification/ErrorNotification";
import NeutralNotification from '../../components/Notification/NeutralNotification';
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

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
        APIConfig.post("/api/user/login", {
            username: username,
            password: password,
        }).then((response) => {
            setHasSubmit(false);
            setHasSubmit(true);
            setHasError(false);
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify({ login: true, token: response.data.token, role: response.data.role[0].authority }));
                if(JSON.parse(localStorage.getItem("user")).role === 'PELAJAR') {
                    setTimeout(
                        function() {
                            window.location = '/';
                        }
                        .bind(this),
                        1500
                    );
                } else {
                    setTimeout(
                        function() {
                            window.location = "/beranda";
                        }
                        .bind(this),
                        1500
                    );
                }
                
            }
        }).catch((error) => {
            setHasSubmit(false);
            setHasError(false);
            setHasSubmit(true);
            setHasError(true);
        });
    };

    return (
        <div className="">
            <Navbar></Navbar>
            {hasError && hasSubmit ? (<ErrorNotification text="Akun tidak terverifikasi. Apabila anda belum memiliki akun, silahkan melakukan Registrasi terlebih dahulu" />) : ("")}
            {!hasError && hasSubmit ? (<NeutralNotification text="Akun terverifikasi, berhasil login" />) : ("")}
            <div className="page-container">
                <div className="">
                    <div className="">
                        <h2 className="page-title">BTA GROUP</h2>
                        <h3 className="page-title">Private E-Learning Information System</h3>
                    </div>
                    <div className="login-card">
                        <div className="error-message">
                        </div>
                        <div className="login-form">
                            <h4 id="login-title">Login</h4>
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
                                className="button button-blue fsubmit"
                            >
                                Login
                            </div>
                            <div className="register">
                                <p>Belum memiliki akun? <span className="star"><b><Link className="" to="/register"> Daftar Disini!</Link></b></span> </p>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default LoginPage;