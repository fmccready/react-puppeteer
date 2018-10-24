import fs from "fs";
import chai from "chai";
import { getScreenshot } from "./index.js";

it("creates an image", () => {
  getScreenshot().then(() => {
    chai.assert(fs.exists("./results/test.png"));
  });
});
