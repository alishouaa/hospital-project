import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

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

    deleteHelp = async (index , id) => {
        fetch(`http://localhost:8080/api/delete-help/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let helps = this.state.helps;
        helps.splice (index, 1);
        this.setState({
            helps: helps
        })
    }
    render() {
        return (
            <div >
                <ul className="navbar">
                    <li> عدد المساعدات : {this.state.helps.length} </li>

                    <li><ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success "
                    table="table-to-xls"
                    filename = "tablexls"
                    sheet = "tablexls"
                    buttonText = "Export Data to Excel Sheet"
                    /></li>
                    <li>
                        <Link to="/home">
                            <FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>
                        </Link>
                    </li>

                </ul>
                <div className="table-test">
                    <table class="table table-bordered" id="table-to-xls">
                        <thead>
                            <tr>
                                <th scope="col">الإسم الكامل</th>
                                <th scope="col">نوع المساعدة</th>
                                <th scope="col">القيمة المطلوبة</th>
                                <th scope="col">قيمة السماعدة</th>
                                <th scope="col">المعرّف عنه</th>
                                <th scope="col">تاريخ المساعدة </th>
                                <th scope="col">رقم المستخدم </th>



                            </tr>
                        </thead>
                        {this.state.helps.map((help, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{help?.userId?.name}</td>
                                        <td>{help.type}</td>
                                        <td>{help.priceTotal}</td>
                                        <td>{help.priceHelp}</td>
                                        <td>{help.identifier}</td>
                                        <td>{help.createdAt}</td>
                                        <td>{help?.userId?._id}</td>
                                        <td onClick={() => this.deleteHelp(index ,help._id)} style={{ backgroundColor: "brown" }} className="btn btn-danger my-1">حذف
                                        </td>
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