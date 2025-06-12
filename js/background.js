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
