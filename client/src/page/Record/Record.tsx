import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@material-ui/core";
import { useStyles } from "./Record.style";
import { useEffect, useState } from "react";
import { Alert, Skeleton } from "@material-ui/lab";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import React from "react";
import { API_URL, Endpoint } from "../../util/endpoints";

interface IUserRecord {
    first_name: string;
    last_name: string;
    score: number;
    aver_score: number;
    username: string;
    date_created: Date;
    times: number;
    gender: string;
}

const convertDateToString = (date: Date) => {
    const tmpDate = new Date(date);
    const dateString =
        tmpDate.getFullYear() +
        "-" +
        tmpDate.getMonth() +
        "-" +
        tmpDate.getDate();
    return dateString;
};

const Record = () => {
    const styles = useStyles();
    const history = useHistory();
    const [userRecord, setUserRecord] = useState<IUserRecord[]>();
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        try {
            fetch(API_URL + Endpoint.GAME).then((response) => {
                response.json().then((data) => {
                    setUserRecord(data.user as IUserRecord[]);
                });
            });
        } catch (err) {
            console.log(err);
            setLoadingError(true);
        }
    }, []);

    const handleDash = () => {
        return history.push("/");
    };
    return (
        <div className={styles.container}>
            <Button onClick={handleDash} className={styles.topLeftBtn}>
                Back to Home
            </Button>
            <br />
            <br />
            <Card className={styles.card}>
                <CardHeader
                    title="Game Record"
                    titleTypographyProps={{ variant: "h3" }}
                    className={styles.header}
                />
                <b>
                    {" "}
                    The Score compare with 32, If it is greater, the user defeat
                    AI{" "}
                </b>
                <Divider variant="middle" />

                {userRecord?.length === 0 ? (
                    <b>
                        There is no user recorded, please click [BACK TO HOME]
                        button and play game!
                    </b>
                ) : (
                    <br />
                )}
                {loadingError ? (
                    <Alert severity="error">
                        Something went wrong. Please try again.
                    </Alert>
                ) : userRecord !== undefined ? (
                    <List>
                        {userRecord?.map((user) => (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <b>Username: </b>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {user.username}
                                                </Typography>
                                                <br />
                                                <b>Player Name: </b>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {user.first_name}{" "}
                                                    {user.last_name}{" "}
                                                </Typography>
                                                <br />
                                                <b>Last Play Date : </b>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {convertDateToString(
                                                        user.date_created
                                                    )}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <br />

                                                <br />
                                                <b> Recent Score: </b>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    <b>{user.score}</b>
                                                </Typography>
                                                <br />
                                                <b> Average Score: </b>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    <b>{user.aver_score}</b>
                                                </Typography>
                                                <br />
                                                <b> Total Times Play: </b>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    <b>{user.times}</b>
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <div className={styles.buttonGroup}>
                                        <IconButton className={styles.button}>
                                            {user.gender === "Male" ? (
                                                <PermIdentityIcon color="primary" />
                                            ) : (
                                                <PermIdentityIcon color="secondary" />
                                            )}
                                        </IconButton>
                                    </div>
                                </ListItem>
                                <Divider variant="middle" />
                            </>
                        ))}
                        <br />
                        <br />
                    </List>
                ) : (
                    <Skeleton variant="rect" height={1000} />
                )}
            </Card>
        </div>
    );
};

export default Record;
