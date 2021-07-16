import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Success = () => {
  return <Container>You've Successfully Signed!</Container>;
};

export default Success;
