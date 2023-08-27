export const validateEmail = (email : string)  => {
    const emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}


export const validatePassword = (password: string): boolean  =>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@!*])(?=.*\d)[A-Za-z@!*0-9]{8,}$/;
    return passwordRegex.test(password);
}