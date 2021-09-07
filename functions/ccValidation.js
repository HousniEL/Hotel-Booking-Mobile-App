
export function ccFirstNum(value){
    if( value === "4" ) return "visa";
    if( value === "5" ) return "mastercard";
    return "undefined";
}

export function visaValidation(value){
    var pattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    if(!pattern.test(value)) return 'Visa card number incorrect.';
    return '';
}


export function mastercardValidation(value){
    var pattern = /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    if(!pattern.test(value)) return 'MasterCard card number incorrect.';
    return '';
}


export function cvvValidation(value){
    var pattern = /[^0-9]/;
    if(pattern.test(value)) return ' ';
    return '';
}


export function expValidation(value){
    var pattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if(!pattern.test(value)) return ' ';
    return '';
}