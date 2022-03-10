export const validatePassword = (password: string) => {
  if (password.length < 3) {
    return 'Password is too short!'
  }
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match!'
  }
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const validateEmail = (email: string) => {
  if (!EMAIL_REGEX.test(email)) {
    return 'Email is not valid!'
  }
}

