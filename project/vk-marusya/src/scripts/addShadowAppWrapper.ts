const addShadowAppWrapper = (visible: boolean):void => {
  const body = document.querySelector('body');
  const appWrapper = document.querySelector('.app-wrapper');

  if(body && appWrapper) {
    if (visible) {
      appWrapper.classList.add('app-wrapper--shadow');
      body.style.overflow = 'hidden';
    } else {
      appWrapper.classList.remove('app-wrapper--shadow');
      body.style.overflow = 'visible';
    }
  }
};

export default addShadowAppWrapper;
