export default errors => errors.reduce((acc, cv) => {
  if (cv.path in acc) {
    acc[cv.path].push(cv.message);
  }
  acc[cv.path] = [cv.message];
  return acc;
}, {});
