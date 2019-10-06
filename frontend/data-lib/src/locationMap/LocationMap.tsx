import React from 'react';
// @ts-ignore
import L from 'leaflet';

const style = {
  width: '100%',
  height: '300px'
};

export class LocationMap extends React.Component {

  componentDidMount() {
    // create map
    let map = L.map('map', {
      center: [58.378025, 26.728493],
      zoom: 14,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
    L.marker([58.378025, 26.728493]).addTo(map);
  }
  render() {
    return (
      <div id="map" style={style}></div>
    );
  }
}

