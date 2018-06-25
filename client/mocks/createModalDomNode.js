export default () => {
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'app');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);
};
