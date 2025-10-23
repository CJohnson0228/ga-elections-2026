import { useParams, Navigate } from "react-router";
import { CategoryPageTemplate } from "../features/category";
import { categories } from "../data/races/raceCategories";
import { useRaces } from "../hooks/useRaces";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  if (!categoryId || !categories[categoryId]) {
    return <Navigate to="/" replace />;
  }

  const category = categories[categoryId];
  const { races, loading: racesLoading } = useRaces();

  if (racesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Filter races that have any of the category's tags in their raceTags array
  const categoryRaces = Object.values(races).filter((race) =>
    race.raceTags.some((tag) => category.raceTags.includes(tag))
  );

  console.log(categoryRaces);

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
