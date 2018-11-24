import { launch, Browser, Page } from "puppeteer";
import fs from "fs";
import pixelmatch from "pixelmatch";
import imageSize from "image-size";
import * as Rx from "rxjs";
import { equals } from "ramda";

interface ImageInfo {
  width: number;
  height: number;
  type: string;
}

interface Image {
  src?: string;
  buffer: Buffer;
  dimensions: ImageInfo;
}

export function ImageFile(filename: string): Image {
  const img = fs.readFileSync(filename);
  return {
    src: filename,
    buffer: img,
    dimensions: imageSize(img)
  };
}

export function ImageBuffer(buffer: Buffer): Image {
  return {
    buffer: buffer,
    dimensions: imageSize(buffer)
  };
}

export function launchBrowser() {
  return Rx.from(launch());
}

export function newPage(browser: Browser) {
  return Rx.from(browser.newPage());
}

let screenshots$ = new Rx.Subject();

export function screenshots() {
  return Rx.from(screenshots$);
}

function shot() {}

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
  const img1 = ImageFile(image1);
  const img2 = ImageFile(image2);
  if (!equals(img1.dimensions, img2.dimensions)) return;
  const results = pixelmatch(
    img1.buffer,
    img2.buffer,
    null,
    img1.dimensions.width,
    img2.dimensions.height
  );
  if (results === 0) return true;
}

export function bufferMatch(image1: Buffer, image2: Buffer) {
  const img1 = ImageBuffer(image1);
  const img2 = ImageBuffer(image2);
  if (!equals(img1.dimensions, img2.dimensions)) return;
  const results = pixelmatch(
    image1,
    image2,
    null,
    img1.dimensions.width,
    img1.dimensions.height
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
