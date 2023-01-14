const tokenKey = 'token'

const Set = (value: string) => {
  localStorage.setItem(tokenKey, value)
}

const Get = () => {
  return localStorage.getItem(tokenKey)
}

const Remove = () => {
  localStorage.removeItem(tokenKey)
}

export const Token = {
  Set,
  Get,
  Remove
}
