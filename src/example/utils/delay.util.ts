export const delay = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(null);
      } catch (e) {
        reject(e);
      }
    }, ms);
  });
};
