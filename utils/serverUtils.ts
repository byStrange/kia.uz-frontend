import type { Model } from "~/server/api/models/[id]/index.get";

// Define a generic interface for any item with a category
export interface ItemWithCategory {
  category: {
    id: number | string;
    name: string;
  };
}

// Generic grouped items interface
export interface GroupedItems<T extends ItemWithCategory> {
  [categoryId: string]: {
    categoryName: string;
    items: T[];
  };
}

// Generic grouping function
export function groupByCategory<T extends ItemWithCategory>(items: T[]): GroupedItems<T> {
  return items.reduce((acc: GroupedItems<T>, item) => {
    const categoryId = item.category?.id.toString();

    if (!acc[categoryId]) {
      acc[categoryId] = {
        categoryName: item.category?.name,
        items: []
      };
    }

    acc[categoryId].items.push(item);
    return acc;
  }, {});
}

export const emptySeo: SEO = { seo: { title: '', description: '', keywords: '', }, url: '', name: '' }

export type GroupedModels = GroupedItems<ModelWithLessData>;
export type GroupedSpecialOffer = GroupedItems<SpecialOffer>;

// If you need to keep the original function names for backwards compatibility:
export function groupModelsByCategory(models: ModelWithLessData[]): GroupedModels {
  return groupByCategory(models);
}

export function groupSpecialOffersByCategory(offers: SpecialOffer[]): GroupedSpecialOffer {
  return groupByCategory(offers);
}
