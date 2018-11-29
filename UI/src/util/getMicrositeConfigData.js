import backend from "../api/api";

const getMicrositeConfigData = async () => {
  const config = await backend.getMicrositeData();
  return config;
};

export default getMicrositeConfigData;
