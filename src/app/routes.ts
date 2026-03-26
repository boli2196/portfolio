import { createHashRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ContactPage } from "./pages/ContactPage";
import { Layout } from "./components/Layout";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "experience", Component: ExperiencePage },
      { path: "projects", Component: ProjectsPage },
      { path: "projects/:projectId", Component: ProjectDetailPage },
      { path: "skills", Component: SkillsPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);
