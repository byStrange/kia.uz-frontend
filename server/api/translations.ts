import { useFetchApi } from "~/composables/useFetchApi"

interface MessageTranslation {
  language_code: string
  translation: string
}

interface MessageSource {
  message: string
  translations: MessageTranslation[]
}

interface MessageGroup {
  name: string
  messages: MessageSource[]
}
export default defineEventHandler(async () => {

  const data = await useFetchApi<MessageGroup[]>("/translations")
  const result: { [key: string]: { [key: string]: { [key: string]: string } } } = {

  };

  // First pass: identify all language codes and initialize their objects
  data.forEach(section => {
    section.messages.forEach(messageObj => {
      if (messageObj.translations && messageObj.translations.length > 0) {
        messageObj.translations.forEach(translation => {
          if (!result[translation.language_code]) {
            result[translation.language_code] = {};
          }
        });
      }
    });
  });

  // Add English (assuming the 'message' field is in English)
  if (!result['en']) {
    result['en'] = {};
  }

  // Second pass: populate the translations
  data.forEach(section => {
    const sectionName = section.name.replace('/', ''); // Remove slash for path names

    section.messages.forEach(messageObj => {
      const messageKey = messageObj.message;

      // Add the English message (original)
      if (!result['en'][sectionName]) {
        result['en'][sectionName] = {};
      }
      result['en'][sectionName][messageKey] = messageObj.message;

      // Add translations for other languages
      if (messageObj.translations && messageObj.translations.length > 0) {
        messageObj.translations.forEach(translation => {
          if (!result[translation.language_code][sectionName]) {
            result[translation.language_code][sectionName] = {};
          }
          result[translation.language_code][sectionName][messageKey] = translation.translation;
        });
      }
    });
  });

  return result
})
