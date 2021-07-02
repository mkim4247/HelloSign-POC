const router = require('express').Router();
const hellosign = require('hellosign-sdk')({key: '45d2ec1476060129d7aae37bd2c3d423d6d1b97721d6f7c3493ec8e8b9b0689f'});


module.exports = router;

router.post('/signatureRequest/createEmbedded', async (req, res, next) => {
    try {
        const data = await hellosign.signatureRequest.createEmbedded(req.body);
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

router.post('/signatureRequest/createEmbeddedWithTemplate', async (req, res, next) => {
    try {
        const data = await hellosign.signatureRequest.createEmbeddedWithTemplate(req.body);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})
