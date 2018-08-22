# event-mapper-react-redux-app

React-Redux application with a Rails API backend for viewing earthquake, hurricane,
and volcano data. The geolocations of all events are displayed using Google Maps.

## Data Sources

**Earthquakes**  
https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

**Hurricanes**  
https://www.wunderground.com/hurricane/hurrarchive.asp

**Volcanoes**  
http://volcano.oregonstate.edu/oldroot/volcanoes/alpha.html

## Usage

To use this application, clone the repository and

(1) run `npm --prefix ./client/ install ./client/`
> Installs all dependencies for the client application.

(2) run `rails db:migrate db:seed`
> Creates the schema and seeds the API database with 150+ hurricanes and 1500+ volcanoes.

(3) run `rake start`
> Boots the client application and API server via Foreman.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/rhhaynes/event-mapper-react-redux-app.
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected
to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The application is available as open source under the terms of the
[MIT License](https://github.com/rhhaynes/event-mapper-react-redux-app/blob/master/LICENSE.txt).

## Code of Conduct

Everyone interacting in the MyTravels project’s codebases, issue trackers, chat rooms and mailing lists is expected
to follow the [code of conduct](https://github.com/rhhaynes/event-mapper-react-redux-app/blob/master/CODE_OF_CONDUCT.md).
