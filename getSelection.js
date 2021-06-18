function getSelection() {
    return window.getSelection().toString();
}
chrome.runtime.sendMessage({
    action: "getSelection",
    source: getSelection()
});