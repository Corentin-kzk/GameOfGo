import httpInstance from "./httpInstance";

export const getTsumego = async () => {
   return await httpInstance.get('tsumego/')
}