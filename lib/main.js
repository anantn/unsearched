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
    let value = "";
    for (let i = 0; i < searched.length; i++) {
        if (tab === searched[i])
            value = values[i];
    }
    setValue(value);
});
tabs.on('deactivate', function(tab) {
    if (!getValue()) return;

    // Not sure why I can't have tab be a key, so I use two arrays
    let i;
    for (i = 0; i < values.length; i++) {
        if (tab === tabs[i]) {
            break;
        }
    }
    searched[i] = tab;
    values[i] = getValue();
});

