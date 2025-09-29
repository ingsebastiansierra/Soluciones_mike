/*!
=========================================================
* FoodHut Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

new WOW().init();

function initMap() {
    // Coordenadas para Bogotá, Colombia (Zona Rosa)
    var restaurantLocation = {lat: 4.667426, lng: -74.054028};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: restaurantLocation
    });
    var marker = new google.maps.Marker({
      position: restaurantLocation,
      map: map,
      title: 'Sabor Colombiano'
    });
 }
