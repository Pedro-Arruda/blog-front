import { AuthContextProvider } from "./context/authContext";
import { Router } from "./router";
import "./global.css";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
