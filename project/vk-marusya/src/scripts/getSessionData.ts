const getSessionData = () => {
  const data = sessionStorage.getItem('authUserData');
  if (data) {
    const parseData = JSON.parse(decodeURIComponent(data));
    return parseData;
  }
};

export default getSessionData;
