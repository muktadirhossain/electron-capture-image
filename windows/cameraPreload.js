const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
    setImage: (data) => ipcRenderer.send("set-image", data),
  });
