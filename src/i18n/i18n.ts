import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = {
  en: require('./translations/translations_en_US.json'),
  pt_BR: require('./translations/translations_pt_BR.json'),
};
