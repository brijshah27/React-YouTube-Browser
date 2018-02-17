import React, { Component } from 'react';
//import NameForm from './NameForm.js';

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
    return(
      <div>
        {name &&
        <h1>You searched for: {this.props.name}</h1>}
        {Channel &&
        <p>
          Channel description: {this.props.description}
        </p>}

      </div>
    );
  }

}

export default Results;