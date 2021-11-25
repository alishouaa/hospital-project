import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
class GetHelp extends Component {
    state = {
        helps: []
    }
    getHelps = async () => {
        fetch('http://localhost:8080/api/get-help', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    helps: data.result,
                });
            })
    }
    componentDidMount() {
        this.getHelps();
    }

    render() {
        return (
            <div >
                <ul className="navbar">
                    <li> عدد المساعدات : {this.state.helps.length} </li>

                    <li>
                        <Link to="/home">
                            <FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>
                        </Link>
                    </li>

                </ul>
                <div className="table-test">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">الإسم الكامل</th>
                                <th scope="col">نوع المساعدة</th>
                                <th scope="col">القيمة المطلوبة</th>
                                <th scope="col">قيمة السماعدة</th>
                                <th scope="col">تاريخ المساعدة </th>
                                <th scope="col">رقم المستخدم </th>



                            </tr>
                        </thead>
                        {this.state.helps.map((help,index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{help?.userId?.name}</td>
                                        <td>{help.type}</td>
                                        <td>{help.priceTotal}</td>
                                        <td>{help.priceHelp}</td>
                                        <td>{help.createdAt}</td>
                                        <td>{help?.userId?._id}</td>

                                    </tr>
                                </tbody>
                            )
                        })}

                    </table>
                </div>
            </div >
        )
    }
}

export default GetHelp