import React from 'react';

const SignatureRequestPage = (props) => {
    const [signatureRequestID, setSignatureRequestID] = useState();
    const opts = {
      test_mode: 1,
      clientId: process.env.HELLOSIGN_CLIENTID,
      template_id: 'YOUR TEMPLATE ID',
      title: 'Open Gallery Display Contract',
      subject: 'Standard Contract Between Open Gallery and Artist',
      message: 'This contract lays out terms for display and commission between  the artist and Open Gallery.  Valid for one year from signing date.',
      signers: [
        {
          email_address: props.artist.email_address,
          name: props.artist.name,
          role: 'Artist'
        }
      ]
    };
    const setSignatureRequestID = () => {
      let newContract = {signatureRequestID: signatureRequestID}
      props.artist.currentSignatureRequestID = newContract;
    }
    return (
      <React.Fragment>
        <Button onClick={() => {
            //call your backend method to call HelloSign and handle errors
            getSignatureRequest(opts);
            recordForm()
          }
        }>
        Annual Artist/Gallery Contract - Please Sign</Button>
      </React.Fragment>
      )
    }
    export default SignatureRequestPage;