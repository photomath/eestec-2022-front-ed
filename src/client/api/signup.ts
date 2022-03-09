import { SignupRequest, User } from "../../shared/types";
import { MOCK_USER } from "./mocks";

export const signup = async (_signupRequest: SignupRequest): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER)
    }, 1000)
  })
}
