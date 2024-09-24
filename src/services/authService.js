import { jwtDecode } from "jwt-decode";

export function getIdfromToken() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decode = jwtDecode(token);
      return decode.id;
    } catch (error) {
      console.log("Invalid token", error);
      return null;
    }
  } else {
    console.log("Token not found");
    return null;
  }
}
