$(document).ready(function(){function e(i){$("#location").val(i)}"geolocation"in navigator&&navigator.geolocation.getCurrentPosition(function(o){$(".submit").prop("disabled",!0);var t=o.coords.latitude,a=o.coords.longitude,d="https://maps.googleapis.com/maps/api/geocode/json?latlng="+t+","+a+"&sensor=true",n=t+","+a;$("#latlng").val(n);$.ajax(d).done(function(o){var t=o.results,a=!1;for(i=0;i<t.length;i++)if(!(t[i].types.indexOf("postal_code")<0)){e(t[i].formatted_address),$(".hideWhenLocated").hide(500),$(".submit").prop("disabled",!1),a=!0;break}if(0==a)for(i=0;i<t.length;i++)if(!(t[i].types.indexOf("administrative_area_level_2")<0)){e(t[i].formatted_address),$(".hideWhenLocated").hide(500),$(".submit").prop("disabled",!1),a=!0;break}}).fail(function(){$(".submit").prop("disabled",!1)})}),setTimeout(function(){$(".submit").prop("disabled",!1)},15e3)});
