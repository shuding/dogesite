/**
 * Created by shuding on 10/30/14.
 * <ds303077135@gmail.com>
 */

(function(doc, win){

    var DOGE_COUNT = 20;

    var doge = function () {
        // default size: medium
        this.size = "medium";
        // default direction
        this.direction = 0;
        // default shine boolean
        this.shine = false;
        // default positions
        this.pos = [0, 0];
        // init the DOM element
        this.element = doc.createElement("div");;

        /**
         * Set the doge image size
         * @method  setSize
         * @param   sizeStr (required) "big", "medium" or "small"
         * @return  self
         */
        this.setSize = function (sizeStr) {
            var sizesArray = ["big", "medium", "small"];
            if (sizesArray.indexOf(sizeStr) > -1)
                this.size = sizeStr;
            return this;
        };

        /**
         * Set the doge face direction
         * @method  setDir
         * @param   dir (required) 0 for left or 1 for right
         * @return  self
         */
        this.setDir = function (dir) {
            if ("01".indexOf(parseInt(dir)))
                // There is no integer could be `01`, haha
                this.direction = parseInt(dir);
            return this;
        };

        /**
         * Set the position of doge in screen
         * @method  setPos
         * @param   x (required)
         * @param   y (required)
         * @return  self
         */
        this.setPos = function (x, y) {
            this.pos = [parseInt(x), parseInt(y)];
            this.element.style["left"] = this.pos[0] + "px";
            this.element.style["top"] = this.pos[1] + "px";
            return this;
        };

        /**
         * Set the duration of doge aniamtion
         * @method  setTransitionDuration
         * @param   t (required) seconds
         * @return  self
         */
        this.setTransitionDuration = function (t) {
            var browserPrefixs = [
                "-webkit-",
                "-moz-",
                "-ms-",
                "-o-",
                ""
            ];
            for (var i = 0; i < browserPrefixs.length; ++i)
                this.element.style[browserPrefixs[i] + "transition"] = "top " + t + "ms ease-out, left " + t + "ms ease-out";
            return this;
        };

        /**
         * Start random walk
         * @method  startRandomWalk
         * @param   this
         * @param   delay the transition timer delay
         * @return  self
         */
        this.startRandomWalk = function (self) {
            if (self === null)
                self = this;
            var pos = [
                [-250, Math.floor(win.innerHeight * Math.random())],
                [win.innerWidth, Math.floor(win.innerHeight * Math.random())],
                [Math.floor(win.innerWidth * Math.random()), -250],
                [Math.floor(win.innerWidth * Math.random()), win.innerHeight]
            ][Math.floor(4 * Math.random())];
            var d = Math.sqrt(Math.pow(self.pos[0] - pos[0], 2) + Math.pow(self.pos[1] - pos[1], 2));
            var t = Math.floor(400 + Math.random() * 4000);
            self.setTransitionDuration(t);
            self.setPos(pos[0], pos[1]);
            if (d > t * .5)
                self.element.className += " doge-reverse";
            else
                self.element.className = self.element.className.replace("doge-reverse", "");
            setTimeout(self.startRandomWalk, t, self);
            return this;
        };

        /**
         * Start shining
         * @method  startShine
         * @param   None
         * @return  self
         */
        this.startShine = function () {
            this.shine = true;
            this.element.className += " doge-shine-true";
            this.element.style["-webkit-animation-delay"] = Math.floor(Math.random() * 1000) + "ms";
            return this;
        };

        /**
         * Append the doge element to DOM
         * @method  appendTo
         * @param   el (required) the parent DOM element
         * @return  self
         */
        this.appendTo = function (el) {
            this.element.className = "doge doge-" + this.size + " doge-dir-" + this.direction + " doge-shine-" + this.shine;
            el.appendChild(this.element);
            return this;
        };

    };

    for (var i = 0; i < DOGE_COUNT; ++i) {
        var new_doge = new doge();
        new_doge.setSize(["big", "medium", "small"][Math.floor(Math.random() * 3)])
                .setDir([0, 1][Math.floor(Math.random() * 2)])
                .startRandomWalk(null)
                .startShine()
                .appendTo(doc.body);
    }

})(document, window);