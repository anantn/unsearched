const {Cc, Ci} = require("chrome");
const tabs = require("tabs");

let values = [];
let searched = [];
let WM = Cc["@mozilla.org/appshell/window-mediator;1"].
    getService(Ci.nsIWindowMediator);

function getValue()
{
    let win = WM.getMostRecentWindow("navigator:browser");
    return win.document.getElementById("searchbar").value;
}
function setValue(val)
{
    let win = WM.getMostRecentWindow("navigator:browser");
    win.document.getElementById("searchbar").value = val;
}

tabs.on('activate', function(tab) {
    setValue(values[searched.indexOf(tab)] || '');
});
tabs.on('deactivate', function(tab) {
    let val = getValue();
    
    // tab can't be a key, since keys are strings, so use two arrays
    let i = searched.indexOf(tab);
    if (i < 0) i = searched.length;
    searched[i] = tab;
    values[i] = val;
});
