import isMobile from "ismobilejs";
const userAgent = navigator.userAgent;

export default isMobile(userAgent);
