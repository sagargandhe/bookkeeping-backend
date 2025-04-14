const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: ["en", "hi"],
  directory: path.join(__dirname, "../locales"),
  defaultLocale: "en",
  queryParameter: "lang",
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
  api: {
    __: "t", // <== IMPORTANT: bind req.t()
  },
});

module.exports = i18n;
