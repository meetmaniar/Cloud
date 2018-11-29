import Cookies from 'js-cookie';

const logout = (name) => {
    Cookies.remove(name);
};

export default logout;
