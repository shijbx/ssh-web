const devBaseUrl = "http://localhost:9090";
const releaseUrl =  "http://114.116.115.16:9090";
const baseURL = process.env.NODE_ENV === "development" ? devBaseUrl : releaseUrl;

export default baseURL;
