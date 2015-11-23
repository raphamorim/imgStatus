/*!
   --------------------------------
   imgStatus.js
   --------------------------------
   + https://github.com/raphamorim/imgstatus
   + version 0.1.1
   + Copyright 2015 Raphael Amorim
   + Licensed under the MIT license
   + Documentation: https://github.com/raphamorim/imgstatus
*/

;(function(obj) {
   obj = {};

    obj.loaded = 0;
    obj.failed = 0;
    obj.total = 0;

    obj.watch = function(imgClasses, fn) {
        var images = document.querySelectorAll(imgClasses);
        if (!images.length)
            return console.log('[imgStatus]: Doesn\'t exists any images with this class!');

        this.total = images.length;
        for (var i = 0; i < images.length; i++) {
            if (isCached(images[i].src))
                this.ready(fn);
            else if (images[i].addEventListener) {
                images[i].addEventListener('load', this.ready.bind(this, fn));
                images[i].addEventListener('error', this.fail.bind(this, fn));
            }
            else {
                images[i].attachEvent('onload', this.ready.bind(this, fn));
                images[i].attachEvent('onerror', this.fail.bind(this, fn));
            }
        }
    }

    obj.isCached = function(src) {
        var image = new Image();
        image.src = src;
        return image.complete;
    }

    obj.fail = function(fn, e) {
        ++this.failed;
        if (typeof fn === "function")
            fn(this);
    }

    obj.ready = function(fn, e) {
        ++this.loaded;
        if (typeof fn === "function")
            fn(this);
    };

    obj.isDone = function() {
        return ((this.loaded + this.failed) === this.total)? true:false;
    }
}(imgStatus));
