import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
    {
        container: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#d0e6ed",
        },
        logo: {
            display: "block",
            width: "100%",
        },
        btn: {
            marginRight: 8,
        },
        topLeftBtn: {
            position: "absolute",
            top: "8px",
            left: "0px",
        },
        topRightBtn1: {
            position: "absolute",
            top: "8px",
            right: "0px",
        },
        topRightBtn2: {
            position: "absolute",
            top: "8px",
            right: "60px",
        },
        card: {
            borderRadius: 12,
            maxWidth: 500,
            textAlign: "center",
            margin: 0,
            float: "none",
            marginBottom: 10,
        },
        header: {
            textAlign: "center",
            spacing: 10,
        },
        action: {
            display: "flex",
            justifyContent: "space-around",
        },
        alertBox: {
            borderRadius: 15,
            position: "absolute",
            top: "100px",
        },
    },

    { index: 1 }
);
