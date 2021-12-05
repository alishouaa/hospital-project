import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import axios from 'axios'
class Home extends Component {
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        localStorage.removeItem('userOne');

        axios.defaults.headers.common = { 'Authorization': '' };
    }
    render() {
        return (

            <div>

                <div className="home">
                    <ul className="nav-home">
                        <li ><Link to="/add-user"> + إضافة مستخدم </Link></li>
                        <li ><Link to="/get-user">المستخدمون </Link></li>
                        <li ><Link to="/get-help"> المساعدات </Link></li>
                        <li onClick={this.logout}> <Link to="/"> تسجيل الخروج</Link></li>

                    </ul>
                    <div className="row">
                        <div className="col-md-7 text">
                            <h1>صندوق المساعدات المالية للمرحومة</h1>
                            <h2>ممدوحة السيد بوبست</h2>
                        </div>
                        <div className="col-md-5 user">
                            <ul>
                                <li className=" pb-4 ">
                                    <span> <FontAwesomeIcon className="mx-3" icon={faUser}>
                                    </FontAwesomeIcon></span>
                                </li>
                                <li>مستشفى الحنان الخيري / مكتب الدخول</li>
                                <li>المسؤولة : صفا فيتروني</li>
                                <li>تاريخ الإنشاء : 22-11-2021 م</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <p>مستشفى الحنان الخيري 2021 ©</p>
                </div>
            </div>
        )
    }
}

export default Home