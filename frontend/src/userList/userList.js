import React, { Component } from 'react';
import axios from 'axios';

class UserList extends Component {
    constructor(props){
        super(props)
        this.state = {
            lists: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/users.json')
        .then(response => {
            this.setState({
                lists: response.data.data
            })
        })
        .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="lists-container">
                {this.state.lists.map(list => {
                    return (
                        <div className="single-list" key={list.id}>
                            <h4>{list.name}</h4>
                            <p>{list.email}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}  

export default UserList;
