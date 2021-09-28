
export function requiredInput(name, value) {
    if(!value) return false;
    value = cleanInput(name, value);
    return value !== "";
}


export function emailValidation(value){
    if(value !== ""){
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(!re.test(value)) return 'Email Incorrect';
        return '';
    } else { return "Required Field" }
}

export function phoneNumberValidation(value){
    if(value !== ""){
        //const re = /^(((\+[0-9]{3}( ))|0)[6-7][0-9]{2}\-[0-9]{6})$/g;
        //if(!re.test(value)) return "Phone Number Incorrect";
        return '';
    } else { return "Required Field" }
}

export function pwdValidation(pwd){
    if(pwd !== ""){
        if(pwd.length < 8) return "At least 8 charcters";
        //const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm; 
        //if(!regex.test(pwd)) return "Password Incorrect";
        return '';
    } else { return "Required Field" }
}

export function pwdConfirmationValidation(pwd, pwdConfirmation) {
    if(pwd !== "" && pwdConfirmation !== ""){
        if(pwd !== pwdConfirmation) return "Password Different";
        return '';
    }
}

function cleanInput(name, value){
    if( name !== "pwd" && name !== "pwdConfirmation" ){
      if( name !== "phoneNumber" && name !== "email" ){
        value = value.trim();
        value = value.replace(/[<( )>]+/gi, "");
      }
    }
    return value;
}