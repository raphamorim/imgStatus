/*!
   --------------------------------
   imgStatus.js
   --------------------------------
   + https://github.com/raphamorim/imgstatus
   + version 0.1.2
   + Copyright 2015 Raphael Amorim
   + Licensed under the MIT license
   + Documentation: https://github.com/raphamorim/imgstatus
*/

;(function() {
    this.loaded = 0;
    this.failed = 0;
    this.total = 0;
    this.watch = function(selector, fn) {
        var images = document.querySelectorAll(selector);
        if (!images.length)
            return console.log('[imgStatus]: There aren\'t any images associated with this selector (' + selector + ')!');

        this.total = images.length;
        for (var i = 0; i < this.total; i++) {
            if (isCached(images[i].src))
                this._setLoaded(fn);
            else if (images[i].addEventListener) {
                images[i].addEventListener('load', this._setLoaded.bind(this, fn));
                images[i].addEventListener('error', this._setFailed.bind(this, fn));
            }
            else {
                images[i].attachEvent('onload', this._setLoaded.bind(this, fn));
                images[i].attachEvent('onerror', this._setFailed.bind(this, fn));
            }
        }
    }

    this.isCached = function(src) {
        var image = new Image();
        image.src = src;
        return image.complete;
    }

    this._setFailed = function(fn, e) {
        ++this.failed;
        if (typeof fn === "function")
            fn(this);
    }

    this._setLoaded = function(fn, e) {
        ++this.loaded;
        if (typeof fn === "function")
            fn(this);
    };

    this.isDone = function() {
        return ((this.loaded + this.failed) === this.total)? true:false;
    }

    if (typeof window === "object")
        window.imgStatus = this;
}());