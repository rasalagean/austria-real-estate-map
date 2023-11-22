# AustriaRealEstateMap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Docs
District GeoJson data from: https://github.com/ginseng666/GeoJSON-TopoJSON-Austria/blob/master/2021/simplified-95/bezirke_95_geo.json \
Details on choropleth map design: https://handsondataviz.org/design-choropleth.html \
Mapbox documentation: https://docs.mapbox.com/ \
Price data from: https://www.finanz.at/immobilien/immobilienpreise/

In order to start locally, you will have to first create an account at mapbox and request an access token. \
After that add the access token to the environment.ts.
You can also create a custom style for the map at studio.mapbox.com and at that to the environmen.ts. \
For testing purposes you can just use a default map like: \
style: 'mapbox://styles/mapbox/light-v11'

You can find a working demo at https://rasalagean.github.io/austria-real-estate-map/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
