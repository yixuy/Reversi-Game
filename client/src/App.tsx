import { Router, Route, Switch } from "react-router-dom";
import Game from "./page/Game/Game";
import Landboard from "./page/Landboard/Landboard";
import Record from "./page/Record/Record";
import Register from "./page/Register/Register";
import history from "./util/history";
const App = () => {
    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route exact path="/">
                        <Landboard />
                    </Route>
                    <Route path="/Register">
                        <Register />
                    </Route>
                    <Route path="/Game">
                        <Game />
                    </Route>
                    <Route path="/Record">
                        <Record />
                    </Route>
                </Switch>
            </Router>
        </>
    );
};
export default App;
