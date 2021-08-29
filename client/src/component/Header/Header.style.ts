import { makeStyles } from "@material-ui/styles";
import { themeColors } from "../../util/colors";

export const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        fontWeight: "bold",
        justifyContent: "center",
        color: themeColors.white,
    },
}));
