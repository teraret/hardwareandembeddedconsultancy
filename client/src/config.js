import pjson from "./../package.json";

export const SERVER_URL = "http://localhost:8080/";
export default SERVER_URL;
export const CLIENT_VERSION = pjson.version;
export const REACT_VERSION = pjson.dependencies.react;