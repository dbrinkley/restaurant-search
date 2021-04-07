import React, { Component } from 'react'
import './SearchBar.css';
import locationData from '../../resources/us-zip-code-latitude-and-longitude.json';

//Yelp api sort options


class SearchBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match',
    }

     this.sortByOptions = {
      'best_match': 'Best Match',
      'rating': 'Highest Rated',
      'review_count': 'Most Reviewed'
    }

    this.sortDistances = [1,2,5,10,25,50];
    this.sortDistancesDefault = this.sortDistances[2];

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.findZipCode = this.findZipCode.bind(this);
  }

  getSortByClass(sortByOption){
    if(sortByOption === this.state.sortBy){
      return 'active';
    } else {
      return '';
    }
  }


  handleSortByChange(sortByOption){
    this.setState(() => ({
      sortBy: sortByOption
    }))
    if(this.state.term !== '' && this.state.location !== ''){
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }
  }

  handleTermChange(e){
    this.setState({
      term: e.target.value
    })
  }

  handleLocationChange(e){
    this.setState({
      location: e.target.value
    })
  }

  handleSearch(e){
    e.preventDefault();
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
  }

  handleEnterPress(event){
    if (event.charCode === 13) {
      this.handleSearch(event);
    } 
  }


  //Pre: assumes sortByOptions object with yelp api sort options exists
  //Post: returns list items with each sort by option for yelp api to help future proof against yelp api changes
  renderSortByOptions(){
    return Object.keys(this.sortByOptions).map(sortByOption => {
      return <li key={this.sortByOptions[sortByOption]} className={this.getSortByClass(sortByOption)} onClick={this.handleSortByChange.bind(this, sortByOption)}>{this.sortByOptions[sortByOption]}</li>;
    });
  }


  rendorDistanceOptions(){
    return this.sortDistances.map(distance => {
      if(distance === this.sortDistancesDefault){
        return <option value={distance}key={distance} selected>{distance} Miles</option>
      } else {
        return <option value={distance} key={distance}>{distance} Miles</option>
      }
      
    });
  }
  

  
  findZipCode(e){
    e.preventDefault();

    let lat = this.props.userLat;
    let long = this.props.userLong;

    lat = lat.toFixed(6);
    long = long.toFixed(6);

    let num = 0;

    locationData.features.forEach((element, index) => {
      if(Math.abs(lat - element.properties.latitude) < Math.abs(lat - locationData.features[num].properties.latitude) &&     
          Math.abs(long - element.properties.longitude) < Math.abs(long - locationData.features[num].properties.longitude)){
          num = index;
      }
    });

    this.setState({
      location: locationData.features[num].properties.zip
    })

    // this.handleLocationChange(locationData.features[num].properties.city);
    console.log(locationData.features[num].properties.zip);
  }


  render() {

    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange}  onKeyPress={this.handleEnterPress}/>
          <input placeholder="Where?" onChange={this.handleLocationChange}  onKeyPress={this.handleEnterPress} value={this.state.location} />
          <select>{this.rendorDistanceOptions()}</select>
          <p onClick={this.findZipCode}>Location</p>
        </div>
        <div className="SearchBar-submit">
          <span onClick={this.handleSearch}>Let's Go</span>
          
        </div>
      </div>
    )
  }
}

export default SearchBar
