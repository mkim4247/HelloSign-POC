import React from "react";
import axios from "axios";
import HelloSign from "hellosign-embedded";
const client = new HelloSign();

const App = () => {
  const embeddedSignatureOpts = {
    test_mode: 1,
    clientId: "35244ac434156570fca219c65516e3a0",
    signers: [
      {
        email_address: "claire.moore@giantmachines.com",
        name: "Claire",
        role: "buyer",
      }
    ],
    files: ["/Users/clairemoore/Tech_Spikes/hellosign-POC/public/form.pdf"],
  };

  const templateSignatureOpts = {
    test_mode: 1,
    clientId: "35244ac434156570fca219c65516e3a0",
    template_id: '0e3e1954d6b9c7b1ea288f5751af6b322f71d012',
    signers: [
      {
        email_address: "claire.moore@giantmachines.com",
        name: "Claire",
        role: "buyer",
      },
      {
        email_address: "mooreclaire95@gmail.com",
        name: 'test',
        role: 'seller'
      }
    ],
    custom_fields: [
      {
        name: "Make",
        value: "Honda",
        editor: "seller",
        required: false,
      },
      {
        name: "Model",
        value: "Civic",
        editor: "seller",
        required: false,
      },
      {
        name: "Year",
        value: "2017",
        editor: "seller",
        required: false,
      },
      {
        name: "Color",
        value: "Gray",
        editor: "seller",
        required: false,
      },
      {
        name: "Buyer_Name",
        value: "Claire Moore",
        editor: "seller",
        required: false,
      },
      {
        name: "Buyer_Address",
        value: "123 Magic Road",
        editor: "seller",
        required: false,
      },
      {
        name: "Buyer_City",
        value: "Springfield",
        editor: "seller",
        required: false,
      },
      {
        name: "Buyer_State",
        value: "PA",
        editor: "seller",
        required: false,
      },
    ],
  }

  const embeddedSignatureFlow = async () => {
    const res = await axios.post(
      "/api/hellosign/signatureRequest/createEmbedded",
      embeddedSignatureOpts
    );
    const getSign = await axios.get(
      `/api/hellosign/embedded/getSignUrl/${res.data.signature_request.signatures[0].signature_id}`
    );
    const signUrl = getSign.data.embedded.sign_url;
    client.open(signUrl, {
      clientId: "35244ac434156570fca219c65516e3a0",
      skipDomainVerification: true,
    });
  };

  const signUsingTemplate = async () => {
    const res = await axios.post('/api/hellosign/signatureRequest/createEmbeddedWithTemplate', templateSignatureOpts);
    const getSign = await axios.get(
      `/api/hellosign/embedded/getSignUrl/${res.data.signature_request.signatures[0].signature_id}`
    );
    const signUrl = getSign.data.embedded.sign_url;
    client.open(signUrl, {
      clientId: "35244ac434156570fca219c65516e3a0",
      skipDomainVerification: true,
    });
  };

  return (
    <>
      <button onClick={embeddedSignatureFlow}>
        Sign a Document with Embedded Signature Request
      </button>
      <hr />
      <button onClick={signUsingTemplate}>
        Sign a Document Using a Template
      </button>
    </>
  );
};

export default App;
