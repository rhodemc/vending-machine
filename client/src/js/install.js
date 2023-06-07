const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // store the triggered event
    window.deferredPrompt = event;
    // remove the hidden class from the install button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // check if the deferred prompt event has been stored
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }

    // Show the install prompt.
    promptEvent.prompt();

    // Reset the deferred prompt variable, since
    window.deferredPrompt = null;

    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt on install
    window.deferredPrompt = null;
});
