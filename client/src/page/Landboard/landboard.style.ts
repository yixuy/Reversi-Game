import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    // https://www.w3schools.com/howto/howto_css_image_center.asp
    image: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    container: {
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    buttons: {
        marginTop: theme.spacing(4),
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
    },

    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },

    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));
