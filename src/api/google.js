import { getJSON } from "./api";

export const getGoogleFonts = async () => {
  const url = "https://www.googleapis.com/webfonts/v1/webfonts";
  const params = {
    key: process.env.REACT_APP_GOOGLE_API_KEY,
  };

  return await getJSON(url, params);
};

export const getGoogleTranslateLanguage = async (data) => {
  const { q, tl, sl } = data;

  const url = "https://translate.google.com/translate_a/single";
  const params = {
    client: "at",
    dt: "t",
    dt: "ld",
    dt: "qca",
    dt: "rm",
    dt: "bd",
    dj: "1",
    ie: "UTF-8",
    oe: "UTF-8",
    inputm: "2",
    otf: "2",
    iid: process.env.REACT_APP_GOOGLE_TRANSLATE_API_IDD,
    q,
    tl,
    sl,
  };

  return await getJSON(url, params);
  // const params =
  //   "dt=bd&dj=1&ie=UTF-8&oe=UTF-8&inputm=2&otf=2";
  // const response = await fetch(
  //   `https://translate.google.com/translate_a/single?${params}&iid=${process.env.REACT_APP_GOOLE_TRANSLATE_API_IDD}`
  // );
  // return response.json();
};
