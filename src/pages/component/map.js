import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapComponent = () => {
  const mapProps = {
    center: {
      lat: 40.7128,
      lng: -74.0060
    },
    zoom: 10
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyASb48cA8SPa1LM3E_awK66AftoIyWMXZk' }}
        defaultCenter={mapProps.center}
        defaultZoom={mapProps.zoom}
      />
    </div>
  );
};

export default MapComponent;