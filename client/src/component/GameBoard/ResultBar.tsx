import { Badge, Grid, Typography } from "@material-ui/core";
import { themeColors } from "../../util/colors";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useStyles } from "./GameBoard.style";

interface IResultProps {
    whiteScore: number;
    blackScore: number;
}

const ResultBar = ({ whiteScore, blackScore }: IResultProps) => {
    const styles = useStyles();

    return (
        <Grid item container alignItems="center" alignContent="space-between">
            <Grid item xs={1} />
            <Typography
                variant="h6"
                align="center"
                style={{ color: themeColors.white }}
            >
                AI Score：
            </Typography>
            <Grid item xs={1} container>
                <Grid item container justify="center">
                    <Badge
                        showZero
                        overlap="circle"
                        color="secondary"
                        badgeContent={whiteScore}
                    >
                        <FiberManualRecordIcon
                            className={styles.scoreChess}
                            style={{ color: themeColors.white }}
                        />
                    </Badge>
                </Grid>
            </Grid>

            <Grid item xs={3} sm={5} />
            <Typography
                variant="h6"
                align="center"
                style={{ color: themeColors.white }}
            >
                Your Score:
            </Typography>
            <Grid item xs={1} container>
                <Grid item container justify="center">
                    <Badge
                        showZero
                        color="secondary"
                        overlap="circle"
                        badgeContent={blackScore}
                    >
                        <FiberManualRecordIcon
                            className={styles.scoreChess}
                            style={{ color: themeColors.black }}
                        />
                    </Badge>
                </Grid>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
};

export default ResultBar;
