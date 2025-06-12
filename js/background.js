browser.runtime.onMessage.addListener(function(request)
{
	if (request.window_id != -1)
		return;

    switch(request.type)
    {
        case "populate_sidebar" : 
            browser.tabs.query({ windowId : request.sidebar_window_id }).then(ffTabs => 
            {
                ffTabs.forEach(ffTab => createTab(ffTab, undefined));
            });
            break;
	}	
});

/* ---------------
-- ff listeners --
--------------- */

browser.tabs.onCreated.addListener(ffTab => 
{ 
    createTab(ffTab, ffTab.openerTabId);
});

browser.tabs.onRemoved.addListener((tabId, closeInfo) =>
{ 
    if (closeInfo.isWindowClosing) 
        return;

    removeTab(closeInfo.windowId, tabId);
});

browser.tabs.onDetached.addListener((tabId, detachInfo) => 
{
    removeTab(detachInfo.oldWindowId, tabId);
});

browser.tabs.onActivated.addListener(activeInfo => 
{
    updateTab(activeInfo.windowId, activeInfo.tabId, { "active" : true });

    if (activeInfo.previousTabId) 
        updateTab(activeInfo.windowId, activeInfo.previousTabId, { "active" : false });
});

browser.tabs.onUpdated.addListener((tabId, updateInfo, ffTab) => 
{
    updateTab(ffTab.windowId, tabId, updateInfo);
});

/* ------------------
-- message senders --
------------------ */

function createTab(ffTab, parentTabId)
{
    browser.runtime.sendMessage(
    { 
        "window_id": ffTab.windowId, 
        "type" : "create_tab",
        "parent_tab_id" : parentTabId,
        "tab_info" : ffTab
    });
}

function removeTab(windowId, tabId)
{
    browser.runtime.sendMessage(
    { 
        "window_id": windowId, 
        "type" : "remove_tab",
        "tab_id" : tabId
    });
}

function updateTab(windowId, tabId, updateInfo)
{
    browser.runtime.sendMessage(
    { 
        "window_id" : windowId,
        "type" : "update_tab",
        "tab_id" : tabId,
        "update_info" : updateInfo
    });
}


// on toolbar button clicked
// todo. only refresh sidebar panel if opening sidebar
browser.action.onClicked.addListener(openSidebar);
function openSidebar(currentTab) 
{
	var currentWindow = currentTab.windowId;
    browser.sidebarAction.toggle();
	browser.sidebarAction.setPanel({ panel: (browser.runtime.getURL("/about:blank")), windowId: currentWindow });
	browser.sidebarAction.setPanel({ panel: (browser.runtime.getURL("/html/sidebar.html")), windowId: currentWindow });
}