import fs from "fs";
import { assert } from "chai";
import { getScreenshot, match, getDimensions } from "./index";

debugger;
describe("puppeteer", function() {
  this.timeout(35000);
  const names = ["image1", "image2"];
  const name = names[0];

  it("creates an image with a name", function(done) {
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

  it("tells you if two images are the same", function(done) {
    Promise.all(names.map(getScreenshot)).then(function() {
      assert(
        match(
          `./perf/results/${names[0]}.png`,
          `./perf/results/${names[1]}.png`
        )
      );
      done();
    });
  });

  it("tells you the dimensions of an image", function(done) {
    getScreenshot(name).then(function() {
      const dimensions = getDimensions(`./perf/results/${name}.png`);
      assert(dimensions.width && dimensions.height && dimensions.type);
      done();
    });
  });
});
