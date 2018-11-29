import backend from "../api/api";
import general_en from "../text/general_en.json";
import general_fr from "../text/general_fr.json";
import login_en from "../text/login_en.json";
import login_fr from "../text/login_fr.json";
import FAQ_en from "../text/FAQ_en.json";
import activity_road_map_en from "../text/activity_road_map_en.json";

const getTranslatedText = async (lang = null) => {
  const en = { ...general_en, LOGIN: { ...login_en }, FAQ: {...FAQ_en}, activity_road_map: {...activity_road_map_en}};
  const fr = { ...general_fr, LOGIN: { ...login_fr }, FAQ: {...FAQ_en}, activity_road_map: {...activity_road_map_en}};
  if (lang === null) {
    lang = await backend.getUserLocale();
  }

  switch (lang) {
    case "en":
      return { lang: "en", text: en };
    case "fr":
      return { lang: "fr", text: fr };
    default:
      return { lang: "en", text: en };
  }
};
export default getTranslatedText;
