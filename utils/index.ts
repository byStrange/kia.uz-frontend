export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce(
    (groups, item) => {
      ; (groups[key(item)] ||= []).push(item)
      return groups
    },
    {} as Record<K, T[]>,
  )

export function toQuery<T extends Record<string, any>>(
  params: T,
  keyMap: Partial<Record<keyof T, string>> = {}
): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const mappedKey = keyMap[key as keyof T] || key;
      return `${encodeURIComponent(mappedKey)}=${encodeURIComponent(String(value))}`;
    })
    .join('&');

  return query ? `?${query}` : '';
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}


interface HasOrder<T> {
  order?: T | null;
  [key: string]: any; // Allow other properties
}

export function sortArrayOfObjectsByOrder<T extends number | string | null | undefined, U extends HasOrder<T>>(arr: U[]): U[] {
  if (!Array.isArray(arr)) {
    console.error("Input is not an array.");
    return [];
  }

  return arr.slice().sort((a, b) => {
    if (a.order === undefined || a.order === null) {
      return 1;
    }
    if (b.order === undefined || b.order === null) {
      return -1;
    }

    if (typeof a.order !== typeof b.order) {
      return 0; // Keep original order if types are different
    }

    if (typeof a.order === 'number' && typeof b.order === 'number') {
      return a.order - b.order;
    }

    if (typeof a.order === 'string' && typeof b.order === 'string') {
      return a.order.localeCompare(b.order);
    }

    return 0; // Fallback for other types or if types are the same but not number or string
  });
}

export function generateCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

