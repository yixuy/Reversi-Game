// https://github.com/snerks/react-mui-reversi-ts/blob/master/src/components/GameFinishedSnackBar.tsx
import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, createStyles, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.info.main,
        },
    });
});

interface IProps {
    message: string;
    restart?: () => void;
}

const GameOver = ({ message, restart }: IProps) => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <div className={styles.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={open}
                autoHideDuration={10000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    severity="success"
                    action={
                        <>
                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    restart?.();
                                    setOpen(false);
                                }}
                            >
                                OK
                            </Button>
                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => history.push("/Record")}
                            >
                                NO
                            </Button>
                        </>
                    }
                >
                    <AlertTitle>
                        <strong>{message}</strong>
                    </AlertTitle>
                    {message !== `Computer has passed!` &&
                        "Do you want to play again?"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default GameOver;
