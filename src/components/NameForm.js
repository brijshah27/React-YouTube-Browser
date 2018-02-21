import React, { Component } from 'react';
import axios from 'axios';
import Results from './Results.js';
import config from '../config.js';
import Playlists from './Playlists.js';
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

const API_KEY = config.API_KEY;

class NameForm extends Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            loading:false,
            channelName:'',
            channelDescription:'',
            channelImage:'',
            channelId:null
        };
     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchYT = this.searchYT.bind(this);
    }

handleChange(event) {
    this.setState({
        channelName:'',
        channelDescription:'',
        value: event.target.value});
    //console.log('inside handleChange: '+event.target.value)
  }

  handleSubmit(event){
      this.searchYT(this.state.value);
      event.preventDefault();
  }

  searchYT(term){
      this.setState({
          loading:true
      });
      axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=='+this.state.value+'&type=channel&key='+API_KEY)
    .then( (response) =>{
      //console.log(response.data);
      console.log(response.data.items[0].snippet.description);
      this.setState({
        loading: false,
        channelName: response.data.items[0].snippet.title,
        channelDescription: response.data.items[0].snippet.description,
        channelImage: response.data.items[0].snippet.thumbnails.default.url,
        channelId: response.data.items[0].snippet.channelId
      });
    })
    .catch(function (error) {
      console.log(error);
    });

}
render() {
    return(
        <div>
            <form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
                <input type="submit" value={this.state.loading ? 'Loading...': 'Search'} />
            </form>
            
                    <div>
                            <Results
                            myapi_key = {API_KEY}
                            name = {this.state.channelName}
                            description = {this.state.channelDescription}
                            image = {this.state.channelImage}
                            ch_id = {this.state.channelId}
                            />   
                    </div>    
        </div>
    );
}

}

export default NameForm;
