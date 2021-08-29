import { makeStyles } from "@material-ui/core/styles";
import { themeColors } from "../../util/colors";

export const useStyles = makeStyles(
    {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: themeColors.lightBlue,
            minHeight: 900,
        },
        topLeftBtn: {
            position: "absolute",
            top: "8px",
            left: "0px",
        },
        card: {
            borderRadius: 12,
            minWidth: 700,
            textAlign: "center",
            marginTop: 50,
            marginBottom: 50,
            minHeight: 800,
        },
        header: {
            textAlign: "center",
            spacing: 10,
        },
        alertBox: {
            borderRadius: 15,
            position: "absolute",
            top: "100px",
        },
        button: {
            margin: 15,
        },
        buttonGroup: {
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
    },

    { index: 1 }
);
