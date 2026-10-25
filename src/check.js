
const MIN_LENGTH = 35;
const MIN_SCORE = 60;

const spamPatterns = [
  /заработ(ай|ок|ок) быстро/i,
  /ставки на спорт/i,
  /казино|букмекер/i,
  /подписывайся на мой канал/i,
  /переходи по ссылке/i,
  /реферальн/i,
  /крипто ?казино/i,
];

const adPatterns = [
  /куплю|продам|скидка \d+%/i,
  /реклама|промокод|закажи сейчас/i,
  /доставка бесплатно/i,
];

const lowQualityPatterns = [
  /кто знает\??$/i,
  /ап+$/i,
  /^помогите!?$/i,
  /^что это\??$/i,
];

function normalize(text = "") {
  return text
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function evaluateNews(post) {
  const text = normalize(post.text);
  const reasons = [];
  let score = 100;

  if (text.length < MIN_LENGTH) {
    score -= 50;
    reasons.push("Слишком короткий текст");
  }

  if (spamPatterns.some((pattern) => pattern.test(text))) {
    score -= 100;
    reasons.push("Похоже на спам");
  }

  if (adPatterns.some((pattern) => pattern.test(text))) {
    score -= 70;
    reasons.push("Возможная реклама");
  }

  if (lowQualityPatterns.some((pattern) => pattern.test(text))) {
    score -= 50;
    reasons.push("Мало полезной информации");
  }

  if (!/[.!?…]/.test(text)) {
    score -= 10;
    reasons.push("Нет знаков завершения предложения");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    id: post.id,
    score,
    approved: score >= MIN_SCORE && reasons.length === 0,
    reasons,
  };
}

// Примеры для проверки фильтра.
// Позже вместо них подключим реальные записи из VK.
const examples = [
  {
    id: 1,
    text: "В Миассе сегодня временно изменится движение автобусов. Подробности уточняются.",
  },
  {
    id: 2,
    text: "Заработай быстро! Переходи по ссылке и получай деньги!",
  },
  {
    id: 3,
    text: "Кто знает?",
  },
];

for (const post of examples) {
  console.log(evaluateNews(post));
}
