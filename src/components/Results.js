import React, { Component } from 'react';
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = require('react-router-dom').Link;

class Results extends Component{
  constructor(props){
    super(props);
    // this.state = {
    //
    // };
  }
  render(){
    var name = this.props.name;
    var Channel = this.props.description;
    var img = this.props.image;
    return(
      <div>
        {name &&
        <h1>You searched for: {this.props.name}</h1>}
        {Channel &&
        <p>
          Channel description: {this.props.description}
        </p>}
        {img &&
        <div>
          <Link to = '/playlists'>
            <img src = {this.props.image}
                alt={'Avatar for ' + this.props.name}
            />
          </Link>
          </div>
        }

      </div>
    );
  }

}

export default Results;