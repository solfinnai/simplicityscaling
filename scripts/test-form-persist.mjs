import puppeteer from "puppeteer-core";

const url = process.env.BASE_URL || "http://127.0.0.1:43127";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
page.on("console", (msg) => console.log("BROWSER", msg.type(), msg.text()));
page.on("pageerror", (err) => console.log("PAGEERROR", err.message));
await page.setViewport({ width: 1280, height: 800 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.waitForSelector("#soft-first-name");
await new Promise((resolve) => setTimeout(resolve, 2000));

await page.type("#soft-first-name", "Maya");
await page.type("#soft-email", "maya@northshore.test");
await page.type("#soft-company", "Northshore Legal");
await page.select("#soft-category", "Finance & legal");

const readForm = () =>
  page.$eval("#scorecard", (formRoot) => ({
    firstName: formRoot.querySelector("#soft-first-name")?.value,
    email: formRoot.querySelector("#soft-email")?.value,
    company: formRoot.querySelector("#soft-company")?.value,
    category: formRoot.querySelector("#soft-category")?.value,
    draft: sessionStorage.getItem("ss_draft_soft"),
  }));

const before = await readForm();

await page.evaluate(() => window.scrollTo(0, 0));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.evaluate(() => window.scrollTo(0, 0));
await page.$eval("#scorecard", (el) => el.scrollIntoView());
await new Promise((resolve) => setTimeout(resolve, 400));

const after = await readForm();
console.log(JSON.stringify({ before, after }, null, 2));

const persistOk =
  after.firstName === "Maya" &&
  after.email === "maya@northshore.test" &&
  after.company === "Northshore Legal" &&
  after.category === "Finance & legal";

if (!persistOk) {
  await browser.close();
  console.error("FAIL: values did not survive scroll");
  process.exit(1);
}

await Promise.all([
  page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }),
  page.click("#scorecard button[type=submit]"),
]);
const loc = await page.evaluate(() => ({ path: location.pathname, search: location.search, href: location.href }));
console.log("LOC", loc);

if (loc.path !== "/thanks" || loc.search !== "?type=soft") {
  await browser.close();
  console.error("FAIL: did not reach thanks");
  process.exit(1);
}

await page.goto(url, { waitUntil: "networkidle0" });
await page.waitForSelector("#hard-full-name");
await new Promise((resolve) => setTimeout(resolve, 1000));
await page.type("#hard-full-name", "Jordan Hale");
await page.type("#hard-email", "jordan@hale.test");
await page.type("#hard-company", "Hale Clinics");
await page.type("#hard-role", "CMO");
await page.select("#hard-category", "Local consultations");
await page.select("#hard-spend", "Under $50k");
await page.click('input[name="primaryChannels"][value="CTV"]');
await page.click('input[name="primaryChannels"][value="Radio"]');
await page.type("#hard-broke", "Appointments are not attributed back to the spot.");
await page.select("#hard-heard", "Optima LinkedIn");
await page.evaluate(() => window.scrollTo(0, 0));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
const hardAfter = await page.$eval("#hard-full-name", (el) => el.value);
if (hardAfter !== "Jordan Hale") {
  await browser.close();
  console.error("FAIL: hard form cleared on scroll");
  process.exit(1);
}
await Promise.all([
  page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }),
  page.click("#strategy-session button[type=submit]"),
]);
const hardLoc = await page.evaluate(() => ({ path: location.pathname, search: location.search }));
console.log("HARD", hardLoc, "afterScroll", hardAfter);
if (hardLoc.path !== "/thanks" || hardLoc.search !== "?type=hard") {
  await browser.close();
  console.error("FAIL: hard form did not reach thanks");
  process.exit(1);
}

await browser.close();
console.log("PASS");
