import backend from "../api/api";

const getMicrositeUserInfo = async (link_id) => {
  const userinfo = await backend.getMicrositeUserInfo({link_id: link_id});
  return userinfo;
};

export default getMicrositeUserInfo;
