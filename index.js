const clova = require('@line/clova-cek-sdk-nodejs');
const { extensionId } = require("./config");
const _ = require("lodash");

const clovaMiddleware = clova.Middleware({
  applicationId: extensionId
});

const express = require('express');
const bodyParser = require('body-parser');

const clovaSkillHandler = clova.Client
  .configureSkill()
  .onLaunchRequest(responseHelper => {
    responseHelper.setSimpleSpeech({
      lang: "ja",
      type: "PlainText",
      value: "起動したよー "
    });
  })
  .onIntentRequest(async responseHelper => {
    console.dir(responseHelper.getIntentName());
    responseHelper.setSimpleSpeech({
      lang: "ja",
      type: "PlainText",
      value: "intent request"
    });
  })
  .handle();

const app = new express();
if (!isNaN(process.env.PORT_APP)) {
  port = process.env.PORT_APP;
} else {
  port = 3000;
}
app.listen(port)

app.post("/clova", clovaMiddleware, clovaSkillHandler);