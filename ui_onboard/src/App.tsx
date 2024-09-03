import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
