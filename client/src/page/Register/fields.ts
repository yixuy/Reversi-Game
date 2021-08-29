import * as Yup from "yup";
import { Gender } from "../../util/users";

export interface IRouteParams {
    userId: string;
}

export enum UserField {
    username = "username",
    first_name = "first_name",
    last_name = "last_name",
    gender = "gender",
}

export const fieldLabels = {
    [UserField.username]: "Username",
    [UserField.first_name]: "First Name",
    [UserField.last_name]: "Last Name",
    [UserField.gender]: "Gender",
};

export const initialValues = {
    [UserField.username]: "",
    [UserField.first_name]: "",
    [UserField.last_name]: "",
    [UserField.gender]: Gender.Male,
};

export type TNewUserValues = typeof initialValues;

const infoValidationShape = {
    [UserField.first_name]: Yup.string()
        .label(fieldLabels[UserField.first_name])
        .required()
        .max(50),
    [UserField.last_name]: Yup.string()
        .label(fieldLabels[UserField.last_name])
        .required()
        .max(50),
    [UserField.username]: Yup.string()
        .label(fieldLabels[UserField.username])
        .required()
        .max(50),
    [UserField.gender]: Yup.string()
        .label(fieldLabels[UserField.gender])
        .required(),
};

export const newValidationSchema = Yup.object().shape({
    ...infoValidationShape,
});
