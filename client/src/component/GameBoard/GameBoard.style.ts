import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            [theme.breakpoints.up("xs")]: {
                margin: "3px 0 0 0",
            },
            [theme.breakpoints.up("sm")]: {
                margin: "15px 0 0 0",
            },
        },
        cell: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#2196f3",
            height: "110px",
            width: "100%",
            alignItems: "center",
        },
        scoreChess: {
            [theme.breakpoints.up("xs")]: {
                fontSize: 80,
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: 80,
            },
            [theme.breakpoints.up("md")]: {
                fontSize: 80,
            },
            [theme.breakpoints.up("xl")]: {
                fontSize: 80,
            },
        },
        scoreSpace: {
            padding: "20px 0 10px 0",
            backgroundColor: theme.palette.primary.main,
        },
    });
});
