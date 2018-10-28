import fs from "fs";
import { assert } from "chai";
import { getScreenshot, match, getDimensions } from "./index";

debugger;
describe("puppeteer", function() {
  this.timeout(15000);
  it("creates an image", function(done) {
    getScreenshot()
      .then(function() {
        assert(fs.existsSync("./perf/results/test.png"));
        done();
      })
      .catch(function() {
        assert(false);
        done();
      });
  });
  it("gives the image a name", function(done) {
    const name = "test-name";
    getScreenshot(name)
      .then(function() {
        assert(fs.existsSync(`./perf/results/${name}.png`));
        done();
      })
      .catch(function() {
        assert(false);
        done();
      });
  });
  it("tells you if two images are the same", function() {
    const names = ["image1", "image2"];
    names.forEach(getScreenshot);
    assert(
      match(`./perf/results/${names[0]}.png`, `./perf/results/${names[1]}.png`)
    );
  });
  it("tells you the dimensions of an image", function() {
    const dimensions = getDimensions("./perf/results/test.png");
    assert(dimensions.width && dimensions.height && dimensions.type);
  });
});
