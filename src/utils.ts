import { SITE_CONF } from './api/config';
import { StringMap } from './types';

export const getImageUrl = (path: string) => {
  return new URL(`./assets/${path}`, import.meta.url).href;
};

export function getToken(): { access: string | null; refresh: string | null } {
  const access = localStorage.getItem(
    SITE_CONF.LOCALSTORAGE_ACCESS_TOKEN_KEY || 'access_token'
  );
  const refresh = localStorage.getItem(
    SITE_CONF.LOCALSTORAGE_REFRESH_TOKEN_KEY || 'refresh_token'
  );

  return {
    access,
    refresh,
  };
}

export function toQueryString(
  obj: StringMap,
  includePaginationParamsByDefault: boolean = true
) {
  const parts = [];
  if (includePaginationParamsByDefault) {
    if (!obj.current_page) obj.current_page = 1;
    if (!obj.page_size) obj.page_size = SITE_CONF.DEFAULT_PER_PAGE;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  }
  return parts.length > 0 ? `?${parts.join('&')}` : '';
}

interface DateTimeObject {
  date: () => string;
  time: () => string;
  text: (level: number) => string;
  datetime: () => string;
  offsetBetween: (otherDateTime: DateTimeObject) => DateTimeObject;
}

export function createDateTimeObject(dateTimeString: string): DateTimeObject {
  const dateObject = new Date(dateTimeString);
  const now = new Date();

  return {
    date: () => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return dateObject.toLocaleDateString(undefined, options);
    },
    time: () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      };
      return dateObject.toLocaleTimeString(undefined, options);
    },
    datetime: () => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      };
      return dateObject.toLocaleString(undefined, options);
    },
    offsetBetween: (otherDateTime: DateTimeObject) => {
      const offsetMs =
        dateObject.getTime() - new Date(otherDateTime.datetime()).getTime();
      const offsetDate = new Date(offsetMs);

      return createDateTimeObject(offsetDate.toISOString());
    },
    text(level: number = Infinity): string {
      const diffInMs = now.getTime() - dateObject.getTime();
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInSeconds < 60 && level >= 0) {
        return 'just now';
      } else if (diffInMinutes < 60 && level >= 1) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffInHours < 24 && level >= 2) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      } else if (diffInDays < 31 && level >= 3) {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      } else {
        // Return full date and time if level is exceeded or not specified
        return this.date();
      }
    },
  };
}
