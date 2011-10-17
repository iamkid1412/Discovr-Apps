/**
 *  AppDiscovr 1.0.0
 *@author Roger Huang
 */
 
/**
 *@class AppDiscovr
 *@param id: original app
 *@param apps: new apps discovered
 *@param supId: supper app's id
 *@param lineLength: the length of associated line
 *@param clicked: check if new apps have been discovered
 *@param ARC: a arc constant
 */
/*global $, AppDiscovr, window, Math: true */
var AppDiscovr = function (id, apps, supId) {
    this.id = id;
    this.node = $("#" + this.id);
    this.apps = apps;
    this.supId = supId;
    this.clicked = false;
    this.ARC = 2 * Math.PI / 360;
    this.MIN_LENGTH = 100;
    this.lineLength = this.apps.length * 20 < this.MIN_LENGTH ? this.MIN_LENGTH : this.apps.length * 20;
};
AppDiscovr.prototype = {
    getTop: function () {
        return window.parseInt(this.node.css("top"));
    },
    getLeft: function () {
        return window.parseInt(this.node.css("left"));
    },
    getOffsetTop: function () {
        return window.parseInt(this.node.offset().top);
    },
    getOffsetLeft: function () {
        return window.parseInt(this.node.offset().left);
    },
    getHeight: function () {
        return window.parseInt(this.node.css("height"));
    },
    getWidth: function () {
        return window.parseInt(this.node.css("width"));
    },
/* revise the line between original app and new apps */
    line: function (appId, lineId) {
        var app = $("#" + appId),
            selfTop = this.getTop(),
            selfLeft = this.getLeft(),
            appTop = window.parseInt(app.css("top")),
            appLeft = window.parseInt(app.css("left")),
            selfHeight = this.getHeight(),
            selfWidth = this.getWidth(),
            deg,
            lineDiv,
            lineWrap,
            lineLength,
            lineTop,
            lineLeft,
            appLineWrap;

        lineWrap = $("#" + this.id + "-lines");
        appLineWrap = $("#" + appId + "-lines");
        lineWrap.css({
            "top": selfTop,
            "left": selfLeft
        });
        appLineWrap.css({
            "top": appTop,
            "left": appLeft
        });
        lineDiv = $("#_" + lineId);
        deg = Math.atan(appTop / appLeft) / this.ARC;
        lineLength = Math.sqrt(Math.pow(appTop - 0.5 * selfHeight, 2) + Math.pow(appLeft - 0.5 * selfWidth, 2));
        lineTop = appTop / 2 + selfHeight / 2;
        lineLeft = appLeft / 2 - lineLength / 2 + selfWidth / 2;
        lineDiv.css({
            "position": "absolute",
            "top": lineTop,
            "left": lineLeft,
            "-webkit-transform": "rotate(" + deg + "deg)",
            "-moz-transform": "rotate(" + deg + "deg)",
            "-o-transform": "rotate(" + deg + "deg)",
            "width": lineLength,
            "border-top": "1px solid #fff"
        });
    },
/* initialize the lines' box */
    initLineDiv: function () {
        var appLen = this.apps.length,
            deg = 0,
            lineTop = 0,
            lineLeft = 0,
            lineLength = this.lineLength,
            lineDiv,
            lineWrap,
            i,
            selfTop = this.getTop(),
            selfLeft = this.getLeft(),
            selfHeight = this.getHeight(),
            selfWidth = this.getWidth();

        lineWrap = $("<div id='" + this.id + "-lines'></div>");
        lineWrap.css({
            "position": "absolute",
            "top": selfTop,
            "left": selfLeft
        });
        lineWrap.insertAfter(this.node);
        for (i = 0; i < appLen; i = i + 1) {
            lineDiv = $("<div id='_" + this.id + "-" + this.apps[i].id + "'></div>");
            lineWrap.append(lineDiv);
            deg = i * 360 / appLen;
            lineTop = 0.5 * selfHeight + 0.5 * lineLength * Math.sin(deg * this.ARC);
            lineLeft = 0.5 * selfWidth + 0.5 * lineLength * (Math.cos(deg * this.ARC) - 1);
            lineDiv.css({
                "position": "absolute",
                "top": lineTop,
                "left": lineLeft,
                "-webkit-transform": "rotate(" + deg + "deg)",
                "-moz-transform": "rotate(" + deg + "deg)",
                "-o-transform": "rotate(" + deg + "deg)",
                "width": lineLength,
                "border-top": "1px solid #fff"
            });
        }
    },
/* initialize the discovered apps */
    initDiscoveredApps: function () {
        var self = this,
            appLen = this.apps.length,
            app,
            deg = 0,
            bg = "",
            i,
            relationApp,
            appTop,
            appLeft,
            lineLength = this.lineLength;

        for (i = 0; i < appLen; i = i + 1) {
            app = this.apps[i];
            bg = app.bg;
            relationApp = $("<div id='" + app.id + "' title='" + app.title + "'></div>");
            relationApp.addClass("apps");
            deg = i * 360 / appLen;
            appTop = lineLength * Math.sin(deg * this.ARC);
            appLeft = lineLength * Math.cos(deg * this.ARC);
            relationApp.css({"background": bg});
            this.node.append(relationApp);
            relationApp.animate({"top": appTop, "left": appLeft}, 1000);
            relationApp.draggable({cursor: "move"});
            (function (appId, lineId) {
                relationApp.bind("drag", function () {
                    self.line(appId, lineId);
                });
            })(app.id, this.id + "-" + app.id);
        }
    },
/* discover new apps, will be used outside */
    discovr: function () {
        this.initLineDiv();
        this.initDiscoveredApps();
    },
/* bind click event */
    enable: function () {
        var self = this,
            selfNode = this.node,
            ad,
            i,
            lineLength = 0;

        selfNode.bind("click", function (event) {
            event.stopPropagation();
            if (!self.clicked) {
                self.discovr();
                self.clicked = true;
                if (self.supId) {
                    lineLength = self.lineLength + window.parseInt($("#_" + self.supId + "-" + self.id).css("width"));
                    self.extendLine(lineLength, self.supId + "-" + self.id);
                }
                for (i = 0; i < self.apps.length; i = i + 1) {
                    if (self.apps[i].apps) {
                        (function (app) {
                            ad = new AppDiscovr(app.id, app.apps, self.id);
                            ad.enable();
                        })(self.apps[i]);
                    }
                }
            }
        });
    },
/* extend the length of line */
    extendLine: function (length, lineId) {
        var top = this.getTop(),
            left = this.getLeft(),
            line = $("#_" + lineId),
            oriLength = window.parseInt(line.css("width")),
            newAppTop = top * length / oriLength,
            newAppLeft = left * length / oriLength;

        this.node.css({"top": newAppTop, "left": newAppLeft});
        this.line(this.id, lineId);
    }
};