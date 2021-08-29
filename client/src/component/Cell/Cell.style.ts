import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            margin: "15px 0",
        },
        cell: {
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
        },
        chess: {
            [theme.breakpoints.up("xs")]: {
                fontSize: 60,
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: 60,
            },
            [theme.breakpoints.up("md")]: {
                fontSize: 60,
            },
            [theme.breakpoints.up("lg")]: {
                fontSize: 60,
            },
            [theme.breakpoints.up("xl")]: {
                fontSize: 60,
            },
        },
    })
);
