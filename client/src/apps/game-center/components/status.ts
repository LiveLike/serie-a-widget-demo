export enum Status {
    SUBMIT = 'Głosuj',
    CLOSED = 'Wygasło',
    SUBMITTED = 'Zapisane',
    CLOSED_SUBMITTED = "Zapisane",
}

export const renderSubmitBtnText = (isExpired: boolean, interaction: any, disabled: boolean) => {
    return isExpired
        ? interaction ? Status.CLOSED_SUBMITTED : Status.CLOSED
        : disabled ? Status.SUBMITTED : Status.SUBMIT;
}