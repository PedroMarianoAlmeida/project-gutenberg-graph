import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { BookForm } from "@/components/BookForm";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BookForm />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
