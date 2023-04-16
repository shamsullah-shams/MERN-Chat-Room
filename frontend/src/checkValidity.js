const checkValidity = (name, value) => {
    if (name === 'name') {
        // check name
        if (value && value.length > 3) return true;
        else return false;
    } else if (name === 'lastName') {
        // check last name
        if (value && value.length > 3) return true;
        else return false;
    } else if (name === 'email') {
        // check email
        if (value && value.toString().includes('.com')) return true;
        else return false;
    } else if (name === 'password') {
        // check password
        if (value && value.length > 7) return true;
        else return false;
    }
}


export default checkValidity;