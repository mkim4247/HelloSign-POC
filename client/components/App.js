import React from 'react';
import axios from 'axios';
import HelloSign from 'hellosign-embedded';
const client = new HelloSign();



const App = () => {
    const user = {
        email_address: 'claire.moore@giantmachines.com',
        name: 'Claire',
        role: 'buyer',
    }

    const opts = {
        test_mode: 1,
        clientId: '35244ac434156570fca219c65516e3a0',
        signers: [
          {
            email_address: user.email_address,
            name: user.name,
            role: user.role,
          }
        ],
        files: ['/Users/clairemoore/Tech_Spikes/hellosign-POC/public/form.pdf']
      };

    const handleClick = async () => {
        const res = await axios.post('/api/hellosign/signatureRequest/createEmbedded', opts);
        const getSign = await axios.get(`/api/hellosign/embedded/getSignUrl/${res.data.signature_request.signatures[0].signature_id}`);
        console.log(getSign.data)
        const signUrl = getSign.data.embedded.sign_url;
        client.open(signUrl, {
            clientId: '35244ac434156570fca219c65516e3a0',
            skipDomainVerification: true,
          });
    }

    return (
        <button onClick={handleClick}>Sign a document</button>
    )
}

export default App;