import backend from "../api/api";

const facebookPosted = async (id) => {
  const posted = await backend.facebookPosted(id);
  return posted;
};
const twitterPosted = async (id) => {
  const posted = await backend.twitterPosted(id);
  return posted;
};

export default {
    facebookPosted,
    twitterPosted
};
