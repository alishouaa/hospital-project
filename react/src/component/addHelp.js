import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import image from '../font/hanan.jpg'

class AddUser extends Component {
    state = {
        pricetotal: '',
        pricehelp: '',
        type: '',
        payment: '0',
        status: ''
    }

    ChangePriceTotal = (e) => { this.setState({ pricetotal: e.target.value }) }
    ChangePriceHelp = (e) => { this.setState({ pricehelp: e.target.value }) }
    ChangeType = (e) => { this.setState({ type: e.target.value }) }


    onAddUser = async (e) => {
        e.preventDefault();
        this.setState({
            status: 'loading'
        })

        const data = {
            "type": this.state.type,
            "priceTotal": this.state.pricetotal,
            "priceHelp": this.state.pricehelp
        }

        fetch(`http://localhost:8080/api/post-help/${this.props.location.state}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
        let timer = null
        timer = setTimeout(() => {
            this.setState({
                status: 'تم إرسال المساعدة بنجاح',
                payment: this.state.pricetotal - this.state.pricehelp
            })
        }, 1800);

        // .then(res => {
        //     e.target.name.value = '';
        //     e.target.father.value = '';
        //     e.target.mother.value = '';
        //     e.target.company.value = '';
        //     e.target.street.value = '';
        //     e.target.guarantor.value = '';
        // })
    }


    render() {
        let loading = false;
        if (this.state.status === 'loading') {
            loading = true
        }
        return (
            <div>
                <ul className="navbar">
                    <li> إضافة مساعدة </li>
                    <li>
                        <Link to="/get-user">
                            <FontAwesomeIcon className="mx-2" icon={faArrowLeft}></FontAwesomeIcon>
                        </Link>
                    </li>

                </ul>
                <form className="container py-3" onSubmit={this.onAddUser} >
                    <div className="row pt-3">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">نوع العمل الطبي</label>
                                <select class="form-select" value={this.state.type} onChange={this.ChangeType}>
                                    <option value="لم يحدد" selected>اختر العمل</option>
                                    <option value="صورة أشعة">أشعة</option>
                                    <option value="مختبر">مختبر</option>
                                    <option value="طوارئ">طوارئ</option>
                                    <option value="عملية جراحية">عملية جراحية</option>
                                    <option value="ولادة">ولادة</option>

                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">المبلغ الكامل</label>
                                <input type="Number" required value={this.state.pricetotal} className="form-control" onChange={this.ChangePriceTotal} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">قيمة المساعدة </label>
                                <input type="Number" required value={this.state.pricehelp} className="form-control" onChange={this.ChangePriceHelp} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">قيمة المبلغ المتوجب : </label>
                                <span style={{ color: "brown" }} className="mx-3 note">{this.state.payment}</span>
                            </div>
                            <input type="submit" value="ارسال" className="btn btn-dark" /><span className="note px-4">{this.state.status}</span>
                            {loading ? (<div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>) : <div><br /></div>}

                        </div>
                        <div className="col-md-4">
                            <img src={image} className="w-100 p-5" />
                        </div>
                    </div>

                </form>
                <hr />
            </div>
        )
    }
}

export default AddUser