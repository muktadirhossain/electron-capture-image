// All the Node.js APIs are available in the preload process.



window.addEventListener("DOMContentLoaded", () => {
//   contextBridge.exposeInMainWorld("electronAPI", {
//     setTitle: (title) => ipcRenderer.send("set-title", title),
//   });
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    updateImage: (callback) => ipcRenderer.on("update-image", callback),
    closeCameraWindow:()=> ipcRenderer.send("close-camera-window"),
  });
