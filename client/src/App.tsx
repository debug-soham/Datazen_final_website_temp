import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";
import PixelCardExample from "./components/PixelCardExample";
import { ThemeProvider } from "./contexts/theme-context";

function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/resources" component={Resources} />
        <Route path="/pixel-cards" component={PixelCardExample} />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
