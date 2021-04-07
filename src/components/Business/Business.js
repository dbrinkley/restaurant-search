import React, { Component } from 'react'
import './Business.css'


class Business extends Component {
  constructor(props){
    super(props);

    this.handleImgclick = this.handleImgclick.bind(this);
  }


  //create url for google maps app
  urlEncodeAddress() {
    let url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.props.business.name)}+${encodeURIComponent(this.props.business.address)}+${encodeURIComponent(this.props.business.city)} +${encodeURIComponent(this.props.business.state)}+${encodeURIComponent(this.props.business.zipCode)}`;
    url = url.replace(" ", "+");
    return url;
  }

  handleImgclick(){
    window.open(this.props.business.url);
  }


  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <img src={this.props.business.imageSrc} alt={this.props.business.name} onClick={this.handleImgclick}/>
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <a href={this.urlEncodeAddress()} target="_blank" rel="noopener noreferrer">
              <p>{this.props.business.address}</p>
              <p>{this.props.business.city}</p>
              <p>{this.props.business.state} {this.props.business.zipCode}</p>
            </a>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">{this.props.business.rating} stars</h3>
            <p>{this.props.business.reviewCount} reviews</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Business
