# Overview

As a software engineer, I am constantly exploring new ways to visualize large datasets and improve my frontend engineering skills. To further my learning in spatial data visualization and modern UI development, I built this interactive mapping project.

An interactive property value heatmap mapping the latest real estate prices across Arizona, built with React and Leaflet. Users can interact with the map by panning, zooming, and hovering over specific ZIP codes to view the latest home value estimates. The data pipeline takes a raw CSV dataset from the Zillow Home Value Index (ZHVI), filters out everything except Arizona properties, and merges it with a digital boundary map (GeoJSON) so the application can color "inside the lines" of each ZIP code.

The main purpose of writing this software is to gain hands-on experience mapping geographical structures using Leaflet and to handle the end-to-end flow of raw data ingestion, transformation, and interactive frontend presentation.

[Software Demo Video](https://canva.link/glvr9r2xbtq217z)
# Property Heatmap 🏠

An interactive property value heatmap mapping the latest real estate prices across Arizona, built with React and Leaflet. 

## 🗺️ How it Works

The project consists of a data processing pipeline and a React-based frontend mapping application. 

1. **Data Processing**: A Node.js parsing script reads raw dataset CSV files and filters out all entries that aren't located in Arizona (`AZ`). It then cross-references the ZIP codes with the `zipcodes` packages to retrieve the latest property value estimates along with the latitude and longitude parameters.
2. **Frontend Output**: The structured output JSON is loaded asynchronously into a responsive Vite + React web interface.
3. **Interactive Map**: Leveraging `react-leaflet`, the data is visualized as color-coded markers or geometric boundaries (GeoJSON) corresponding to the localized property values, giving users a quick bird's-eye view of housing markets across the state.

## 📊 Data Sources

- **Housing Prices**: [Zillow Home Value Index (ZHVI)](https://www.zillow.com/research/data/). The specific dataset used represents Single-Family Homes and Condos (Mid-Tier).
- **Geocoding**: The [zipcodes](https://www.npmjs.com/package/zipcodes) NPM package is used to translate ZIP codes into geographical coordinates (Latitude/Longitude).
- **GeoJSON Boundaries**: Think of a `.geojson` file as a digital coloring book. Instead of just putting a single dot on a map, this file gives our app the exact outlines of every ZIP code in Arizona. This lets us color inside the lines of those shapes based on the property price!

## 🚀 Steps to Run

### 1. Process the Data
Ensure you have the ZHVI CSV file (`Zip_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv`) in the root directory. Then, generate the consumed `az_prices.json` and geolocations:

```bash
npm install csv-parser zipcodes
node process_data.js
```

### 2. Start the Application
To run the React web application locally:

```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🛠️ Tech Stack
- **Data Pipeline**: Node.js, `csv-parser`
- **Frontend Framework**: React 19, Vite
- **Mapping**: Leaflet, React-Leaflet
