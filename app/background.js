
import { app, screen, Menu, Tray } from 'electron';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared in config/env_xxx.json file.
import env from './env';

import {OVERLAYS, OVERLAY_CHANGED_EVENT} from './overlays/overlays';

let mainWindow;
let tray;

let currentOverlayName = 'Bugs';

app.on('ready', function () {
    Menu.setApplicationMenu(null);

    mainWindow = createWindow('main', {
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        minimizable: false,
        focusable: false,
        movable: false
    });

    var overlayOptions = OVERLAYS.map(overlay => {
        return {
            label: overlay.name,
            type: 'radio',
            checked: overlay.name === currentOverlayName,
            click: overlayChanged
        }
    });

    var contextMenu = Menu.buildFromTemplate([
        { label: 'JK Overlay' },
        { role: 'separator' },
        { label: 'Overlays', submenu: overlayOptions },
        { label: 'Close', role: 'close', click: () => mainWindow.close() }
    ]);

    tray = new Tray(__dirname + '/icon.ico');
    tray.setToolTip('JK Overlay');
    tray.setContextMenu(contextMenu);

    var {width, height} = screen.getPrimaryDisplay().workAreaSize;

    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.setBounds({ x: 0, y: 0, width, height }, false);

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        triggerOverlay();
    });

    mainWindow.loadURL('file://' + __dirname + '/app.html');
});

app.on('window-all-closed', function () {
    app.quit();
});

function overlayChanged({label}, window, event) {

    // Stop here if it is already selected...
    if (label === currentOverlayName) return;

    // Store it for later checks...    
    currentOverlayName = label;

    // Send the new overlay setting to the render process...
    triggerOverlay();
}

function triggerOverlay() {
    mainWindow.webContents.send(OVERLAY_CHANGED_EVENT, currentOverlayName);
}