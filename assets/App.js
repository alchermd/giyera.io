import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/fragments/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/fragments/Footer";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import GameLobby from "./pages/GameLobby";
import WebSocketGame from "./components/WebSocketGame";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/new">
            <GameLobby />
          </Route>
          <Route path="/:gameCode">
            <WebSocketGame />
          </Route>
          <Route path="/room/:roomNumber">
            <Room />
          </Route>
          <Route path="/room">
            <Lobby />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </DndProvider>
  );
}

export default App;
