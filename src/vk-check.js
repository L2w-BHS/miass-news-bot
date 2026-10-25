
const token = process.env.MIASS24APIKEY;

if (!token) {
  console.error("Ошибка: секрет MIASS24APIKEY не найден.");
  process.exit(1);
}

async function main() {
  const params = new URLSearchParams({
    domain: "miass24h",
    filter: "suggests",
    count: "5",
    access_token: token,
    v: "5.199"
  });

  const response = await fetch(
    "https://api.vk.com/method/wall.get",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    }
  );

  const data = await response.json();

  if (data.error) {
    console.error(
      `VK API: ошибка ${data.error.error_code}: ` +
      data.error.error_msg
    );
    process.exitCode = 1;
    return;
  }

  const posts = data.response?.items;

  if (!Array.isArray(posts)) {
    console.error("VK API вернул неожиданный ответ.");
    process.exitCode = 1;
    return;
  }

  console.log("Подключение к VK API успешно.");
  console.log(`Записей в предложке: ${posts.length}`);
  console.log("Режим проверки: публикации отключены.");
}

main().catch(() => {
  console.error("Не удалось выполнить запрос к VK API.");
  process.exitCode = 1;
});
