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

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export default defineEventHandler(async () => {

  const pageSize = 5
  const firstPage = await useFetchApi<PaginatedResponse<MessageGroup>>(`/translations?page=1&page_size=${pageSize}`)
  const total = firstPage.count
  const totalPages = Math.ceil(total / pageSize)

  const allPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      useFetchApi<PaginatedResponse<MessageGroup>>(`/translations?page=${i + 2}&page_size=${pageSize}`)
    )
  )

  const allGroups = [firstPage, ...allPages].flatMap(page => page.results)
  const result: { [key: string]: { [key: string]: { [key: string]: string } } } = {

  };

  // First pass: identify all language codes and initialize their objects
  allGroups.forEach(section => {
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
  allGroups.forEach(section => {
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
