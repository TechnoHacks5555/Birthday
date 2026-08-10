import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // Use Vite's BASE_URL so React Router works when the app is served
  // from a subpath (e.g. GitHub Pages project site at /Birthday/).
  const basename = import.meta.env.BASE_URL || "/";

  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;