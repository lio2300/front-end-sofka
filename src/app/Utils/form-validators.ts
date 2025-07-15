import {AbstractControl, ValidationErrors} from "@angular/forms";
import moment from "moment";

export const revisionDateValidator = (): ValidationErrors | null => {
    return (control: AbstractControl): ValidationErrors | null => {
        const revision = control.value;

        if (!control.parent) {
            return null;
        }

        const release = control.parent.get("date_release")?.value;
        if (!release || !revision) {
            return null;
        }

        const releaseDate = moment(release).startOf("day");
        const revisionDate = moment(revision).startOf("day");

        const expectedRevisionDate = releaseDate.clone().add(1, "year");

        const valid = revisionDate.isSame(expectedRevisionDate, "day");

        return valid ? null : { date_revision_invalid: true };
    };
};

export const releaseDateValidator = (): ValidationErrors | null => {
    return (control: AbstractControl): ValidationErrors | null => {
        const release = control.value;
        if (!release) {
            return null;
        }

        const releaseDate = moment(release).startOf("day");
        const today = moment().startOf("day");

        return releaseDate.isSameOrAfter(today) ? null : { date_release_invalid: true };
    };
};

export const formControlHasError = (control: AbstractControl, key: string, errorKey: string) => {
    return control.get(key)?.hasError(errorKey);
};
