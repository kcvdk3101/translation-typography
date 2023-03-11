export const getGoogleFonts = async () => {
  return await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  ).then((res) => {
    return res.json();
  });
};
