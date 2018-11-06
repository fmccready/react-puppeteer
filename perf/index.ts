import { launch, Browser, Page } from "puppeteer";
import fs from "fs";
import pixelmatch from "pixelmatch";
import imageSize from "image-size";
import * as Rx from "rxjs";

interface ImageInfo {
  width: number;
  height: number;
  type: string;
}

interface Image {
  src: string;
  data: Buffer;
  dimensions: ImageInfo;
}

export function readImage(filename: string) {
  const img = fs.readFileSync(filename);
  return {
    src: filename,
    data: fs.readFileSync(filename),
    dimensions: imageSize(img)
  };
}
export function launchBrowser() {
  return Rx.from(launch());
}

export function newPage(browser: Browser) {
  return Rx.from(browser.newPage());
}

export function takeScreenshot(page: Page, path: string) {
  return Rx.from(page.screenshot({ path: path }));
}

export function navigate(page: Page, url: string) {
  return Rx.from(page.goto(url));
}

export async function getScreenshot(path = "./perf/results/default.png") {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  await page.screenshot({ path: path });

  await browser.close();
}

export function match(image1: string, image2: string) {
  const img1 = readImage(image1);
  const img2 = readImage(image2);
  const results = pixelmatch(
    img1.data,
    img2.data,
    null,
    img1.dimensions.width,
    img2.dimensions.height
  );
  if (results === 0) return true;
}

/*
function launchBrowserPage(){
  launch().then(function(browser){
    browser.newPage()
  });
  const page = browser.newPage();

}
*/
