
export const validation=(email,password)=>{
    const emailRegex=/(?:((?:[\w-]+(?:\.[\w-]+)*)@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?:\.[a-z]{2})?));*)/g;
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     

    if(!emailRegex.test(email)){
        return 'Please enter a valid email address.';
    }
    if(!passwordRegex.test(password)){
        return 'Please enter a valid password.';
    }


    return null;

};