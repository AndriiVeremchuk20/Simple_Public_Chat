// const getDates = (dateString: string = ""): {stringDate: number, today: number, yesterday: number} => {
//     const dateObj = new Date();

//     const today = dateObj.getDate();
//     const yesterday = dateObj.setDate(dateObj.getDate()-1);
//     const stringDate = new Date(dateString).getDate();
//     return {today, yesterday, stringDate};
// }

export const dateToString = (date: string = "") => {
    const dateToString = new Date(date).toLocaleDateString().split('/').join('.');
    return dateToString;
}

