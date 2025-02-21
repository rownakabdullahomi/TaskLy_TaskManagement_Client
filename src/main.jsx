import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskProvider from "./providers/TaskProvider";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TaskProvider>
          <RouterProvider router={router}></RouterProvider>
        </TaskProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
