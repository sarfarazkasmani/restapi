import express from "express";

const app = express();
const http = require("http");
const fs = require("fs");
const host = "localhost";
const port = 4000;
require("./database");
const featureSchema = require("./schema");
app.use(express.json());
// get all features
app.get("/api/features/", async function (req, res) {
  try {
    const allFeatures = await featureSchema.find();
    res.status(200).send(allFeatures);
  } catch (err) {
    res.status(400).send(err);
  }
});

// add feature API
app.post("/api/features/feature", async function (req, res) {
  const feature = new featureSchema({
    feature_id: req.body.feature_id,
    feature_name: req.body.feature_name,
    feature_type: req.body.feature_type,
    feature_description: req.body.feature_description,
    feature_created_timestamp: req.body.feature_created_timestamp,
    feature_version: req.body.feature_version,
    feature_owner: req.body.feature_owner,
    feature_data: req.body.feature_data,
  });
  try {
    const savedFeature = await feature.save();
    res.status(200).send(savedFeature);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/api/features/:id", async (req: any, res: any) => {
  try {
    const delFeature = await featureSchema.findByIdAndRemove({
      _id: req.params.id,
    });
    res.status(200).send("Feature Deleted : " + delFeature);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/api/features/:id", async (req: any, res: any) => {
  try {
    const curFeature = await featureSchema.findById(req.params.id);
    res.status(200).send(curFeature);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/", (req: any, res: any) => {
  app.use("/static", express.static("public"));
  res.send("http get middleware in action");
});
app.listen(7000, () => {
  console.log("server is listening port 7000");
});
