let endTime = null;
let timer = null;

const blockRules = [
  {
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||youtube.com",
      resourceTypes: ["main_frame"]
    }
  },
  {
    id: 2,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||instagram.com",
      resourceTypes: ["main_frame"]
    }
  }
];




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_TIMER') {
    const duration = message.payload; // seconds
    endTime = Date.now() + duration * 1000;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      chrome.storage.local.set({ timerRunning: false });
    }, duration * 1000);

    chrome.storage.local.set({ timerRunning: true, endTime });
    sendResponse({ status: 'started' });
  }

  if (message.type === 'GET_TIME') {
    if (!endTime) return sendResponse({ remaining: 0 });
    const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    sendResponse({ remaining });
  }

  if (message.type === 'STOP_TIMER') {
    clearTimeout(timer);
    endTime = null;
    chrome.storage.local.set({ timerRunning: false });
    sendResponse({ status: 'stopped' });
  }

  return true;
});
