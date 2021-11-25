import React, { Component } from 'react';
import GetOne from './getOne'
class Show extends Component {
    state = {
        user: [],
        help: []
    }

    getOneUser = async () => {
        const data = {
            "name": this.props.location.state
        }
        fetch('http://localhost:8080/api/get-one', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {

                this.setState({
                    user: data.result
                })
            })

    }
    getHelp = async () => {
        fetch('http://localhost:8080/api/get-help', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    help: data.result
                })

            })
    }

    componentDidMount() {
        this.getOneUser();
        this.getHelp();
    }
    render() {
        console.log(this.state.help)
        return (
            <div>
                <GetOne
                    user={this.state.user}
                    help ={this.state.help}
                />
            </div>
        )
    }
}

export default Show;