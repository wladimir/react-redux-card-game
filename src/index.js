import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// wrap global style over App

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
