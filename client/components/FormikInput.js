import React from "react";
import { TextField, InputLabel } from "@material-ui/core";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 10px;
`;

const StyledInput = styled(TextField)`
  width: 100%;
`;

const FormikInput = (props) => {
  return (
    <StyledDiv>
      <InputLabel htmlFor={props.field.name}>{props.placeholder}</InputLabel>
      <StyledInput
        placeholder={props.placeholder}
        variant="outlined"
        onChange={(e) =>
          props.form.setFieldValue(props.field.name, e.target.value)
        }
      />
    </StyledDiv>
  );
};

export default FormikInput;
