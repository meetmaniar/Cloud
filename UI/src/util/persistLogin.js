import Cookies from 'js-cookie';

const rememberme = (remember, name, value) => {
    if(remember) Cookies.set(name, value, { expires: 7 });
};

export default rememberme;
