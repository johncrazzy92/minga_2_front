import { createBrowserRouter } from "react-router-dom";
import Index from "../components/Index";
import LayoutHome from "../layouts/LayoutHome";
import Author from "../pages/Author";
import LayoutProfileMe from "../layouts/LayoutProfileMe";
import MangaDetails from "../components/MangaDetails";
import Chapters from "../components/Chapters";
import Mangas from "../components/Mangas";
import Page from "../pages/Page";
import MyMangas from "../pages/MyMangas";
import Login from "../pages/Login";
import MangaForm from "../pages/MangaForm";
import Register from "../components/Register";
import Alert from "../components/Alert";
import ChapterForm from "../components/ChapterForm";
import Donations from "../components/Donations";
import DonationOk from "../components/DonationOk";
import ListComments from "../components/ListComment";
import EditChapter from "../components/EditChapter";
import { AdminPanel } from "../pages/AdminPanel";
import Verify from "../components/Verify";
import Socket from "../components/componentesMangas/Socket";
import Chatbot from "../components/componentesMangas/ChatBot";
import UploadTest from "../components/pruebas/UploadTest";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutHome />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
    ],
  },
  {
    path: "/author",
    element: (
      <ProtectedRoute>
        <LayoutProfileMe />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/author/me",
        element: <Author />,
      },
    ],
  },
  {
    path: "/manga/:id",
    element: <MangaDetails />,
  },
  {
    path: "/chapters/:id",
    element: <Chapters />,
  },
  {
    path: "/mangas/:page",
    element: <Mangas />,
  },
  {
    path: "/mangas",
    element: <Mangas />,
  },
  {
    path: "/chapterPage/:id/:page",
    element: <Page />,
  },
  {
    path: "/mymangas",
    element: (
      <ProtectedRoute requiredRoles={[1, 2, 3]}>
        <MyMangas />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manga-form",
    element: (
      <ProtectedRoute requiredRoles={[1, 2, 3]}>
        <LayoutProfileMe />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/manga-form",
        element: <MangaForm />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Alert",
    element: <Alert />,
  },
  {
    path: "/chapter-form/:id",
    element: (
      <ProtectedRoute requiredRoles={[1, 2, 3]}>
        <ChapterForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit/:manga_id",
    element: (
      <ProtectedRoute requiredRoles={[1, 2, 3]}>
        <EditChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/donations",
    element: <Donations />,
  },
  {
    path: "/donationOk",
    element: <DonationOk />,
  },
  {
    path: "/listComment",
    element: <ListComments />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRoles={[3]}>
        <LayoutProfileMe />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminPanel />,
      },
    ],
  },
  {
    path: "/auth/verify",
    element: <Verify />,
  },
  {
    path: "/socket",
    element: <Socket />,
  },
  {
    path: "/chat-bt",
    element: <Chatbot />,
  },
  {
    path: "/test",
    element: <UploadTest />,
  },
]);

export default router;
