import { SignupRequest, User } from "../../shared/types";
import { buildApiUrl } from "./utils";

export const signup = async (signupRequest: SignupRequest): Promise<User> => {
  const response = await fetch(
    buildApiUrl('signup'),
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupRequest),
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
