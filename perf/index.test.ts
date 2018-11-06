import fs from "fs";
import { assert } from "chai";
import * as perf from "./index";
import * as Rx from "rxjs";

debugger;

describe("Browser", function() {
  this.timeout(30000);
  it("can open a browser", function(done) {
    perf.launchBrowser().subscribe(function(browser) {
      assert(browser);
      browser.close();
      done();
    });
  });

  it("can open a new page in a browser", function(done) {
    perf.launchBrowser().subscribe(function(browser) {
      perf.newPage(browser).subscribe(function(page) {
        assert(page);
        browser.close();
        done();
      });
    });
  });

  it("can navigate to a new page", function(done) {
    perf.launchBrowser().subscribe(function(browser) {
      perf.newPage(browser).subscribe(function(page) {
        perf
          .navigate(page, "http://localhost:3000")
          .subscribe(function(response) {
            assert(response);
            browser.close();
            done();
          });
      });
    });
  });
});

describe("Images", function() {
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
