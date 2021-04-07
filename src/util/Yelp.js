const apiKey = 'IdhVrzqcR8sQDmgHEQhK_idkFZHmR74mGKjahDhblr5Yp-Q3ZwVewKas0RtNO_hgTpVvXzGPoSKQ-5HiFrhEqFKhfHdsv--wO4UbDBFp6OqVJmhS-He0cHOyFD87X3Yx';

let Yelp = {
  search: (term, location, sortby) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortby}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if(jsonResponse.businesses){
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
            url: business.url
          }
        })
      }
    })
  }
}

export default Yelp