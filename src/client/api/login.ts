import { LoginRequest, User } from "../../shared/types";
import { MOCK_USER } from "./mocks";

export const login = async (_loginRequest: LoginRequest): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER)
    }, 1000)
  })
}

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export const me = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER)
    }, 1000)
  })
}
