import { baseUrl } from "../api";
import { LoginPayload, registerPayload } from "../types/auth";
import { ACCESS_TOKEN_KEY, USER_KEY } from "./constants";


export async function login(payload: LoginPayload) {

    try {
      const { email, password } = payload;
        // Send login request to the backend
        const res = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();

        if (!res.ok) {
         return Promise.reject(data)
        }
  
        // Save the token to localStorage or sessionStorage
        localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  
        return Promise.resolve(data)
  
      } catch (err) {
        return Promise.reject(err)
      }
}

export async function register(payload: registerPayload) {
  try {
    const { name, email, password, role } = payload;
    // Send register request to the backend
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      return Promise.reject(data);
    }

    try {
      await login({ email, password });

    } catch (err) {
      console.log("unable to login user after registration see error", err);
    }

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}


export function isLoggedIn(){
  // const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const storedToken = typeof window !== "undefined" ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : false
  console.log(storedToken)
  return !!storedToken;
} 

export function logOut(){
  localStorage.removeItem(ACCESS_TOKEN_KEY);
} 

export function currentUser (){
  const currentUserString = localStorage.getItem(USER_KEY);
  if(currentUserString){
    return JSON.parse(currentUserString);
  }
  return null;
}


export function currentToken (){
 return localStorage.getItem(ACCESS_TOKEN_KEY);
}