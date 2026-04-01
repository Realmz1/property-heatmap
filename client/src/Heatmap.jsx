import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Heatmap = () => {
  const [markersData, setMarkersData] = useState(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(5000000); // Default to a high number to show all

  useEffect(() => {
    // Fetch our processed points data
    fetch('/az_prices.json')
      .then(res => res.json())
      .then(data => {
        setMarkersData(data);
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

  // Function to determine color based on property price
  const getColor = (price) => {
    if (!price) return '#d3d3d3'; // Gray for no data
    return price > 1000000 ? '#800026' :
      price > 800000 ? '#BD0026' :
        price > 600000 ? '#E31A1C' :
          price > 400000 ? '#FC4E2A' :
            price > 300000 ? '#FD8D3C' :
              price > 200000 ? '#FEB24C' :
                price > 100000 ? '#FED976' :
                  '#FFEDA0';
  };

  if (!markersData) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading map data...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000,
        boxShadow: '0 0 15px rgba(0,0,0,0.2)'
      }}>
        <label htmlFor="priceFilter" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Max Price: ${maxPriceFilter.toLocaleString()}
        </label>
        <input
          id="priceFilter"
          type="range"
          min="100000"
          max="3000000"
          step="50000"
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
          style={{ width: '200px' }}
        />
      </div>
      <MapContainer
        center={[34.0489, -111.0937]} // Center of Arizona
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {markersData
          .filter(marker => marker.price <= maxPriceFilter)
          .map((marker, idx) => (
            <CircleMarker
              key={idx}
              center={[marker.lat, marker.lng]}
              pathOptions={{
                fillColor: getColor(marker.price),
                color: 'white',
                weight: 1,
                fillOpacity: 0.8,
                opacity: 1
              }}
              radius={8}
            >
              <Tooltip sticky>
                <div style={{ padding: '2px' }}>
                  <strong>{marker.city}, AZ {marker.zip}</strong><br />
                  Home Value: ${marker.price.toLocaleString()}
                </div>
              </Tooltip>
              <Popup>
                <strong>{marker.city}, AZ {marker.zip}</strong><br />
                Average Home Value: ${marker.price.toLocaleString()}
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000,
        boxShadow: '0 0 15px rgba(0,0,0,0.2)'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>AZ Property Values</h4>
        {[
          { limit: 1000000, label: '$1M+' },
          { limit: 800000, label: '$800K - $1M' },
          { limit: 600000, label: '$600K - $800K' },
          { limit: 400000, label: '$400K - $600K' },
          { limit: 300000, label: '$300K - $400K' },
          { limit: 200000, label: '$200K - $300K' },
          { limit: 100000, label: '$100K - $200K' },
          { limit: 0, label: '< $100K' }
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: getColor(item.limit + 1),
              marginRight: '10px',
              borderRadius: '50%',
              border: '1px solid white'
            }}></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
