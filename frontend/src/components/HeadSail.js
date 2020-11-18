import React from 'react';
import Header from "../commons/Header";
import Buttons from "../commons/Buttons";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom";
import useTrimData from "../hooks/useTrimData";

export default function HeadSail({course, windSpeed, waveHeight}) {

    const history = useHistory();
    const headSailTrimData = useTrimData(course, windSpeed, waveHeight).headSailTrimData;

    const getTextualOutput = (input) => input.replace("_", " ").toLowerCase()

    return (
        <PageLayout>
            <Header headerText={'Head Sail'}/>
            <DataField>
                <p>Sheet: {headSailTrimData && getTextualOutput(headSailTrimData.headSailSheet)}</p>
                <p>Fair Lead: {headSailTrimData && getTextualOutput(headSailTrimData.headSailLead)}</p>
                <p>Luff: {headSailTrimData && getTextualOutput(headSailTrimData.headSailLuff)}</p>
            </DataField>
            <Buttons
                disableButtonTwo={false}
                labelButtonTwo={"Back"}
                clickHandlerTwo={clickHandlerBack}
            />
        </PageLayout>
    );

    function clickHandlerBack() {
        history.push("/dashboard");
    }
}


const PageLayout = styled.div`
display: grid;
grid-template-rows: 60px 1fr 60px;
height: 100vh;
`

const DataField = styled.div`
margin: var(--size-m);
`