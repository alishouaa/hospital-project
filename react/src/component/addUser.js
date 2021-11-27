import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class AddUser extends Component {
    state = {
        name: '',
        avatar: null,
        company: '',
        street: '',
        guarantor: '',
        phone: '',
        status: '',
        users: []
    }
    //   getUsers = () => {
    //         fetch('http://localhost:8080/api/get-user', {
    //           method: 'GET'
    //         })
    //           .then(res => res.json())
    //           .then(data => {
    //             this.setState({
    //               users: data.result,
    //             });
    //           })
    //       }
    changeName = (e) => { this.setState({ name: e.target.value }) }
    changePhone = (e) => { this.setState({ phone: e.target.value }) }
    changeAvatar = (e) => { this.setState({ avatar: e.target.files[0] }) }
    changeCompany = (e) => { this.setState({ company: e.target.value }) }
    changeStreet = (e) => { this.setState({ street: e.target.value }) }
    changeGuarantor = (e) => { this.setState({ guarantor: e.target.value }) }

    onAddUser = async (e) => {
        let timer = null
        e.preventDefault();
        this.setState({
            status: 'loading'
        })

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('company', this.state.company)
        formData.append('street', this.state.street);
        formData.append('phone', this.state.phone);
        formData.append('avatar', this.state.avatar);
        formData.append('guarantor', this.state.guarantor);



        fetch('http://localhost:8080/api/add-user', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
        timer = setTimeout(() => {
            this.setState({
                status: 'تم إضافة المستخدم بنجاح'
            })
        }, 1500);
    }


    render() {
        let loading = false;
        if (this.state.status === 'loading') {
            loading = true
        }
        return (
            <div>
                <ul className="navbar">
                    <li> إضافة مستخدم </li>
                    <li>
                        <Link to="/home">
                            <FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>
                        </Link>
                    </li>

                </ul>
                <form className="container py-3" onSubmit={this.onAddUser} >
                    <div className="row pt-3">
                        <div className="col-md-6">
                            <div className="mb-5">
                                <label className="form-label">الاسم الكامل</label>
                                <input type="text" required value={this.state.name} className="form-control" onChange={this.changeName} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label">الجهة الضامنة</label>
                                <select class="form-select" value={this.state.guarantor} onChange={this.changeGuarantor}>
                                    <option value="لم يحدد" selected>اختر الجهة</option>
                                    <option value="خاص">خاص</option>
                                    <option value="ضمان">ضمان</option>
                                    <option value="تعاونية">تعاونية</option>
                                    <option value="تأمين">تأمين</option>
                                </select>
                            </div>
                            <div className="mb-5">
                                <label className="form-label">صورة عن الهوية</label>
                                <input class="form-control mt-2" id="inputGroupFile02" type="file" required onChange={this.changeAvatar} name="myImage" accept="image/*" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-5">
                                <label className="form-label">المنطقة </label>
                                <input type="text" required value={this.state.company} className="form-control" onChange={this.changeCompany} />
                            </div>
                            <div className="mb-5">
                                <label className="form-label">الشارع</label>
                                <input type="text" required value={this.state.street} className="form-control" onChange={this.changeStreet} />
                            </div>
                            
                            <div className="mb-5">
                                <label className="form-label">رقم الهاتف</label>
                                <input type="Number" required value={this.state.phone} className="form-control" onChange={this.changePhone} />
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="التسجيل" className="btn btn-dark" /><span className="note px-4">{this.state.status}</span>
                    {loading ? (<div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>) : <div><br /></div>}
                </form>
            </div>
        )
    }
}

export default AddUser