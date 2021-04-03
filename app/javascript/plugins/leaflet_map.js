import "leaflet";

const leafletMap = () => {
  const leafletMap = document.getElementById('leaflet_map');
  if (leafletMap) {
    let zoom = leafletMap.getAttribute("data-zoom") || 13;
    let lat = leafletMap.getAttribute("data-lat")|| 48.8534;
    let lon = leafletMap.getAttribute("data-lon") || 2.3488;
    let address = leafletMap.getAttribute("data-address") || "Paris, France";
    let icon = leafletMap.getAttribute("data-icon");
    var lmap = L.map(leafletMap).setView([lat, lon], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & <a href="https://mapicons.mapsmarker.com">Maps Icons Collection</a>'
    }).addTo(lmap);
    if(icon) {
      let centerIcon = new L.icon({
        iconUrl: icon,
        iconSize:     [32, 37],
        iconAnchor:   [16, 37],
        popupAnchor:  [0, -37]
      })
      L.marker([lat, lon], { icon: centerIcon }).addTo(lmap).bindPopup(address);
    } else {
      L.marker([lat, lon]).addTo(lmap).bindPopup(address);
    }
    let border = leafletMap.getAttribute("data-border");
    if(border) {
      let bounds = JSON.parse(border);
      L.rectangle(bounds, {color: "#000e79", weight: 1, fill: false}).addTo(lmap);
      lmap.fitBounds(bounds);
      lmap.panTo([lat, lon]);
    }
    let leafletMarkers = leafletMap.getElementsByClassName('leaflet-marker');
    for (let i = 0; i < leafletMarkers.length; ++i) {

      let leafletMarker = leafletMarkers[i];
      let markerLat = leafletMarker.getAttribute("data-lat");
      let markerLon = leafletMarker.getAttribute("data-lon");
      let markerIcon = leafletMarker.getAttribute("data-icon");
      let markerText = leafletMarker.innerHTML ||'';
      if(markerLat && markerLon) {
        if(markerIcon) {
          let icon = new L.icon({
            iconUrl:      markerIcon,
            iconSize:     [32, 37],
            iconAnchor:   [16, 37],
            popupAnchor:  [0, -37]
          })
          L.marker([markerLat, markerLon], { icon: icon }).addTo(lmap).bindPopup(markerText);
        } else {
          L.marker([markerLat, markerLon]).addTo(lmap).bindPopup(markerText);
        }
      }
    }
  }
};

export { leafletMap };