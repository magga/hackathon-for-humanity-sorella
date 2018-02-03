export const validateEmail = (email) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
    
    if (email.match(mailformat)) {  
        return true;  
    }

    return false;
};

export const validatePassword = (pass) => {
    if (pass.length >= 6) {
        return true;
    }

    return false;
};

export const validateHandphone = (phone) => {
    if (phone.length < 2) {
        return false;
    } else if (phone.substring(0, 2) !== '08') {
        return false;
    }

    return true;
};

export const validateOTP = (otp) => {
    if (otp.length !== 4) {
        return false;
    }

    return true;
};

export const formattingDate = (date) => {
    return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
};

const padNumber = (number) => {
    return (number < 10 ? '0' : '') + number;
};
