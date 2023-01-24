export const dateToString = (date: string = "") => {
    const dateToString = new Date(date).toLocaleDateString().split('/').join('.');
    return dateToString;
}

