import { Base64 } from "js-base64";
const token = sessionStorage.getItem("token");
const token_stored = token ? JSON.parse(Base64.decode(token)) : null;

export default token_stored;
