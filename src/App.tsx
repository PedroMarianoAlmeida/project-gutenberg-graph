import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";

import { BookForm } from "@/components/BookForm";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BookForm />
    </ThemeProvider>
  );
}

export default App;
