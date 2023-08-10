export const generateID = () =>
  window.crypto.getRandomValues(new Uint32Array(1))[0];
