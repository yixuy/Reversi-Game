// https://github.com/snerks/react-mui-reversi-ts/blob/master/src/components/Header.tsx
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Register from "../../page/Register/Register";
import { getUser } from "../../util/cookie";
import { useStyles } from "./Header.style";

const Header = () => {
    const styles = useStyles();
    const history = useHistory();
    const user = getUser();

    return user ? (
        <AppBar position="static">
            <Toolbar>
                <Button
                    onClick={() => history.push("/")}
                    className={styles.title}
                >
                    AI Reversi ---- Player: {Object.values(user)[0]}
                    (You are black)
                </Button>
            </Toolbar>
        </AppBar>
    ) : (
        <Register />
    );
};

export default Header;
