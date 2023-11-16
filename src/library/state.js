let currentProfileData = null;

function getCurrentProfileData() {
  return currentProfileData;
}

function setCurrentProfileData(data) {
  currentProfileData = data;
}

export { getCurrentProfileData, setCurrentProfileData };
