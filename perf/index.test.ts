import { assert } from "chai";
import { Browser, Page } from "puppeteer";
import * as perf from "./index";
import { curry, forEach, reduce } from "ramda";
import { zip } from "rxjs";

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
  let browser: Browser;
  let page: Page;

  before(function(done) {
    perf.launchBrowser().subscribe(function(b) {
      browser = b;
      perf.newPage(browser).subscribe(function(p) {
        page = p;
        done();
      });
    });
  });

  it("creates an image with a name", function(done) {
    perf.takeScreenshot(page, paths[0]).subscribe(function(screenshot) {
      assert(screenshot);
      done();
    });
  });

  it("reads an image from disk", function() {
    const image = perf.ImageFile(testImage);
    assert(image.src === testImage);
  });

  it("tells you if two images are the same", function(done) {
    const takeScreenshotFromPage = curry(perf.takeScreenshot)(page);
    const image0$ = takeScreenshotFromPage(paths[0]);
    const image1$ = takeScreenshotFromPage(paths[1]);
    zip()

    /*
    Promise.all(paths.map(perf.getScreenshot)).then(function() {
      assert(perf.match(paths[0], paths[1]));
      done();
    });
    */
  });

  it("tells you the dimensions of an image", function() {
    const dimensions = perf.ImageFile(testImage).dimensions;
    assert(dimensions.width && dimensions.height && dimensions.type);
  });

  after(function() {
    browser.close();
  });
});
