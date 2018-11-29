import Cookies from 'js-cookie';

const authenticated = async () => {
    return Cookies.get('recommender-user-token');
};

export default authenticated;
