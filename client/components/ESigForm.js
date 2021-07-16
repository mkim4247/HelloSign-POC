import React, { useState } from "react";
import axios from "axios";
import HelloSign from "hellosign-embedded";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";

import FormikInput from "./FormikInput";
import FormikRadio from "./FormikRadio";
import styled from "styled-components";

const client = new HelloSign();

const FormContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledButton = styled(Button)`
  left: 50%;
  transform: translate(-50%, 100%);
`;

const TextContainer = styled.div`
  margin: 20px;
`;

const ESigForm = () => {
  const history = useHistory();

  const [bankruptcy, setBankruptcy] = useState(false);

  const handleClick = async (values) => {
    const templateSignatureOpts = {
      test_mode: 1,
      clientId: process.env.REACT_APP_HELLOSIGN_CLIENTID,
      template_id: "47331623d61358e19d780ece0c3f6a6bdafa8b8e",
      signers: [
        {
          email_address: "claire.moore@giantmachines.com",
          name: "Claire",
          role: "partner",
          // pin: "1234"
        },
        {
          email_address: "mooreclaire95@gmail.com",
          name: "test",
          role: "guardian",
        },
      ],
      custom_fields: [
        {
          name: "name",
          value: values.name,
          editor: "guardian",
          required: false,
        },
        {
          name: "address",
          value: values.address,
          editor: "guardian",
          required: false,
        },
        {
          name: "city",
          value: values.city,
          editor: "guardian",
          required: false,
        },
        {
          name: "state",
          value: values.state,
          editor: "guardian",
          required: false,
        },
        {
          name: "zip",
          value: values.zip,
          editor: "guardian",
          required: false,
        },
        {
          name: "SIC",
          value: values.SIC,
          editor: "guardian",
          required: false,
        },
        {
          name: "bankruptcy_yes",
          value: bankruptcy === true,
          editor: "guardian",
          required: false,
        },
        {
          name: "bankruptcy_no",
          value: bankruptcy === false,
          editor: "guardian",
          required: false,
        },
      ],
    };

    const signatureRequestObject = await axios.post(
      "/api/hellosign/signatureRequest/createEmbeddedWithTemplate",
      templateSignatureOpts
    );

    const signatureId =
      signatureRequestObject.data.signature_request.signatures[0].signature_id;

    const embeddedObject = await axios.get(
      `/api/hellosign/embedded/getSignUrl/${signatureId}`
    );

    const signUrl = embeddedObject.data.embedded.sign_url;

    await client.open(signUrl, {
      clientId: process.env.REACT_APP_HELLOSIGN_CLIENTID,
      skipDomainVerification: true,
    });

    // window.location.href = `${signUrl}&client_id=${process.env.REACT_APP_HELLOSIGN_CLIENTID}`
    // console.log('Client.open Url: ', url);

    await client.on("finish", () => {
      console.log("Signing was finished.");
      history.push("/success");
    });
  };

  const handleChange = (e) => {
    if (e.target.value === "true") {
      setBankruptcy(true);
    } else {
      setBankruptcy(false);
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{
          name: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          SIC: "",
          bankruptcy_yes: false,
          bankruptcy_no: false,
        }}
        onSubmit={(values) => {
          handleClick(values);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Grid container>
                <Grid item xs={4}>
                  <Field
                    component={FormikInput}
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field
                    component={FormikInput}
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Field
                    component={FormikInput}
                    type="text"
                    name="city"
                    placeholder="City"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={FormikInput}
                    type="text"
                    name="state"
                    placeholder="State"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={FormikInput}
                    type="text"
                    name="zip"
                    placeholder="Zipcode"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Field
                    component={FormikInput}
                    type="text"
                    name="SIC"
                    placeholder="SIC"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <TextContainer>
                    Has your business filed for bankruptcy?
                  </TextContainer>
                </Grid>
                <Grid item>
                  <Field
                    component={FormikRadio}
                    handleChange={handleChange}
                    bankruptcy={bankruptcy}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid item>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    E-Sign
                  </StyledButton>
                </Grid>
              </Grid>
            </Form>
          </>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ESigForm;
