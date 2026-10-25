
import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    for (const url of [
      "https://vk.com/miass24h",
      "https://vk.com/interesnyimiass",
    ]) {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      console.log("\nСтраница:", url);
      console.log("Заголовок:", await page.title());
      console.log("Текущий адрес:", page.url());
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Ошибка:", error.message);
  process.exitCode = 1;
});
