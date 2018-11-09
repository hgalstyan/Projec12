function initMap(){
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const city = document.querySelector(".city");
    
    const geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': `${city.value}, us`}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            const latit = results[0].geometry.location.lat();
            const long = results[0].geometry.location.lng(); 
             const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: {lat: latit, lng: long} 
            }); 

            directionsDisplay.setMap(map);
            calculateAndDisplayRoute(directionsService, directionsDisplay);
          } else {
            alert("Something got wrong " + status);
          }
    });
    
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    var coordinates = document.querySelectorAll('.location');
    for (var i = 1; i < coordinates.length-1; i++) {
      
        waypts.push({
          location: coordinates[i].value,
          stopover: true
      });
    }

    directionsService.route({
      origin: coordinates[0].value,
      destination: coordinates[coordinates.length-1].value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }