// https://github.com/snerks/react-mui-reversi-ts/blob/master/src/components/GameCell.tsx
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CheckIcon from "@material-ui/icons/Check";
import { useStyles } from "./Cell.style";
import { themeColors } from "../../util/colors";
import { themeIcons } from "../../util/icons";
import { noFunctionCall } from "../GameHandler";

export interface ICellProps {
    row: number;
    column: number;
    isWhite?: boolean;
    isValid: boolean;
    playerWhite: boolean;
    handleClick: (row: number, column: number) => void;
}

const Cell = (props: ICellProps) => {
    const styles = useStyles();
    const isOccupied = props.isWhite !== undefined;

    let chessColor = isOccupied
        ? props.isWhite
            ? themeColors.white
            : themeColors.black
        : undefined;

    let emptyCell = (
        <span style={{ color: chessColor, cursor: themeIcons.ban }}>{""}</span>
    );

    if (!isOccupied && props.isValid) {
        chessColor = props.playerWhite ? themeColors.white : themeColors.black;
        emptyCell = <CheckIcon style={{ color: chessColor }} />;
    }

    return (
        <div
            style={{ cursor: props.isValid ? themeIcons.put : themeIcons.ban }}
            onClick={
                isOccupied
                    ? noFunctionCall
                    : () => {
                          props.handleClick(props.row, props.column);
                      }
            }
        >
            {isOccupied ? (
                <FiberManualRecordIcon
                    className={styles.chess}
                    style={{ color: chessColor }}
                />
            ) : (
                emptyCell
            )}
        </div>
    );
};

export default Cell;
