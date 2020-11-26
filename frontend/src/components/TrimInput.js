import React from "react";
import Header from "../commons/Header";
import styled from "styled-components/macro";
import PrimaryButton from "../commons/PrimaryButton";
import { useHistory } from 'react-router-dom';
import {getStormGlassWeather} from "../service/StormGlassService";

export default function TrimInput({course, setCourse, windSpeed, setWindSpeed, waveHeight, setWaveHeight, latitude, longitude}) {

    const history = useHistory();

    return (
        <PageLayout>
            <Header headerText={'Sail Trim'}/>
            <FormStyled>
                <FieldsetStyled>
                    <legend>Course</legend>
                    <div>
                        <input type={"radio"} name={"course"} id={"closed_hauled"} value={"closed_hauled"}
                               checked={course === "closed_hauled"}
                               onChange={handleRadioButton}
                        />
                        <label htmlFor={"closed_hauled"}>Closed Hauled</label>
                    </div>
                    <div>
                        <input type={"radio"} name={"course"} id={"beam_reach"} value={"beam_reach"}
                               checked={course === "beam_reach"}
                               onChange={handleRadioButton}
                        />
                        <label htmlFor={"beam_reach"}>Beam Reach</label>
                    </div>
                    <div>
                        <input type={"radio"} name={"course"} id={"wind_astern"} value={"wind_astern"}
                               checked={course === "wind_astern"}
                               onChange={handleRadioButton}
                        />
                        <label htmlFor={"wind_astern"}>Wind Astern</label>
                    </div>
                </FieldsetStyled>
                <FieldsetStyled>
                    <legend>Weather</legend>
                    <label htmlFor={"windSpeed"}>Wind Speed :</label>
                    <input type={"range"} max={"40"} value={windSpeed} id={"windSpeed"}
                           onChange={event => setWindSpeed(event.target.value)}
                    />
                    <output>{windSpeed} knots</output>
                    <label htmlFor={"waveHeight"}>Wave Height :</label>
                    <input type={"range"} max={"3"} step={"0.1"} value={waveHeight} id={"waveHeight"}
                           onChange={event => setWaveHeight(event.target.value)}
                    />
                    <output>{waveHeight} meter</output>
                </FieldsetStyled>
                <PrimaryButton labelButton={"Load weather for current location"}
                               handleClick={loadWeather} disableButton={!latitude || !longitude}
                />
                <PrimaryButton labelButton={"Reset"} handleClick={resetAllInputData}
                               disableButton={!windSpeed && !waveHeight && !course}
                />
            </FormStyled>
            <div>
                <PrimaryButton labelButton={"Dashboard"} handleClick={redirectToDashboard}/>
                <PrimaryButton labelButton={"Main Sail"} handleClick={redirectToMainSail} disableButton={disableHandler()}/>
                <PrimaryButton labelButton={"Head Sail"} handleClick={redirectToHeadSail} disableButton={disableHandler()}/>
            </div>
        </PageLayout>
    );

    function handleRadioButton(event) {
        setCourse(event.target.value);
    }

    function loadWeather() {
        getStormGlassWeather(latitude, longitude).then(data => setWindSpeed(data.windSpeed));
        getStormGlassWeather(latitude, longitude).then(data => setWaveHeight(data.waveHeight));
    }

    function redirectToDashboard() {
        history.push("/dashboard");
    }

    function disableHandler() {
        return !(course && windSpeed && waveHeight && windSpeed !== 0 && waveHeight !== 0);
    }

    function redirectToMainSail() {
        history.push("/mainsail");
    }

    function resetAllInputData() {
        setCourse(null);
        setWindSpeed(0);
        setWaveHeight(0);
    }

    function redirectToHeadSail() {
        history.push("/headsail");
    }
}

const PageLayout = styled.div`
display: grid;
grid-template-rows: 60px 1fr 60px;
height: 100vh;
`

const FormStyled = styled.form`
display: grid;
grid-template-rows: min-content min-content min-content min-content;
`

const FieldsetStyled = styled.fieldset`
display: grid;
grid-template-rows: 0 1fr 1fr 1fr;
row-gap: var(--size-s);
margin: var(--size-m);
border-radius: var(--size-s);
border-color: lightgrey;

  & output, div, legend{
  font-weight: bold;
  }
`