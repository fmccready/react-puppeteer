import { launch } from "puppeteer";
import fs from "fs";
import pixelmatch from "pixelmatch";
import imageSize from "image-size";

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

function getImage(filename: string) {
  const img = fs.readFileSync(filename);
  return {
    src: filename,
    data: fs.readFileSync(filename),
    dimensions: imageSize(img)
  };
}

export async function getScreenshot(name = "test") {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  await page.screenshot({ path: `./perf/results/${name}.png` });

  await browser.close();
}

export function match(image1: string, image2: string) {
  const img1 = fs.readFileSync(image1);
  const img2 = fs.readFileSync(image2);
  const results = pixelmatch(img1, img2, null, 800, 600);
  if (results === 0) return true;
}

export function getDimensions(image: string) {
  const img = fs.readFileSync(image);
  return imageSize(img);
}

/*
function launchBrowserPage(){
  launch().then(function(browser){
    browser.newPage()
  });
  const page = browser.newPage();

}
*/
