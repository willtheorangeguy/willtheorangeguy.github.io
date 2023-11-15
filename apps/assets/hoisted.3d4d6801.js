import "https://www.google.com/recaptcha/api.js?render=6Ld-WwAiAAAAAKfIZkOlY0Y-RF5obrjrEiWI1TwC";
grecaptcha.ready(async () => {
  const e = await grecaptcha.execute(
    "6Ld-WwAiAAAAAKfIZkOlY0Y-RF5obrjrEiWI1TwC",
    { action: "homepage" },
  );
  document.querySelector("#captchaResponse").value = e;
});
