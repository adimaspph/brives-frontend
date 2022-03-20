import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import ButtonSubmit from "../../components/ButtonSubmit/ButtonSubmit";
import "./LoginPage.css";

function LoginPage() {

    const handlerLogin = async (e) => {
        alert("yeah");
    };
	return (
        
		<div className="jadwal-container">
            <Navbar></Navbar>
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
                            <form onSubmit={handlerLogin}>
                                <div className='form-group'>
                                    <label htmlFor="">Username<span className='star'>*</span> </label>
                                    <input type="text" name="username" className='form-control' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Password<span className='star'>*</span> </label>
                                    <input type="password" name="password" className='form-control' required />
                                </div>
                                <ButtonSubmit className="btn btn-blue fsubmit">
                                    Login
                                </ButtonSubmit>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>

            
            
		</div>
	);
}

export default LoginPage;