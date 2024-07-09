import httpInstance from "./httpInstance";

export const signIn = async (values) => {
   return await httpInstance.post('auth/login/', values)
}

export const signUp = async (values) => {
   return await httpInstance.post('auth/register/', values)
}

export const signOut = async (values) => {
   return await httpInstance.post('auth/logout/')
}