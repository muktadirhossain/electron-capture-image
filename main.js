const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const path = require("path");


let thirdWindow;
// Create Menu Here ::
const template = [
  {
    label: "Menu",
    submenu: [
      {
        label: "See Documentation",
        click: async () =>
          await shell.openExternal(
            "https://www.electronjs.org/docs/latest/api/app"
          ),
      },
      {
        type: "separator",
      },
      {
        label: "Visit Website",
      },
      {
        type: "separator",
      },
      {
        label: "Visit Website",
      },
    ],
  },
  {
    label: "About",
  },
  {
    label: "Contact",
  },
  {
    label: "Help",
    submenu: [
      {
        label: "See Documentation",
      },
      {
        type: "separator",
      },
      {
        label: "Visit Website",
      },
    ],
  },
  ,
  {
    label: "Exit",
    click: () => app.quit(),
  },
  {
    label: "window",
    submenu: [
      {
        role: "close",
      },
      {
        role: "Minimize",
      },
      {
        label: "New Window",
        click: async () => {
          const secondWindow = new BrowserWindow({
            height: 500,
            width: 500,
          });
          secondWindow.loadFile("./windows/window1.html");
        },
      },
      {
        label: "New Browser Window",
        click: async () => {
          const secondWindow = new BrowserWindow({
            height: 500,
            width: 500,
            show: false,
            // fullscreen:true
          });
          secondWindow.loadURL(
            "https://www.electronjs.org/docs/latest/api/menu"
          );
          secondWindow.once("ready-to-show", () => secondWindow.show());
        },
      },
      {
        label: "Open Camera",
        click: async () => {
          thirdWindow = new BrowserWindow({
            height: 800,
            width: 600,
            webPreferences: {
              nodeIntegration: true,
              preload: path.join(__dirname, "/windows/cameraPreload.js"),
            },
          });
          thirdWindow.webContents.openDevTools();
          thirdWindow.loadFile("./windows/camera.html");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// let win;
const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 900,
    title: "Tip Calculator - Electron JS",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Event Listener ::
  ipcMain.on("set-image", (event, data) => {
    win.webContents.send("update-image", data);
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
};

// Event Listener :: For Close Camera Window
ipcMain.on("close-camera-window", () => {
  thirdWindow.close();
});

app.whenReady().then(createWindow);
