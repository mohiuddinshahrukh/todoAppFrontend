import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./components/routes";
import { Notifications } from "@mantine/notifications";
import { useState } from "react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route
              path={routes.customOutletPath}
              element={routes.customOutletComponent}
            >
              <Route
                path={routes.authFormPath}
                element={routes.authFormElement}
              />
              <Route path={routes.homePath} element={routes.homeElement} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
