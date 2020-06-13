import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Dashboard extends Component {
    render() {
        return (
            <Container>
                <form action="/dashboard/album" method="POST">
                    {/* <%- include('./partials/messages.ejs') %> */}
                    {/* <div className="form-group">
                        <label htmlFor="albumName">Create new album</label>
                        <input 
                            type="text" 
                            name="title" 
                            className="form-control" 
                            id="albumName"/>
                    </div> */}
                    <button className="btn" id="newAlbum-btn">Create a new album</button>
                </form>
                <br/>
                <h5 className="lead">Your Memory Albums</h5>
                <p>Render albums here</p>
            </Container>        
        )
    }
}

export default Dashboard;
