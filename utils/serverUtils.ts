import type { Model } from "~/server/api/models/[id]/index.get";

export interface GroupedModels {
  [categoryId: string]: {
    categoryName: string;
    models: ModelWithLessData[];
  };
}

export function groupModelsByCategory(models: ModelWithLessData[]): GroupedModels {

  return models.reduce((acc: GroupedModels, model) => {
    const categoryId = model.category.id.toString();

    if (!acc[categoryId]) {
      acc[categoryId] = {
        categoryName: model.category.name,
        models: []
      };
    }

    acc[categoryId].models.push(model);
    return acc;
  }, {});
}
