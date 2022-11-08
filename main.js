var open = window.XMLHttpRequest.prototype.open,
send = window.XMLHttpRequest.prototype.send;

function openReplacement(method, url, async, user, password) {
this._url = url;
return open.apply(this, arguments);
}

function sendReplacement(data) {
if (this.onreadystatechange) {

    this._onreadystatechange = this.onreadystatechange;
}
this.onreadystatechange = onReadyStateChangeReplacement;
return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {

// CAPTURE HERE.
if (this.status != 200) {

    console.log('AppMon'+this.responseURL + " " + this.responseText + " " + this.statusText);
}

if (this._onreadystatechange) {

    return this._onreadystatechange.apply(this, arguments);
}
}
window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;
