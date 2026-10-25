
import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://vk.com", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    console.log("Браузер открыл VK.");
    console.log("Заголовок страницы:", await page.title());
    console.log("Пока только проверка браузера — без входа и публикаций.");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Ошибка браузера:", error.message);
  process.exitCode = 1;
});
