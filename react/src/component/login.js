import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
class Login extends Component {
    state={
        email : '',
        password : '',
        error : ''
    }

    onChangeEmail = (e) =>{this.setState({email : e.target.value})}
    onChangePassword = (e) =>{this.setState({password : e.target.value})}

    onSubmit = (e) => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:8080/api/login', data)
            .then(res => {
                if ("token" in res.data) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('_id', res.data._id);
                    axios.defaults.headers.common = { 'Authorization': res.data.token };
                    if (res.data.token) {
                        this.props.history.push("/home");

                    } else {
                        return false
                    }
                }
            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
        

    }

    render() {
        return (
            <div>
                
                <div className="row pt-5">
                    <div className="col-lg-4">
                        <br />
                    </div>
                    <div className="col-lg-4 login">
                        <div className="login-user">
                            <span> <FontAwesomeIcon className="mx-3" icon={faUser}>
                            </FontAwesomeIcon></span>
                        </div>
                        <h3 className="text-center ">تسجيل الدخول</h3>
                        <div className="error">{this.state.error}</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label style={{fontWeight:"normal"}} for="exampleDropdownFormEmail2">البريد الالكتروني</label>
                                <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" onChange={this.onChangeEmail} />
                            </div>
                            <div className="form-group">
                                <label style={{fontWeight:"normal"}} for="exampleDropdownFormPassword2">كلمة المرور</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password" onChange={this.onChangePassword} />
                            </div>

                            <button type="submit" className="btn btn-dark">تسجيل</button>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <br />
                    </div>

                </div>
            </div>
        )
    }
}

export default Login