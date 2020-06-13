import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Dashboard extends Component {
    render() {
        return (
            <Container>
                <form action="/dashboard/album" method="POST">
                    {/* <%- include('./partials/messages.ejs') %> */}
                    <div class="form-group">
                        <label for="albumName">Create new album</label>
                        <input 
                            type="text" 
                            name="title" 
                            class="form-control" 
                            id="albumName"/>
                    </div>
                    <button class="btn" id="newAlbum-btn">Create a new album</button>
                </form>
                <br/>
                <h5 class="lead">Your Memory Albums</h5>
                <p>Render albums here</p>
            </Container>        
        )
    }
}


