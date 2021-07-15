import React from "react";
import { Checkbox, InputLabel, Radio, RadioGroup } from "@material-ui/core";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`;

const StyledLabel = styled(InputLabel)`
  margin-top: 15px;
`;

const FormikRadio = (props) => {
  console.log(props);
  return (
    <StyledDiv>
      <StyledLabel>Yes</StyledLabel>
      <Radio
        value={true}
        checked={props.bankruptcy === true}
        onChange={props.handleChange}
      />
      <StyledLabel>No</StyledLabel>
      <Radio
        value={false}
        checked={props.bankruptcy === false}
        onChange={props.handleChange}
      />
    </StyledDiv>
  );
};

export default FormikRadio;
