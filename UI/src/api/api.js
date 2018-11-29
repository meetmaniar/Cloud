import axios from "axios";

const ADMIN_BASE_URL = "https://test.connectngo.com";
const ADMIN_AUTH_TOKEN = "00c6740d947e67fd118e4ac7ea3150";
const RECOMMENDER_BASE_URL = "http://18.219.177.175";
const RECIPE_BASE_URL = "https://api.edamam.com"; 
const RECIPE_API_KEY = "f108317bbe27ceb9fdd46e6c70f1eb21";
const RECIPE_APP_ID = "28cf44fc";

const getMicrositeData = () =>
  axios({
    url: "/backend/getMicrositeConfigData.php",
    method: "GET"
  })
  .then(response => response.data)
  .catch(error => error);
const getMicrositeUserInfo = (info) =>
  axios({
    url: "/backend/getMicrositeUserInfo.php",
    method: "POST",
    data: {
      link: info.link_id
    }
  })
  .then(response => response.data)
  .catch(error => error);
const facebookPosted = (info) =>
  axios({
    url: "/backend/facebookPosted.php",
    method: "POST",
    data: info
  })
  .then(response => response.data)
  .catch(error => error);
const twitterPosted = (info) =>
  axios({
    url: "/backend/twitterPosted.php",
    method: "POST",
    data: info
  })
  .then(response => response.data)
  .catch(error => error);
const getUserLocale = () =>
  axios({
    url: "/backend/getUserLocale.php",
    method: "GET"
  })
  .then(response => response.data)
  .catch(error => error);

const login = (info) =>
  axios({
    url: `${ADMIN_BASE_URL}/api/cockpit/authUser?token=${ADMIN_AUTH_TOKEN}`,
    method: "POST",
    data: info
  })
  .then(response => response.data)
  .catch(error => error);
const authenticatetoken = (info) =>
  axios({
    url: `${ADMIN_BASE_URL}/api/cockpit/listUsers?token=${info}`,
    method: "POST",
    data: {
      filter: {
        api_key: info
      }
    }
  })
  .then(response => response.data[0])
  .catch(error => null);

const setUpRecommender = (info) =>
  axios({
    url: `${RECOMMENDER_BASE_URL}/register`,
    method: "POST",
    data: {
      client_name: info.user,
      client_email: info.email
    }
  })
  .then(response => response.data)
  .catch(error => error);
const loginToRecommender = (info) =>
  axios({
    url: `${RECOMMENDER_BASE_URL}/login`,
    method: "GET",
    auth: {
      username: info.email,
      password: ''
    },
  })
  .then(response => response.data)
  .catch(error => null);
const recommenderProducts = (info) =>
  axios({
    url: `${RECOMMENDER_BASE_URL}/update`,
    method: "POST",
    auth: {
      username: info.email,
      password: ''
    },
    data: {
      client_name: info.user
    }
  })
  .then(response => response.data)
  .catch(error => null);
const getRelatedProducts = (info) =>
  axios({
    url: `${RECOMMENDER_BASE_URL}/relatedproducts/${info}`,
    method: "GET",
  })
  .then(response => response.data)
  .catch(error => error);
const submitData = (info, data) =>
  axios({
    url: `${RECOMMENDER_BASE_URL}/submitdata`,
    method: "POST",
    auth: {
      username: info.email,
      password: ''
    },
    data: {
      client_name: info.user,
      data: [data]
    }
  })
  .then(response => response.data)
  .catch(error => error);

const searchRecipe = (info) =>
  axios({
    url: `${RECIPE_BASE_URL}/search`,
    method: "GET",
    params: {
      q: info,
      app_id: `${RECIPE_APP_ID}`,
      app_key: `${RECIPE_API_KEY}`,
    }
  })
  .then(response => response.data)
  .catch(error => error);
const getRecipe = (info) =>
  axios({
    url: `${RECIPE_BASE_URL}/api/get`,
    method: "GET",
    params: {
      key: `${RECIPE_API_KEY}`,
      rId: info
    }
  })
  .then(response => response.data)
  .catch(error => error);
export default {
  getMicrositeData,
  getMicrositeUserInfo,
  facebookPosted,
  twitterPosted,
  getUserLocale,
  login,
  authenticatetoken,
  setUpRecommender,
  loginToRecommender,
  recommenderProducts,
  getRelatedProducts,
  searchRecipe,
  getRecipe,
  submitData
};