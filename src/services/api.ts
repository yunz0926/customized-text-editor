import axios from "axios";

export const getMetaData = async (url: string) => {
  try {
    const res = await axios.post(`https://api.devign.ai/sections/url`, { url });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
