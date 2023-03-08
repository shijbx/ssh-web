const devBaseUrl = "http://localhost:8080";
const releaseUrl = location.host.includes("happibus.com") ? "/busline" : "http://18.222.222.223:8020";
const baseURL = process.env.NODE_ENV === "development" ? devBaseUrl : releaseUrl;

export default baseURL;
