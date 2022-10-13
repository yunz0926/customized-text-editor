import React from "react";
import styled from "styled-components";
import TextEditor from "./components/TextEditor";

function App() {
  return (
    <Wrapper>
      <TextEditor />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 600px;
  border: 1px solid;
`;

export default App;
