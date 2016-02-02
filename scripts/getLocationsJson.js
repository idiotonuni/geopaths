var latLongArray = [];
var ajaxComplete = 0; //Track how many times ajax complete has been called
var loadedMap = true;
var firstLat;
var firstLng;
$(document).ready(function() {
    // url for gmaps https://maps.googleapis.com/maps/api/geocode/json?address=fallbrook&components=postal_code:92028
    //get H2 from page becuase the h1 will always be the token name
    var tokenName = $("h2").text();
    var getLocationNamesUrl = "../functions.php?getTokenLocations=true&tokenName="+tokenName;
    var locationNamesJSON;
    //$.getJson(getLocationNamesUrl,function(data){
    //    locationNamesJSON = data;
    //});
    $.ajax({
        dataType: "json",
        url: getLocationNamesUrl,
        success: function(data){
            locationNamesJSON = data;
            //alert(JSON.stringify(data));
            var locations = data.locations;
            for(var i = 0; i < locations.length; i++){
                var stringArray = locations[i].split(",");
                var zipCode = stringArray[1];
                zipCode = zipCode.substr(4);
                //alert(zipCode);
                city = stringArray[0];
                gMapsUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&components=postal_code:"+zipCode;
                $.ajax({
                    dataType: "json",
                    url: gMapsUrl,
                    success: function(data){
                        //alert(JSON.stringify(data));
                        var latVar = data.results[0].geometry.location.lat;
                        var lngVar = data.results[0].geometry.location.lng;
                        //alert(lat+", "+lng);
                        var tempObj = {lat: latVar, lng: lngVar};
                        latLongArray.push(tempObj);
                    }
                })
            }
        },
    });
});
$(document).ajaxStop(function() {
    if(ajaxComplete == 0){
        ajaxComplete++;
        alert(latLongArray);
        initMap();
    }else{
        alert(ajaxComplete);
    }
});


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 0, lng: -180},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var flightPlanCoordinates = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];
  var flightPath = new google.maps.Polyline({
    path: latLongArray,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}

initMap();
