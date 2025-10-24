import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import AnimatedPage from "./components/layout/AnimatedPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./pages/NewsPage";
import RacePage from "./pages/RacePage";
import CategoryPage from "./pages/CategoryPage";
import CandidatePage from "./pages/CandidatePage";

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <AnimatedPage>
            <HomePage />
          </AnimatedPage>
        ),
      },
      {
        path: "about",
        element: (
          <AnimatedPage>
            <AboutPage />
          </AnimatedPage>
        ),
      },
      {
        path: "news",
        element: (
          <AnimatedPage>
            <NewsPage />
          </AnimatedPage>
        ),
      },
      {
        path: "categories/:categoryId",
        element: (
          <AnimatedPage>
            <CategoryPage />
          </AnimatedPage>
        ),
      },
      {
        path: "races/:raceId",
        element: (
          <AnimatedPage>
            <RacePage />
          </AnimatedPage>
        ),
      },
      {
        path: "candidate/:candidateId",
        element: (
          <AnimatedPage>
            <CandidatePage />
          </AnimatedPage>
        ),
      },
    ],
  },
]);
