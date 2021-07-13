const router = require("express").Router();
require("dotenv").config();
const hellosign = require("hellosign-sdk")({
  key: process.env.REACT_APP_HELLOSIGN_API_KEY,
});

module.exports = router;

router.post("/signatureRequest/createEmbeddedWithTemplate", async (req, res, next) => {
    try {
      const signatureRequstObject =
        await hellosign.signatureRequest.createEmbeddedWithTemplate(req.body);
      res.send(signatureRequstObject);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/embedded/getSignUrl/:signature_id", async (req, res, next) => {
  try {
    const embeddedObject = await hellosign.embedded.getSignUrl(
      req.params.signature_id
    );
    res.send(embeddedObject);
  } catch (error) {
    console.log(error);
  }
});

router.post("/oauth/token", async (req, res, next) => {
  try {
    const data = hellosign.oauth.getToken({
      state: "STATE",
      code: "CODE",
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
