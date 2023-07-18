import { provider } from "../App";

async function getSignedUrl() {
  try {
    const res = await provider.custom({
      url: `${process.env.REACT_APP_API_URL}/api/s3/getUrl`,
      method: "get",
    });
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
}

function cleanUrl(url: string) {
  return url.split("?")[0];
}

export {
    getSignedUrl,
    cleanUrl
}
