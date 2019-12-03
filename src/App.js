import React from 'react';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
require('dotenv').config();

const API_ID = process.env.REACT_APP_API_KEY;

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined   
  }

  // this func is called on form submit
  //arrow fnc allows this keyword to be bound to 
  //the app class
  //e parameter stands for event
  //e.preventDefault signifies a single page app(which react does)
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const query = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_ID}&units=metric` 
    // backticks allow us to inject variables for 
    // template strings
    const api_call = await fetch(query);
    const data = await api_call.json();
    const code = data.cod;
    const flooredCode = Math.floor(code/100);

    if (city && country && flooredCode === 2){
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description
      });
    }
    else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter corrrect values."
      });
    }
    
  }

  render(){
    return (
      <div>
        <Titles/>
        {/* App comp passes getWeather fnc to Form comp */}
        <Form getWeather={this.getWeather}/>
        <Weather 
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
