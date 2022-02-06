const on = (eventType, listener) => {
  document.addEventListener(eventType, listener);
};

const off = (eventType, listener) => {
  document.removeEventListener(eventType, listener);
};

const trigger = (eventType, data) => {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
};

export { on, off, trigger };
