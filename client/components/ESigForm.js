import React from "react";
import axios from "axios";
import HelloSign from "hellosign-embedded";
import { Formik, Form, Field } from "formik";

const client = new HelloSign();

const ESigForm = (props) => {

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
      console.log('Signing was finished.')
      props.toggleForm(false);
    });
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", address: "", city: "", state: "", zip: "" }}
        onSubmit={(values) => {
          handleClick(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <Field type="text" name="address" placeholder="Address" />
            <Field type="text" name="city" placeholder="City" />
            <Field type="text" name="state" placeholder="State" />
            <Field type="text" name="zip" placeholder="Zipcode" />
            <button type="submit" disabled={isSubmitting}>
              E-Sign
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ESigForm;
