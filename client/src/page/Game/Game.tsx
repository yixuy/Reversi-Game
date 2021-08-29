import {
    Paper,
    Grid,
    ThemeProvider,
    createTheme,
    Switch,
} from "@material-ui/core";
import Header from "../../component/Header/Header";
import GameBoard from "../../component/GameBoard/GameBoard";
import { initialChessBoard } from "../../util/utilBoard";
import { useState } from "react";

const Game = () => {
    const [lightMode, setLightMode] = useState<boolean>(true);
    const theme = createTheme({
        palette: {
            type: lightMode ? "light" : "dark",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} square style={{ height: "100%" }}>
                <Grid container direction="column">
                    <Grid item>
                        <Header />
                        <Switch
                            disableRipple
                            checked={lightMode}
                            onChange={(event) =>
                                setLightMode(event.target.checked)
                            }
                        />
                    </Grid>
                    <Grid item container>
                        <Grid item sm={1} />
                        <Grid item xs={12} sm={10}>
                            <GameBoard initialBoard={initialChessBoard} />
                        </Grid>
                        <Grid item sm={1} />
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default Game;
