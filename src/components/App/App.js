import React, { Component } from 'react'
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar'
import Yelp from '../../util/Yelp'



export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      businesses: [],
      userLat: null,
      userLong: null
    }

    this.searchYelp = this.searchYelp.bind(this);
  }
 

  searchYelp(term, location, sortBy){
    Yelp.search(term, location, sortBy)
      .then(businesses => {
        this.setState({
          businesses: businesses
        })
      });
  }

  // getLatLong(){
  //   let lat, long;
    
   

  //   return lat;
  // }

  //TODO: need to get lat and long to update in set state
  componentDidMount() {

    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
        async position => {
          this.setState({
            userLat: position.coords.latitude, 
            userLong: position.coords.longitude
          });
        }
      );
    } else {
      console.log("Not Available");
    }
  }



  render() {
    return (
      <div className="App">
        <h1>Restaurant Search</h1>
        <SearchBar searchYelp={this.searchYelp} userLat={this.state.userLat} userLong={this.state.userLong}/>
        <BusinessList businesses={this.state.businesses} />
      </div>
    )
  }
}

export default App;