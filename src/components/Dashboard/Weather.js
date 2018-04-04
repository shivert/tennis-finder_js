import React from "react";
import { Card } from "antd";
import ReactWeather from "react-open-weather";
import "react-open-weather/lib/css/ReactWeather.css";

export default class Weather extends React.Component {
  state = { lat: "43.4643", long: "-80.5204" };
  componentDidMount() {
    const location = navigator.geolocation.getCurrentPosition(position => {
      this.setState(
        {
          lat: position.coords.latitude.toString(),
          long: position.coords.longitude.toString()
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }
  render() {
    //
    return (
      <Card title="Weather">
        <ReactWeather
          forecast="today"
          apikey="4f6dc560154148258bc172105180404"
          type="geo"
          lon={this.state.long}
          lat={this.state.lat}
        />
      </Card>
    );
  }
}
