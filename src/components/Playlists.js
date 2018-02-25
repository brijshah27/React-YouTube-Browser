import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Iframe from 'react-iframe';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
var queryString = require('query-string');
const API_KEY = config.API_KEY;

class playlist extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id : '',
            iframe :  []
        }
      }
    componentDidMount() {
        var playlist = queryString.parse(this.props.location.search);
        this.setState({
          id: playlist.channelId
        });
        console.log(playlist.channelId);
        axios.get('https:www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2Cplayer&channelId='+playlist.channelId+'&maxResults=25&key='+API_KEY)
        .then( (response) =>{
          console.log("req url: "+'https:www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2Cplayer&channelId='+playlist.channelID+'&maxResults=25&key='+API_KEY);
          console.log(response.data.items[0].snippet.channelTitle)
          let res = []
          for(let i=0; i<10;i++){
            res.push(response.data.items[i].player.embedHtml)
          }
          this.setState({
            id: playlist.channelID,
            iframe: res,
            title: response.data.items[0].snippet.channelTitle
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    render(){
      //var playlist = queryString.parse(this.props.location.search);
       // var id = this.state.id;
        //console.log(id);
        let data = this.state.iframe
        const style = {
          margin: 20,
          minWidth:'300px',
          textAlign: 'center',
          display: 'inline-block',
        };
        const header={
          display: 'inline-block',
          margin: 20,
          textAlign: 'center',
          padding:'20px'
        }
        //console.log("data is"+data)
        return(
          <div>
          <MuiThemeProvider>
        <Paper style={header} zDepth={2}>Playlist for: <b>{this.state.title}</b></Paper>
        <div>
          <ul>
          {data.map(function(name, index){
                    return (
                      <div>
                      <Paper style={style} zDepth={5}>
                      {ReactHtmlParser(name)}
                      </Paper>
                    </div>);
                  })}
                  
            </ul>
            
        </div>
        </MuiThemeProvider>
        </div>
        )
    }
}
export default playlist;