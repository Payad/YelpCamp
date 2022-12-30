// mapboxgl.accessToken = 'pk.eyJ1IjoicGF5YWQxMDExIiwiYSI6ImNsYW9kNHlkMTB5NGgzeG1peHJjdTJsMGIifQ.OL-D59ro36hqNtKD-D7Nag';
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9, // starting zoom
});
// campground = JSON.parse(campground);

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
// .setLngLat(-74.5, 40)
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offeset: 25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
)
)
.addTo(map)