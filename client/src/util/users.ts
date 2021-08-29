export interface IUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    gender: string;
}

export enum Gender {
    Male = "Male",
    Female = "Female",
}

export const gender = {
    [Gender.Male]: {
        name: "Male",
    },
    [Gender.Female]: {
        name: "Female",
    },
};
