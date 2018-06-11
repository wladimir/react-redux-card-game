import React from "react";
import StartScreen from "./containers/StartScreen";
import GameScreen from "./containers/GameScreen";
import styled from "styled-components";

const RootStyle = styled.div`
  * {
    font-family: "Lato";
  }

  @media (max-width: 700px) {
    background: white;
  }
`;

const App = () => {
  return (
    <RootStyle>
      <StartScreen />
      <GameScreen />
    </RootStyle>
  );
};

export default App;
