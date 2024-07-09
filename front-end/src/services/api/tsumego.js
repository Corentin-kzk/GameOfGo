import httpInstance from "./httpInstance";

export const getTsumego = async () => {
   return await httpInstance.get('tsumego/')
}

export const getTsumegoById = async (id) => {
   return await httpInstance.get(`tsumego/${id}/`)
}
