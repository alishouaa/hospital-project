import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class GetUser extends Component {
    state = {
        search: '',
        name: '',
        show: false,
        users: [],
        sort : 'asc'

    }
    searchHandler = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    changeName = (e) => {
        // this.setState({
        //     name: e.target.innerText
        // })
        localStorage.setItem('userOne', e.target.innerText);

    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }
    deleteUser = async (index, id) => {
        fetch(`http://localhost:8080/api/delete-user/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        let users = this.state.users;
        users.splice(index, 1);
        this.setState({
            users: users
        })
    }
    getUsers = () => {
        fetch('http://localhost:8080/api/get-user', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    users: data.result
                });
            })
    }
    componentDidMount() {
        this.getUsers();
    }
 

    render() {
        
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header className="py-2" >
                        <h4> اضغط</h4>
                    </Modal.Header>
                    <Modal.Body id="modal" >
                        <Link
                            to={{ pathname: "/get-one", state: localStorage.getItem('userOne') }}
                            style={{ color: "brown", textDecoration: "none", fontWeight: "bold" }}>
                            الذهاب لصفحة المستخدم
                            <FontAwesomeIcon className="mx-3" icon={faArrowLeft}>
                            </FontAwesomeIcon>
                        </Link>
                    </Modal.Body>
                </Modal>
                <ul className="navbar navbar-search">
                    <li> عدد المستخدمين : {this.state.users.length} </li>
                    <li>
                        <input className="form-control" type="search" placeholder="ابحث  " value={this.state.search} onChange={this.searchHandler} />
                    </li>
                    <li><ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-success "
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Export Data to Excel Sheet"
                    /></li>
                    <li>
                        <Link to="/home">
                            <FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>
                        </Link>
                    </li>


                </ul>
                <div className="table-test">

                    <table className="table table-bordered" id="table-to-xls">
                        <thead>
                            <tr>
                                <th scope="col">الإسم الكامل</th>
                                <th scope="col">المنطقة </th>
                                <th scope="col">الشارع </th>
                                <th scope="col">الجهة الضامنة </th>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col">رقم المستخدم </th>

                            </tr>
                        </thead>
                        {this.state.users.filter((item) => {
                            if (this.state.search === "") {
                                return item
                            } else if (item.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                                return item
                            }
                        }).map((user, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td onClick={this.changeName} value={user.name} className="text-center list-group-item list-group-item-action" scope="row">
                                            <Button className="btn-user" onClick={this.handleShow}>
                                                {user.name}
                                            </Button>
                                        </td>
                                        <td>{user.company}</td>
                                        <td>{user.street}</td>
                                        <td>{user.guarantor}</td>
                                        <td>{user.phone}</td>
                                        <td>{user._id}</td>
                                        <td onClick={() => this.deleteUser(index, user._id)} style={{ backgroundColor: "brown" }} className="btn btn-danger my-1">حذف
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

export default GetUser