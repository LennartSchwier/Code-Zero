import React, {useContext} from "react";
import styled from "styled-components/macro";
import WeatherDataContext from "../../contexts/WeatherDataContext";

export default function WeatherBlock() {

    const {weatherData} = useContext(WeatherDataContext);

    if (weatherData) {
        return (
            <StyledDashboardSection>
                <section>Weather report: </section>
                    <div>
                        <div>Time of report:<Bold>{weatherData.time.substring(11, 19)}</Bold>UTC</div>
                        <div>Air temperature:<Bold>{weatherData.airTemperature}</Bold>°C</div>
                        <div>Water temperature:<Bold>{weatherData.waterTemperature}</Bold>°C</div>
                        <div>Pressure:<Bold>{weatherData.pressure}</Bold>hPa</div>
                        <div>Visibility:<Bold>{weatherData.visibility}</Bold>km</div>
                        <div>Wind:<Bold>{weatherData.windDirection}</Bold>°<Bold>{weatherData.windSpeed}</Bold>kts</div>
                        {weatherData.currentDirection !== 999 && weatherData.currentSpeed !== 999 &&
                        <div>Current:<Bold>{weatherData.currentDirection}</Bold>°<Bold>{weatherData.currentSpeed}</Bold>kts</div>
                        }
                        {weatherData.waveDirection !== 999 && weatherData.waveHeight !== 999 &&
                        <div>Wave:<Bold>{weatherData.waveDirection}</Bold>°<Bold>{weatherData.waveHeight}</Bold>meters height</div>
                        }
                    </div>
            </StyledDashboardSection>
        );
    }
    if (!weatherData) {
        return (
            <StyledDashboardSection>
                <section>Weather report: </section>
                <div>no weather data available</div>
            </StyledDashboardSection>
        );
    }
}

const StyledDashboardSection = styled.section`
margin: 0 var(--size-l);
background-color: Transparent;
box-shadow: var(--size-xs) var(--size-xs) var(--size-s) dimgrey;
border-radius: var(--size-m);
padding: var(--size-m);

  section {
  margin-bottom: var(--size-l);
  }

  div {
  display: grid;
  row-gap: var(--size-m);
  margin: 0 var(--size-m);
  }
  
  div > div {
  display: flex;
  }
  
  .error {
  margin: var(--size-s);
  color: red;
  }
`

const Bold = styled.span`
font-weight: bold;
margin-left: var(--size-m);
`