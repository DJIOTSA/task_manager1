import { baseUrl } from "../api";
import { registerPayload } from "../types/register";
import { login } from "./auth";

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
      // login the user after registration
      await login({ email, password });

    } catch (err) {
      console.log("unable to login user after registration see error", err);
    }

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
