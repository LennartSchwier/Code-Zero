import React from 'react';
import HeadSail from "./components/HeadSail";
import {Switch, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import useEnvironmentData from "./hooks/useEnvironmentData";


export default function App() {

    const [course, setCourse, windSpeed, setWindSpeed, waveHeight, setWaveHeight] = useEnvironmentData();

  return (
      <Switch>
          <Route path={"/dashboard"}>
              <Dashboard course={course} setCourse={setCourse}
                         windSpeed={windSpeed} setWindSpeed={setWindSpeed}
                         waveHeight={waveHeight} setWaveHeight={setWaveHeight}
              />
          </Route>
          <Route path={"/headsail"}>
              <HeadSail
                  course={course} windSpeed={windSpeed} waveHeight={waveHeight}
              />
          </Route>
      </Switch>
  );
}

