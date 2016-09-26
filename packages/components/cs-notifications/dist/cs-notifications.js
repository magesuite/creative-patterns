(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jQuery')) :
    typeof define === 'function' && define.amd ? define('csNotifications', ['jQuery'], factory) :
    (factory(global.jQuery));
}(this, (function ($$1) { 'use strict';

$$1 = 'default' in $$1 ? $$1['default'] : $$1;

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var NotificationsManager = (function () {
    function NotificationsManager(settings) {
        this._defaults = {
            callback: {
                notificationAdded: null,
                notificationRemoved: null,
                notificationClosed: null,
            },
            $componentSelector: null,
            $closeComponentSelector: null,
        };
        this._settings = null;
        this._notificationsList = [];
        this._settings = $$1.extend(this._defaults, settings, true);
    }
    NotificationsManager.prototype.init = function () {
        this._bindEvents();
    };
    NotificationsManager.prototype.addNotification = function (notification) {
        this._notificationsList.push(notification);
        this._printNotification(notification.getTemplate());
    };
    NotificationsManager.prototype.removeNotification = function (notification) {
        notification.remove();
        var arrayPos = this._notificationsList.indexOf(notification);
        this._notificationsList.splice(arrayPos, 1);
        if (this._settings.callback.notificationRemoved) {
            this._settings.callback.notificationRemoved();
        }
    };
    NotificationsManager.prototype.getNotifications = function () {
        return this._notificationsList;
    };
    NotificationsManager.prototype._printNotification = function (template) {
        this._settings.$componentSelector.append(template);
        if (this._settings.callback.notificationAdded) {
            this._settings.callback.notificationAdded();
        }
    };
    NotificationsManager.prototype._close = function () {
        if (this._settings.callback.notificationClosed) {
            this._settings.callback.notificationClosed();
        }
        if (this._settings.deleteOnClose) {
            for (var _i = 0, _a = this._notificationsList; _i < _a.length; _i++) {
                var notification = _a[_i];
                notification.remove();
            }
        }
    };
    NotificationsManager.prototype._bindEvents = function () {
        var _this = this;
        if (this._settings.$closeComponentSelector) {
            this._settings.$closeComponentSelector.on('click', function (e) {
                e.preventDefault();
                _this._close();
            });
        }
    };
    return NotificationsManager;
}());

var Notification = (function () {
    function Notification(message, settings) {
        this.message = null;
        this._type = {
            name: 'default',
            iconHTML: null,
            textClass: null,
        };
        this._defaults = {
            notificationHTML: null,
            textSelector: null,
            iconSelector: null,
            onClose: null,
            onAdd: null,
        };
        this._settings = null;
        this._$template = null;
        // If once set hidden by adding class name, will store it and reuse it
        this._hiddenClassName = null;
        this._settings = $$1.extend(this._defaults, settings);
        this.message = message;
    }
    Notification.prototype.getMessage = function () {
        return this.message;
    };
    Notification.prototype.getType = function () {
        return this._type.name;
    };
    Notification.prototype.remove = function () {
        this._$template.remove();
    };
    Notification.prototype.setType = function (type) {
        this._type = type;
    };
    Notification.prototype.hide = function (className) {
        if (className) {
            this._$template.addClass(className);
            this._hiddenClassName = className;
        }
        else if (this._hiddenClassName) {
            this._$template.addClass(this._hiddenClassName);
        }
        else {
            this._$template.hide();
        }
    };
    Notification.prototype.show = function () {
        if (this._$template.hasClass(this._hiddenClassName)) {
            this._$template.removeClass(this._hiddenClassName);
        }
        else {
            this._$template.show();
        }
    };
    Notification.prototype.getTemplate = function () {
        if (!this._$template) {
            this._$template = this._compileTemplate();
        }
        return this._$template;
    };
    Notification.prototype._compileTemplate = function () {
        var $html = $$1(this._settings.notificationHTML).clone();
        var $text = $html.find(this._settings.textSelector);
        var $iconPlaceholder = null;
        $text.text(this.message);
        $text.addClass(this._type.textClass);
        if (this._settings.iconSelector) {
            $iconPlaceholder = $html.find(this._settings.iconSelector);
            $iconPlaceholder.after(this._type.iconHTML);
            $iconPlaceholder.remove();
        }
        this._$template = $html;
        return $html;
    };
    return Notification;
}());

var nmSettings = {
    $componentSelector: $('.cs-notifications'),
    $closeComponentSelector: $('.cs-notifications__close'),
    callback: {
        notificationClosed: function () {
            $('.cs-notifications').hide();
        },
    },
    deleteOnClose: true,
};
var notificationsManager = new NotificationsManager(nmSettings);
notificationsManager.init();
var notificationConfig = {
    notificationHTML: '<li class="cs-notifications__item"><div class="cs-notifications__item-icon"></div><span class="cs-notifications__item-text"></span></li>',
    textSelector: '.cs-notifications__item-text',
    iconSelector: '.cs-notifications__item-icon',
};
var negativeType = {
    name: 'negative',
    textClass: 'cs-notifications__item-text--negative',
};
var NegativeNotification = (function (_super) {
    __extends(NegativeNotification, _super);
    function NegativeNotification(message, settings) {
        _super.call(this, message, settings);
        this._type = negativeType;
    }
    return NegativeNotification;
}(Notification));
var not1 = new Notification('notification message default style', notificationConfig);
var not2 = new NegativeNotification('negative message via extended notification class with another "Type"', notificationConfig);
window.n = not1;
notificationsManager.addNotification(not1);
notificationsManager.addNotification(not2);
$('#newNot').click(function () {
    notificationsManager.addNotification(new Notification('new notification added', notificationConfig));
});

})));
//# sourceMappingURL=cs-notifications.js.map
