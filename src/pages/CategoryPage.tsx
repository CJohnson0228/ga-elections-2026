import { useParams, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { CategoryPageTemplate } from "../features/category";
import { dataService } from "../services/dataService";
import { useRaces } from "../hooks/useRaces";
import type { CategoryDataType } from "../types";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categories, setCategories] = useState<Record<string, CategoryDataType>>({});
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await dataService.getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const { races, loading: racesLoading } = useRaces();

  if (categoriesLoading || racesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!categoryId || !categories[categoryId]) {
    return <Navigate to="/" replace />;
  }

  const category = categories[categoryId];

  // Filter races that have any of the category's tags in their raceTags array
  const categoryRaces = Object.values(races).filter((race) =>
    race.raceTags.some((tag) => category.raceTags.includes(tag))
  );

  return (
    <CategoryPageTemplate
      title={category.title}
      subtitle={category.subtitle}
      descriptionHeading={category.descriptionHeading}
      description={category.description}
      newsTitle={category.newsTitle}
      categoryRaces={categoryRaces}
      categoryTags={category.raceTags}
    />
  );
}
