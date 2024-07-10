import httpInstance from "./httpInstance";

export const getTsumego = async page => {
  console.log(page);
  return await httpInstance.get(`tsumego/?page=${page}`);
};

export const getTsumegoById = async id => {
  return await httpInstance.get(`tsumego/${id}/`);
};

export const postTsumegoResutl = async values => {
  return await httpInstance.post(`tsumego/games/`, values);
};
