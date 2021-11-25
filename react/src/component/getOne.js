import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const GetOne = (props) => {
    const [isEdit, setIsEdit] = useState(true)
    const [user, setUser] = useState(props.user)

    const toggleState = () => {
        setIsEdit(!isEdit)
    }
    var inputName = useRef(null)
    var inputFather = useRef(null)
    var inputMother = useRef(null)
    var inputCompany = useRef(null)
    var inputPhone = useRef(null)
    var inputStreet = useRef(null)
    var inputGuarantor = useRef(null)

    const update = (value1, value2, value3, value4, value5, value6, value7, userId) => {
        const data = {
            "name": value1,
            "father": value2,
            "mother": value3,
            "company": value4,
            "street": value5,
            "phone": value6,
            "guarantor": value7

        }
        fetch(`http://localhost:8080/api/update-user/${userId}`
            ,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(() => console.log("successfully"));

        let users = props.user
        let select = users.find((user) => user._id === userId);
        select['name'] = value1;
        select['father'] = value2;
        select['mother'] = value3;
        select['company'] = value4;
        select['street'] = value5;
        select['phone'] = value6;
        select['guarantor'] = value7;

        setUser(users)

    }

    const onChangeInput = (userId, event) => {
        event.preventDefault();
        console.log(user)
        update(inputName.current.value, inputFather.current.value,
            inputMother.current.value, inputCompany.current.value,
            inputStreet.current.value, inputPhone.current.value, inputGuarantor.current.value, userId);
        toggleState();
    }

    return (
        <div>
            <ul className="navbar">
                <li> المستخدم </li>
                <li>
                    <Link to="/home">
                        <FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>
                    </Link>
                </li>

            </ul>
            <div>

                {props.user.map((user, index) => {
                    return (
                        isEdit ? (

                            <div key={index}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="info">
                                            <li>الإسم الكامل : <span>{user.name}</span></li>
                                            <li>اسم الأب : <span>{user.father}</span></li>
                                            <li>اسم الأم : <span>{user.mother}</span></li>
                                            <li>السكن : <span>{user.company}</span></li>
                                            <li>الشارع : <span>{user.street}</span></li>
                                            <li>الجهة :<span> {user.guarantor}</span></li>
                                            <li>رقم الهاتف : <span>{user.phone}</span></li>
                                            <li>رقم المستخدم : <span>{user._id}</span></li>

                                            <div className="pt-3">
                                                <button className="btn btn-danger" onClick={() => toggleState()}>تعديل</button>
                                                <button className="btn btn-primary mx-3" >
                                                    <Link style={{ color: 'white', textDecoration: "none" }}
                                                        to={{ pathname: "/add-help", state: user._id }}>
                                                        + إضافة طلب المساعدة
                                                    </Link>
                                                </button>

                                            </div>
                                        </ul>
                                    </div>
                                    <div className="col-md-4">
                                        <img className="w-100 py-2" id="img" src={`http://localhost:8080/` + user.avatar} alt="الصورة غير متوفرة على الخادم" />
                                    </div>
                                </div>
                                <div className="row my-4">
                                    <h4 className="text-center py-4" style={{ color: 'brown', fontWeight: "bold" }}>
                                        المساعدات التي حصل/ت عليها : {user.name} <FontAwesomeIcon className="mx-2" icon={faArrowDown}></FontAwesomeIcon>
                                    </h4>
                                    <div className="table-test">
                                        <table class="table table-bordered  ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">الإسم الكامل</th>
                                                    <th scope="col">نوع المساعدة</th>
                                                    <th scope="col">القيمة المطلوبة</th>
                                                    <th scope="col">قيمة السماعدة</th>
                                                    <th scope="col">تاريخ المساعدة </th>



                                                </tr>
                                            </thead>
                                            {props.help.filter((help) => {
                                                return help.userId.name === user.name
                                            }).map(help => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td>{help?.userId?.name}</td>
                                                            <td>{help.type}</td>
                                                            <td>{help.priceTotal}</td>
                                                            <td>{help.priceHelp}</td>
                                                            <td>{help.createdAt}</td>

                                                        </tr>
                                                    </tbody>
                                                )
                                            })}


                                        </table>
                                    </div>
                                </div>
                            </div>

                        )
                            : (

                                <div className="row">
                                    <div className="col-md-6">
                                        <form onSubmit={(event) => onChangeInput(user._id, event)}>
                                            <input ref={inputName} defaultValue={user.name} type="text" className="form-control my-2" required />
                                            <input ref={inputFather} defaultValue={user.father} type="text" className="form-control  my-2" required />
                                            <input ref={inputMother} defaultValue={user.mother} type="text" className="form-control  my-2" required />
                                            <input ref={inputCompany} defaultValue={user.company} type="text" className="form-control  my-2" required />
                                            <input ref={inputStreet} defaultValue={user.street} type="text" className="form-control  my-2" required />
                                            <input ref={inputGuarantor} defaultValue={user.guarantor} type="text" className="form-control  my-2" required />
                                            <input ref={inputPhone} defaultValue={user.phone} type="Number" className="form-control  my-2" required />

                                            <button className="btn btn-danger">تعديل</button>
                                        </form>
                                    </div>
                                    <div className="col-md-4">
                                        <img id="img" className="w-100" src={`http://localhost:8080/` + user.avatar} alt="الصورة غير متوفرة على الخادم" />
                                    </div>
                                </div>

                            )


                    )



                })}

            </div>


        </div>
    )

}

export default GetOne;