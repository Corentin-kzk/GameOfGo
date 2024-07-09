import httpInstance from "./httpInstance";

export const signIn = async (values) => {
   return await httpInstance.post('auth/login/', values)
}