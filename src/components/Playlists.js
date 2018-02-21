import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Iframe from 'react-iframe';
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
        console.log(playlist.channelID);
        axios.get('https:www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2Cplayer&channelId='+playlist.channelID+'&maxResults=25&key='+API_KEY)
        .then( (response) =>{
          console.log("video id: "+response.data.items[0].player.embedHtml);
          let res = []
          for(let i=0; i<10;i++){
            res.push(response.data.items[i].player.embedHtml)
          }
          this.setState({
            id: playlist.channelID,
            iframe: res
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
        console.log("data is"+data)
        return(
          <div>
        <h1>playlist id is {this.state.id}</h1>
        <div>
          <ul>
          {data.map(function(name, index){
                    return <li type="1" key={ index }>{ReactHtmlParser(name)}</li>;
                  })}
            </ul>
        </div>
        </div>
        )
    }
}
export default playlist;