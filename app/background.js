
import path from 'path';
import { app, screen, Menu, Tray } from 'electron';
import createWindow from './helpers/window';

import Config from 'electron-config';

// Special module holding environment variables which you declared in config/env_xxx.json file.
import env from './env';

import {OVERLAYS, OVERLAY_INITIALIZE_EVENT, OVERLAY_CHANGED_EVENT} from './overlays/overlays';


const config = new Config();
const CURRENT_OVERLAY_KEY = 'CurrentOverlay';

let mainWindow;
let tray;

// Load the last overlay, if available. Otherwise load the first one (should be "None").
let currentOverlayName = config.get(CURRENT_OVERLAY_KEY) || OVERLAYS[0].name;

// Ensure there are no extra instaces running...
checkOtherInstances();

app.on('ready', function () {
    Menu.setApplicationMenu(null);

    mainWindow = createWindow('main', {
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        minimizable: false,
        focusable: false,
        movable: false,
        skipTaskbar: true
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
        { label: 'Close', click: () => mainWindow.close() }
    ]);

    tray = new Tray(path.join(__dirname, '/icon.png'));
    tray.setToolTip('JK Overlay');
    tray.setContextMenu(contextMenu);

    mainWindow.once('ready-to-show', () => {
        var {width, height} = screen.getPrimaryDisplay().size;
        mainWindow.setIgnoreMouseEvents(true);
        mainWindow.setBounds({ x: 0, y: 0, width, height }, false);
        mainWindow.show();
        mainWindow.setSkipTaskbar(true);
        triggerInitialize();
        triggerOverlay();
    });

    mainWindow.loadURL('file://' + __dirname + '/app.html');
});

app.on('window-all-closed', function () {
    app.quit();
});

//on OSx a dock icon is shown, since this is a tray application, hide the dock icon.
if (app.dock) {
    app.dock.hide();
}

function checkOtherInstances() {
    const alreadyRunning = app.makeSingleInstance(() => {
        // Do nothing if multiple instances are up...
    });

    if (alreadyRunning) {
        app.quit();
        return;
    }
}

function overlayChanged({label}, window, event) {

    // Stop here if it is already selected...
    if (label === currentOverlayName) return;

    // Store it for later checks...    
    currentOverlayName = label;

    // Persist it for later...
    config.set(CURRENT_OVERLAY_KEY, currentOverlayName);

    // Send the new overlay setting to the render process...
    triggerOverlay();
}

function triggerInitialize() {
    mainWindow.webContents.send(OVERLAY_INITIALIZE_EVENT);
}

function triggerOverlay() {
    mainWindow.webContents.send(OVERLAY_CHANGED_EVENT, currentOverlayName);
}