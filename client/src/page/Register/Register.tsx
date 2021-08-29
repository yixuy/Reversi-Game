import { Field, Form, Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import {
    fieldLabels,
    UserField,
    initialValues,
    newValidationSchema,
} from "./fields";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import {
    Card,
    CardHeader,
    Divider,
    FormControl,
    MenuItem,
    Typography,
} from "@material-ui/core";
import { useStyles } from "./Register.style";
import { handleNewSubmit } from "./handler";
import { Gender } from "../../util/users";

const Register = () => {
    const styles = useStyles();
    const history = useHistory();

    const handleDash = () => {
        return history.push("/");
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={newValidationSchema}
            onSubmit={handleNewSubmit}
        >
            {({ isSubmitting }) => (
                <div className={styles.container}>
                    <Button onClick={handleDash} className={styles.topLeftBtn}>
                        Back to Home
                    </Button>

                    <br />
                    <br />

                    <Card className={styles.card}>
                        <CardHeader
                            title="Register"
                            titleTypographyProps={{ variant: "h2" }}
                            className={styles.header}
                        />
                        <Divider variant="middle" />
                        <br />
                        <Form>
                            <Grid container spacing={2} justify="center">
                                <Grid item md={4} xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <Field
                                            component={TextField}
                                            select
                                            required
                                            variant="outlined"
                                            label={
                                                fieldLabels[UserField.gender]
                                            }
                                            name={UserField.gender}
                                        >
                                            {Object.entries(Gender).map(
                                                ([value, name]) => (
                                                    <MenuItem
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <br />

                                <Grid item md={7} xs={12}>
                                    <Field
                                        component={TextField}
                                        name={UserField.username}
                                        variant="outlined"
                                        label={fieldLabels[UserField.username]}
                                        required
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Field
                                        component={TextField}
                                        name={UserField.first_name}
                                        variant="outlined"
                                        label={
                                            fieldLabels[UserField.first_name]
                                        }
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <br />

                                <Grid item md={5} xs={12}>
                                    <Field
                                        component={TextField}
                                        name={UserField.last_name}
                                        variant="outlined"
                                        label={fieldLabels[UserField.last_name]}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Divider variant="middle" />
                            <Typography variant="body1" align="center">
                                All of this is for your game score record
                            </Typography>
                            <Divider variant="middle" />
                            <br />
                            <div>
                                <Grid container justify="center" spacing={2}>
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                <br></br>
                            </div>
                        </Form>
                        <Divider variant="middle" />
                    </Card>
                </div>
            )}
        </Formik>
    );
};

export default Register;
