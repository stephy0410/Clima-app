import React, { useState } from "react";


const api ={
  key:"939af99380e8a0a3284348159ee8bb5f",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery]= useState('');
  const[ weather, setWeather]= useState({});
//evt = a evento
  const search = evt => {
    if (evt.key === "Enter"){
      //Agarra del API el clima el altera en unidades metricas y hace un request al api key
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      //Se tiene la respuesta en json
      .then(result => result.json() )
      //Hace otra promesa que va a ser igual al resultado de setWeather
      .then(res => {
        setQuery('');
        setWeather(res);
        console.log(res);
      });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio", "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    let days = ["Lunes","Martes","Miércoles","Jueves","Viernes:)","Sábado","Domingo"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={
      (typeof weather.main != "undefined")
       ? ((weather.main.temp > 16)
       ? 'App warm' 
       : 'App')
    : 'App'}>
     
     <main>
        <div className="search-box">
          <input
          type="text"
          className="searchbar"
          placeholder="Busca..."
          onChange={e=> setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ?(
          <div>
            <div className="locationbox">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weatherbox">
          <div className="temperature">
           {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
        </div></div>
        
):('')};
      </main>
   
    </div>
  );
}

export default App;
