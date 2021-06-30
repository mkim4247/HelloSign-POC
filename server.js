var express = require('express');
var app = express();
const hellosign = require('hellosign-sdk')({ key: '45d2ec1476060129d7aae37bd2c3d423d6d1b97721d6f7c3493ec8e8b9b0689f' });

hellosign.signatureRequest.createEmbedded(opts).then((res) => {
  const signature = res.signature_request.signatures[0];
  const signatureId = signature.signature_id;

  return hellosign.embedded.getSignUrl(signatureId);
}).then((res) => {
  console.log('The sign url: ' + res.embedded.sign_url);
}).catch((err) => {
  // handle error
});

app.get('/', function (req, res) {
  res.send('Hello World!'); // This will serve your request to '/'.
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
