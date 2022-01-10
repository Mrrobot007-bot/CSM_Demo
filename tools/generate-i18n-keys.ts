const fs = require("fs");
const prettier = require("prettier");
const flatten = require("flat");

const enResourceRaw = require("../src/i18n/translations/translations_en_US.json");

const flattenedObject = flatten(enResourceRaw);

const fileContent = `
// This file is auto-generated. Do not edit. To regenerate the file, run 'yarn i18n:sync'.
export const I18NKeys = ${JSON.stringify(flattenedObject)};

export type I18NKeyName = keyof typeof I18NKeys;
`;

fs.writeFileSync("./src/i18n/translation-keys.ts", prettier.format(fileContent, { parser: "typescript" }));
