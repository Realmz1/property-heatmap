# Overview

As a software engineer, I am constantly exploring new ways to visualize large datasets and improve my frontend engineering skills. To further my learning in spatial data visualization and modern UI development, I built this interactive mapping project.

This software is an interactive property value heatmap that renders median real estate prices across the state of Arizona. Users can interact with the map by panning, zooming, and hovering over specific ZIP codes to view the latest home value estimates. The data pipeline takes a raw CSV dataset from the Zillow Home Value Index (ZHVI), filters out everything except Arizona properties, and merges it with a digital boundary map (GeoJSON) so the application can color "inside the lines" of each ZIP code. 

The main purpose of writing this software is to gain hands-on experience mapping geographical structures using Leaflet and to handle the end-to-end flow of raw data ingestion, transformation, and interactive frontend presentation.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

The software was developed using Visual Studio Code. The data ingestion script runs on Node.js, while the front-side map is powered by Vite, providing a fast and highly-optimized modern development environment.

The project is written in JavaScript and React. Key libraries include:
* **Frontend**: `react` (v19), `leaflet`, and `react-leaflet` to manage the interactive map and GeoJSON layers.
* **Backend Pipeline**: `csv-parser` to stream-read the massive Zillow datasets, and the `zipcodes` package to fetch latitude/longitude coordinates.

# Useful Websites

* [React Documentation](https://react.dev/)
* [React-Leaflet Documentation](https://react-leaflet.js.org/)
* [Zillow Research Data](https://www.zillow.com/research/data/)
* [GeoJSON Format Specification](https://geojson.org/)

# Future Work

* Add a state-selector dropdown to dynamically process and display data for all 50 US states.
* Implement a time-series slider to visualize how housing prices have changed historically over the last 10 years.
* Improve the Map's color legend to dynamically scale and adjust based on the dataset's minimum and maximum values.