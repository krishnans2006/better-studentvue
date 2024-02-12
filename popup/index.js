const settingsToggles = {
    "enabled": "global-toggle",
    "debug": "debug-toggle",
}
const settingsTogglesDefaults = {
    "enabled": true,
    "debug": false,
}

const settingsActions = {
    "reset": () => {
        chrome.storage.sync.clear().then(() => {
            initializeSettings(true);
        });
    },
    "regenerate": () => {
        chrome.storage.sync.clear().then(() => {
            initializeSettings(false);
        });
    },
}

let currentSettings = {};
const isObjectEmpty = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

const updateToggles = () => {
    for (const key in settingsToggles) {
        const inputName = settingsToggles[key];
        const input = document.querySelector(`#${inputName}`);
        input.checked = currentSettings[key];
    }
}

const initializeSettingsFromToggles = async () => {
    for (const key in settingsToggles) {
        const inputName = settingsToggles[key];
        const input = document.querySelector(`#${inputName}`);
        currentSettings[key] = input.checked;
    }
    await chrome.storage.sync.set({ settings: currentSettings });
}

const initializeSettingsFromDefaults = async () => {
    for (const key in settingsToggles) {
        currentSettings[key] = settingsTogglesDefaults[key];
    }
    await chrome.storage.sync.set({ settings: currentSettings });
}

const initializeSettings = async (toDefaults = true) => {
    currentSettings = await chrome.storage.sync.get("settings");

    if (currentSettings === undefined) {
        await chrome.storage.sync.set({ settings: {} });
        currentSettings = await chrome.storage.sync.get("settings");
    }
    if (isObjectEmpty(currentSettings)) {
        if (toDefaults) {
            await initializeSettingsFromDefaults();
        } else {
            await initializeSettingsFromToggles();
        }
    } else {
        currentSettings = currentSettings.settings;
    }

    updateToggles();
}

const createListeners = () => {
    for (const key in settingsToggles) {
        const inputName = settingsToggles[key];
        const input = document.querySelector(`#${inputName}`);
        input.addEventListener("change", () => {
            currentSettings[key] = input.checked;
            chrome.storage.sync.set({ settings: currentSettings });
        });
    }
}

await initializeSettings();
createListeners();

for (const key in settingsActions) {
    const button = document.querySelector(`#${key}-button`);
    button.addEventListener("click", settingsActions[key]);
}

let storageDisplayTimer;

function updateStorageDisplay() {
    const displayElement = document.querySelector("#storage-display-container");

    chrome.storage.sync.get("settings").then((data) => {
        const debugMode = data.settings.debug;
        if (debugMode) {
            displayElement.innerHTML = `<h4>Storage</h4>${JSON.stringify(data, null, 4)}<br /></br />`;
        } else {
            displayElement.innerHTML = "";
        }
    });

    storageDisplayTimer = setTimeout(updateStorageDisplay, 200);
}

storageDisplayTimer = setTimeout(updateStorageDisplay, 200);
