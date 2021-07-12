const router = require('express').Router();
require('dotenv').config();
const hellosign = require('hellosign-sdk')({key: process.env.REACT_APP_HELLOSIGN_API_KEY});

module.exports = router;

router.post('/signatureRequest/createEmbeddedWithTemplate', async (req, res, next) => {
    try {
        const data = await hellosign.signatureRequest.createEmbeddedWithTemplate(req.body);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

router.get('/embedded/getSignUrl/:signature_id', async (req, res, next) => {
    try {
        const data = await hellosign.embedded.getSignUrl(req.params.signature_id)
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})
