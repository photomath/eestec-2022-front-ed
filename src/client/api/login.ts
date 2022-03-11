import { LoginRequest, User } from "../../shared/types";
import { buildApiUrl } from "./utils";

export const login = async (loginRequest: LoginRequest): Promise<User> => {
  const response = await fetch(
    buildApiUrl('login'),
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest),
      credentials: 'include',
    },
  )

  const json = await response.json()

  if (response.status !== 200) {
    throw new Error(json.message)
  } else {
    return json as User
  }
}

export const logout = async (): Promise<void> => {
  await fetch(
    buildApiUrl('logout'),
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    },
  )
}

export const me = async (): Promise<User> => {
  const response = await fetch(
    buildApiUrl('me'),
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    },
  )

  const json = await response.json()

  if (response.status !== 200) {
    throw new Error(json.message)
  } else {
    return json as User
  }
}
