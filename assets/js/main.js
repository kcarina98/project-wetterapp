document.querySelector(".search-button").addEventListener("click", () => {
  console.log("Hellooooooooo :-)");
  //- damit bei jedem Click die vorherige Wetterausgabe gelöscht wird
  let daten = document.querySelector(".daten");
  daten.innerHTML = "";

  // input Felder
  let city = document.querySelector("#search").value;
  let countrycode = document.querySelector("#country").value;
  let plz = Number(document.querySelector("#plz").value);

  let cityName = document.querySelector(".cityname");
  cityName.innerHTML = city;

  // variable, damit sich der Background ändern kann
  const background = document.querySelector("body");

  // Fehlermeldung, falls Eingabe fehlt
  if (city == "" && plz == 0 && countrycode == "") {
    daten.innerHTML = "Bitte gib deine Stadt oder Postleitzahl ein!";
    cityName.style.display = "none";
    daten.style.display == "none";
  } else if (city == "" && plz != 0 && countrycode == "") {
    daten.innerHTML = "Bitte gib noch deinen Ländercode (bspw. DE) ein! ";
    cityName.style.display = "none";
    daten.style.display == "none";
  } else if (city == "" && plz == 0 && countrycode != "") {
    daten.innerHTML = "Bitte gib noch deine PLZ ein! ";
    cityName.style.display = "none";
    daten.style.display == "none";
  } else {
    daten.innerHTML = "";
  }

  //   # Wenn der User den Städtenamen eingibt
  if (city != "") {
    //- Längen und Breitengrade mit Hilfe von API holen
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c888edb7ac6e13417f7d627546b08633`
    )
      .then((response) => response.json())
      .then((data1) => {
        let grade = data1;

        // -Längen- und Breitengrade herausfinden
        grade.forEach((country) => {
          let lat = country.lat;
          let lon = country.lon;

          //   * Wetterdaten mit Hilfe von anderer API und den Längen- und Breitengraden ziehen
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c888edb7ac6e13417f7d627546b08633&units=metric&lang=de`
          )
            .then((response) => response.json())
            .then((data2) => {
              // damit das Feld für die Wetterdaten angezeigt wird
              daten.style.display = "block";

              let weatherItem = document.createElement("div");

              //- Daten aus API
              let tempMin = data2.main.temp_min.toFixed(0);
              let tempFixed = data2.main.temp.toFixed(0);
              let tempMax = data2.main.temp_max.toFixed(0);

              let bes = document.createElement("p");
              bes.textContent = `${data2.weather[0].description}`;
              weatherItem.appendChild(bes);

              let temperatur = document.createElement("p");
              temperatur.textContent = `${tempFixed} °C`;
              weatherItem.appendChild(temperatur);

              let tempMin2 = document.createElement("p");
              tempMin2.textContent = `Die Temperatur liegt heute zwischen ${tempMin} °C und ${tempMax} °C `;
              weatherItem.appendChild(tempMin2);

              let hum = document.createElement("p");
              hum.textContent = `Luftfeuchtigkeit: ${data2.main.humidity}%`;
              weatherItem.appendChild(hum);

              let windy = document.createElement("p");
              windy.textContent = `Windgeschwindigkeit: ${data2.wind.speed} km/h`;
              weatherItem.appendChild(windy);

              let coord = document.createElement("p");
              coord.textContent = `Längen- und Breitengrade: ${lat};${lon}`;
              weatherItem.appendChild(coord);

              document.querySelector(".daten").appendChild(weatherItem);

              // Background ändern, mit Hilfe der Description
              if (data2.weather[0].description === "Klarer Himmel") {
                background.style.backgroundImage =
                  "url('https://images.unsplash.com/photo-1517758478390-c89333af4642?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80')";
              } else if (data2.weather[0].description == "Ein paar Wolken") {
                background.style.backgroundImage =
                  "url('https://images.unsplash.com/photo-1517758478390-c89333af4642?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80')";
              } else if (data2.weather[0].description == "Mäßig bewölkt") {
                background.style.backgroundImage =
                  "url('https://images.unsplash.com/photo-1560585942-9cf9888d5076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')";
              } else if (
                data2.weather[0].description == "Überwiegend bewölkt"
              ) {
                background.style.backgroundImage =
                  "url('https://images.unsplash.com/photo-1614959909713-128c622fad23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80')";
              } else if (data2.weather[0].description == "Bedeckt") {
                background.style.backgroundImage =
                  "url('https://images.unsplash.com/photo-1614959909713-128c622fad23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80')";
              } else {
                background.style.backgroundImage =
                  "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')";
              }
              return;
            });
        });
      });

    //   # wenn der User PLZ und Länderkürzel eingibt
  } else {
    fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${plz},${countrycode}&appid=c888edb7ac6e13417f7d627546b08633`
    )
      .then((response) => response.json())
      .then((data2) => {
        let lat2 = data2.lat;
        let lon2 = data2.lon;

        daten.style.display = "block";

        //   * Wetterdaten ziehen
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=c888edb7ac6e13417f7d627546b08633&units=metric&lang=de`
        )
          .then((response) => response.json())
          .then((data2) => {
            let tempMin = data2.main.temp_min.toFixed(0);
            let tempFixed = data2.main.temp.toFixed(0);
            let tempMax = data2.main.temp_max.toFixed(0);

            let weatherItem = document.createElement("div");

            cityName.innerHTML = `${data2.name}`;

            let bes = document.createElement("p");
            bes.textContent = `${data2.weather[0].description}`;
            weatherItem.appendChild(bes);

            let temperatur = document.createElement("p");
            temperatur.textContent = `${tempFixed} °C`;
            weatherItem.appendChild(temperatur);

            let tempMin2 = document.createElement("p");
            tempMin2.textContent = `Die Temperatur liegt heute zwischen ${tempMin} °C und ${tempMax} °C `;
            weatherItem.appendChild(tempMin2);

            let hum = document.createElement("p");
            hum.textContent = `Luftfeuchtigkeit: ${data2.main.humidity}%`;
            weatherItem.appendChild(hum);

            let windy = document.createElement("p");
            windy.textContent = `Windgeschwindigkeit: ${data2.wind.speed} km/h`;
            weatherItem.appendChild(windy);

            let coord = document.createElement("p");
            coord.textContent = `Längen- und Breitengrade: ${lat2};${lon2}`;
            weatherItem.appendChild(coord);

            document.querySelector(".daten").appendChild(weatherItem);

            if (data2.weather[0].description === "Klarer Himmel") {
              background.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1517758478390-c89333af4642?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80')";
            } else if (data2.weather[0].description == "Ein paar Wolken") {
              background.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1517758478390-c89333af4642?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80')";
            } else if (data2.weather[0].description == "Mäßig bewölkt") {
              background.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1560585942-9cf9888d5076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')";
            } else if (data2.weather[0].description == "Überwiegend bewölkt") {
              background.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1614959909713-128c622fad23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80')";
            } else if (data2.weather[0].description == "Bedeckt") {
              background.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1614959909713-128c622fad23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80')";
            } else {
              background.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')";
            }
            return;
          });
      });
  }

  // Fehlermeldung, falls Eingabe fehlt
  if (city == "" && plz == 0 && countrycode == "") {
    daten.innerHTML = "Bitte gib deine Stadt oder Postleitzahl ein!";
    cityName.style.display = "none";
    daten.style.display == "none";
  } else if (city == "" && plz != 0 && countrycode == "") {
    daten.innerHTML = "Bitte gib noch deinen Ländercode (bspw. DE) ein! ";
    cityName.style.display = "none";
    daten.style.display == "none";
  } else if (city == "" && plz == 0 && countrycode != "") {
    daten.innerHTML = "Bitte gib noch deine PLZ ein! ";
    cityName.style.display = "none";
    daten.style.display == "none";
  } else {
    daten.innerHTML = "";
  }

  // damit die Input Felder nach dem ausführen wieder geleert werden
  city = document.querySelector("#search").value = "";
  countrycode = document.querySelector("#country").value = "";
  plz = document.querySelector("#plz").value = "";
});
