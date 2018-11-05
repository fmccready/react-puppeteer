import fs from "fs";
import { assert } from "chai";
import * as perf from "./index";

debugger;
describe("puppeteer", function() {
  this.timeout(60000);
  const paths = ["./perf/results/image1.png", "./perf/results/image2.png"];
  const testImage = "./perf/fixtures/test-image.png";

  it("creates an image with a name", function(done) {
    perf
      .getScreenshot(paths[0])
      .then(function() {
        assert(fs.existsSync(paths[0]));
        done();
      })
      .catch(function(err) {
        console.log(`error: ${err}`);
        done();
      });
  });

  it("reads an image from disk", function() {
    const image = perf.readImage(testImage);
    assert(image.src === testImage);
  });

  it("tells you if two images are the same", function(done) {
    Promise.all(paths.map(perf.getScreenshot)).then(function() {
      assert(perf.match(paths[0], paths[1]));
      done();
    });
  });

  it("tells you the dimensions of an image", function() {
    const dimensions = perf.readImage(testImage).dimensions;
    assert(dimensions.width && dimensions.height && dimensions.type);
  });
});
