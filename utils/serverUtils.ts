import type { Model } from "~/server/api/models/[id]/index.get";
import type { NewsWithoutContent, SpecialOfferWithoutContent } from "~/types/server";

export interface ItemWithCategory {
  category: {
    id: number | string;
    name: string;
    order?: number
  };
}

export interface GroupedItems<T extends ItemWithCategory> {
  [categoryId: string]: {
    categoryName: string;
    items: T[];
    order?: number
  };
}

export function groupByCategory<T extends ItemWithCategory>(items: T[]): GroupedItems<T> {
  return items.reduce((acc: GroupedItems<T>, item) => {
    const categoryId = item.category?.id.toString();

    if (!acc[categoryId]) {
      acc[categoryId] = {
        categoryName: item.category?.name,
        items: [],
        order: item.category.order
      };
    }

    acc[categoryId].items.push(item);
    return acc;
  }, {});
}

export const emptySeo: SEO = { seo: { title: '', description: '', keywords: '', }, url: '', name: '' }

export type GroupedModels = GroupedItems<ModelWithLessData>;
export type GroupedSpecialOfferWithoutContent = GroupedItems<SpecialOfferWithoutContent>;
export type GroupedNews = GroupedItems<NewsWithoutContent>;
export type GroupedModelsFull = GroupedItems<Model>;

export function groupModelsByCategory(models: ModelWithLessData[]): GroupedModels {
  return groupByCategory(models);
}

export function groupSpecialOffersByCategory(offers: SpecialOfferWithoutContent[]): GroupedSpecialOfferWithoutContent {
  return groupByCategory(offers);
}

export function groupNewsByCategory(news: NewsWithoutContent[]): GroupedNews {
  return groupByCategory(news)
}

export function groupModelsFullByCategory(models: Model[]): GroupedModelsFull {
  return groupByCategory(models)
}
