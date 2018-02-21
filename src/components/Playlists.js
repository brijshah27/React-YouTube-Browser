import React, { Component } from 'react';
var queryString = require('query-string');

// function showPlaylists (props) {
//     //var playlist = queryString.parse(this.props.location.search);
//     console.log(this.props)
//     return (
//     <div>
//       <h1>Playlist goes here</h1>
//     </div>
//   )
// }

class playlist extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id : ''
        }
      }
    componentDidMount() {
        var playlist = queryString.parse(this.props.location.search);
        console.log(playlist);

        this.setState({
              id : playlist.channelID
          })
    }
    render(){
      //var playlist = queryString.parse(this.props.location.search);
       // var id = this.state.id;
        //console.log(id);
        return(
        <h1>playlist id is {this.state.id}</h1>
        )
    }
}
export default playlist;