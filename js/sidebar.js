/* ----------------
-- sidebar init --
---------------- */

let windowId = null;

browser.windows.getCurrent().then(window => 
{
    windowId = window.id;
    browser.runtime.sendMessage({ "window_id" : -1, "type" : "populate_sidebar", "sidebar_window_id" : windowId });
});

/* -------------------
-- receive requests --
------------------- */

browser.runtime.onMessage.addListener(sidebarReq)
function sidebarReq(request)
{
	if (request.window_id != windowId)
		return;

    console.log(request)

	// switch(request.type)
	// {
    //     case "create_tab" :
    //         createTab(request.tab_info, getTab(request.parent_tab_id));
	// 	    break;

    //     case "remove_tab" :
    //         getTab(request.tab_id).remove();
    //         break;

    //     case "update_tab" :
    //         getTab(request.tab_id).update(request.update_info);
    //         break;
    // }
}