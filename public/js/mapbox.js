const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
    'pk.eyJ1IjoiY2hhb3Ntb3MiLCJhIjoiY2w1NzRka200MGJ6NjNkbnJiZ3p2bmE0dSJ9.TXqs-zdQ4imeEM5q6Qgxkw';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/chaosmos/cl57609oo005m14pn7xcnjhz2', // style URL
  center: [ -118.113491, 34.111745 ], // starting position [lng, lat]
  zoom: 10, // starting zoom
  scrollZoom: false
  //projection: 'globe' // display the map as a 3D globe
});

map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // create marker
  const el = document.createElement('div');
  el.className = 'marker';
  
  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  }).setLngLat(loc.coordinates)
    .addTo(map);
  
  // add popup
  new mapboxgl.Popup({
    offset: 30
  })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
  // extend map bounds to include current location
  bounds.extend(loc.coordinates)
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 100,
    left: 100,
    right: 100
  }
});

// map.on('style.load', () => {
//   map.setFog({
//     color: 'rgb(186, 210, 235)', // Lower atmosphere
//     'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
//     'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
//     'space-color': 'rgb(11, 11, 25)', // Background color
//     'star-intensity': 0.6 // Background star brightness (default 0.35 at low
//                           // zoooms )
//   });
// });
