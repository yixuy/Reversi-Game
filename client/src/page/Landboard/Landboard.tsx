import { Button, Divider, Typography } from "@material-ui/core";
import { useStyles } from "./landboard.style";
import { useHistory } from "react-router-dom";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import land from "../../public/land.png";
import { getUser } from "../../util/cookie";

const Landboard = () => {
    const history = useHistory();
    const styles = useStyles();
    const url = "https://en.wikipedia.org/wiki/Reversi";
    return (
        <React.Fragment>
            <main>
                <div className={styles.container}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Welcome To Reversi
                        </Typography>
                        <img src={land} alt="Land" className={styles.image} />
                        <br />
                        <Typography variant="h6" align="center" paragraph>
                            Reversi, or Othello as it’s most commonly known, a
                            popular board game in the world, may resemble the
                            game of checkers, but it offers a vastly different
                            gaming experience. Before you play the game, you can
                            fill out some information to play~
                        </Typography>
                        <div className={styles.buttons}>
                            <Grid container spacing={3} justify="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            getUser()
                                                ? history.push("/Game")
                                                : history.push("/Register")
                                        }
                                    >
                                        Play the Game
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            history.push("/Register")
                                        }
                                    >
                                        Register
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => history.push("/Record")}
                                    >
                                        Record
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <br />
                        <Typography variant="h4" align="center" paragraph>
                            How to play:)))
                        </Typography>
                        <Typography variant="h6" align="center">
                            If you are the first time playing the game, Click
                            the [PLAY THE GAME] button, it will jump to register
                            page and you need to fill out all the forms or you
                            can click the [REGISTER] button, after you finish
                            filling the information, you will go to game page.
                        </Typography>
                        <br />
                        <Divider variant="middle" />
                        <br />
                        <Typography variant="h6" align="center">
                            If you are not the first time playing the game,
                            Click the [PLAY THE GAME] button, it will jump to
                            game page or you can click the [REGISTER] button to
                            create a new player
                        </Typography>
                        <br />
                        <Divider variant="middle" />
                        <br />
                        <Typography variant="h6" align="center">
                            You will see the score record after you click the
                            [RECORD] button
                        </Typography>
                        <br />
                        <Divider variant="middle" />
                        <br />
                        <Typography variant="h4" align="center" paragraph>
                            Game
                        </Typography>
                        <Typography variant="h6" align="center">
                            Please take a look at the Rules section in the
                            linked page
                        </Typography>
                        <a href={url}>Know the Reversi Rule</a>
                        <Typography variant="h6" align="center">
                            When you play the game, you will have a chance to
                            [undo] and [restart] the game When you hit the
                            header of the game page, you will go back to the
                            Home page. Remember you are black chess and AI is
                            white chess. There are three buttons between header
                            and board（restart, undo and pass) Some of them will
                            not show up if it is not required.There is a toggle
                            button that can change the theme when you play the
                            game. For your hint, please click the disk with the
                            checked sign on the board, and please wait for a
                            second because the AI handle the case. And For the
                            score, you will see it at the bottom of the page.
                            After the game finish, you will have a choice to
                            play again or not, if you want to play again, the
                            board will restart. If you quit, you will jump to
                            the record page to see your rank.
                        </Typography>
                        <br />
                        <b> Remember you are black!!!</b>
                        <br />
                        <Divider variant="middle" />
                        <br />{" "}
                        <Typography variant="h4" align="center" paragraph>
                            Record
                        </Typography>
                        <Typography variant="h6" align="center">
                            If the same username's player plays the game, the
                            the score will be cumulative.If the different
                            username's the player plays the game, you can
                            compare the score on the record page while clicking
                            the [record] button. It will show basic player
                            information and score, and male is blue female is
                            pink on the right hand side. The rank will be from
                            the highest average score to lowest score
                            <Divider variant="middle" />
                        </Typography>
                    </Container>
                </div>
            </main>

            <footer className={styles.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    About Me
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Henry Ye
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    SFU ID：301368702
                </Typography>
                <br />

                <Typography variant="h6" align="center">
                    <FacebookIcon className={styles.icon} />
                    <InstagramIcon className={styles.icon} />
                    <TwitterIcon className={styles.icon} />
                    <EmailIcon className={styles.icon} />
                </Typography>
                <br />
            </footer>
        </React.Fragment>
    );
};

export default Landboard;
