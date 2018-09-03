// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBVQMQOqPmnAloh2IwlouaOxFTHeWqtKkU",
    authDomain: "final-project-cafe-js.firebaseapp.com",
    databaseURL: "https://final-project-cafe-js.firebaseio.com",
    projectId: "final-project-cafe-js",
    storageBucket: "final-project-cafe-js.appspot.com",
    messagingSenderId: "517484061085"
  };
  firebase.initializeApp(config);


// Connect to Database
var database = firebase.database();

// create reservationData object which will be populated with user input

var reservationData = {};

// set the day when an option is clicked on

// when submitted, the name data should be set

$('.form-group button').on('click', function(e) {
  e.preventDefault();

  reservationData.date = $('#date').val();

  reservationData.name = $('#name').val();
  $('#name').val('');

  // create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');

  console.log(reservationData);
  reservationsReference.push(reservationData);
});



function getReservations () {
  
  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function (results) {
    
 // Get all reservations stored in the results we received back from Firebase
  var allReservations = results.val();
    
  // remove all list reservations from DOM before appending list reservations
  $('.reservations').empty();
    

// iterate (loop) through all reservations coming from database call

 for (var reservation in allReservations) { 

    // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        date: allReservations[reservation].date,
        reservationId: reservation
      };

  var source = $("#reserve-template").html();

  var template = Handlebars.compile(source);

  var reservationListItem = template(context);

  $('.reservations').append(reservationListItem);
   
    }

  });

}
// When page loads, get reservations
getReservations ();



$('.reservations').on('click', '.delete', function (e) {
  // Get the ID for the comment we want to update
  var id = $(e.target).parent().parent().data('id'); 

  // find comment whose objectId is equal to the id we're searching with
  var reservationsReference = database.ref('reservations/' + id);

  // Use remove method to remove the comment from the database
  reservationsReference.remove();
});

    

function initMap() {
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    center: {lat: 40.439564, lng: -79.892979},
    zoom: 10,
    scrollwheel: false,
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]


  });
  var marker = new google.maps.Marker({
    position: {lat: 40.439564, lng: -79.892979},
    map: map,
    title: 'Olga&#39;s Café'
  });
}