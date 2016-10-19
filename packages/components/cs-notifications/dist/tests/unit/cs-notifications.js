(function (exports,$$1) {
'use strict';

$$1 = 'default' in $$1 ? $$1['default'] : $$1;

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
        var $html = $$1(this._settings.notificationHTML);
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

$ = $$1;
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
        this._settings = $.extend(this._defaults, settings, true);
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

var notificationConfig = {
    notificationHTML: '<li class="cs-notifications__item"><div class="cs-notifications__item-icon"></div><span class="cs-notifications__item-text"></span></li>',
    textSelector: '.cs-notifications__item-text',
    iconSelector: '.cs-notifications__item-icon',
};
describe('Single notification component', function () {
    var singleNotification = null;
    var notificationMessage = 'message';
    beforeEach(function () {
        singleNotification = new Notification(notificationMessage, notificationConfig);
    });
    afterEach(function () {
        singleNotification.getTemplate().remove();
    });
    // Check if methods exist
    it('has getMessage() method', function () {
        expect(typeof singleNotification.getMessage).toBe('function');
    });
    it('has getType() method', function () {
        expect(typeof singleNotification.getType).toBe('function');
    });
    it('has remove() method', function () {
        expect(typeof singleNotification.remove).toBe('function');
    });
    it('has setType() method', function () {
        expect(typeof singleNotification.setType).toBe('function');
    });
    it('has hide() method', function () {
        expect(typeof singleNotification.hide).toBe('function');
    });
    it('has show() method', function () {
        expect(typeof singleNotification.show).toBe('function');
    });
    it('has getTemplate() method', function () {
        expect(typeof singleNotification.getTemplate).toBe('function');
    });
    // Check if return values of methods are correct
    it('has getMessage() method returns string', function () {
        expect(typeof singleNotification.getMessage()).toBe('string');
    });
    it('has getTemplate() method returns JQuery', function () {
        expect(singleNotification.getTemplate().jquery).not.toBeUndefined();
        // expect(singleNotification.getTemplate() instanceof jQuery).toBeTruthy();
    });
    // TODO Waitning for stack overflow because WTF!
    // it('has getType() method returns string', () => {
    //     expect(typeof singleNotification.getType()).toBe('string');
    // });
    //
    // // Check behaviour
    // it('is hidden after hide() method', () => {
    //     // singleNotification.hide();
    //     expect(singleNotification.getTemplate()).toBeHidden();
    // });
    //
    // it('is hidden after show() method', () => {
    //     // singleNotification.show();
    //     expect(singleNotification.getTemplate()).toBeVisible();
    // });
    //
    // it('sets class to < text > element of component after hide(className) method', () => {
    //     let className: string = 'class';
    //     // singleNotification.hide(className);
    //
    //     expect(singleNotification.getTemplate().find(notificationConfig.textSelector)).toHaveClass(className);
    // });
    it('allows to set custom type and returns it', function () {
        var typeName = 'name';
        var type = {
            name: typeName,
        };
        singleNotification.setType(type);
        expect(singleNotification.getType()).toBe(typeName);
    });
});
describe('Notifications manager component', function () {
    var $component = $$1('<ul id="#notifications"></ul>');
    var notificationsManagerConfig = {
        $componentSelector: $$1('#notifications'),
        callback: {},
    };
    var NM = null;
    beforeEach(function () {
        $$1('body').append($component);
        NM = new NotificationsManager(notificationsManagerConfig);
    });
    // Check if methods exist
    it('has init() method', function () {
        expect(typeof NM.init).toBe('function');
    });
    it('has addNotification() method', function () {
        expect(typeof NM.addNotification).toBe('function');
    });
    it('has removeNotification() method', function () {
        expect(typeof NM.removeNotification).toBe('function');
    });
    it('has getNotifications() method', function () {
        expect(typeof NM.getNotifications).toBe('function');
    });
    // Check if methods return proper value
    it('getNotifications() method returns array', function () {
        expect(NM.getNotifications()).toEqual(jasmine.any(Array));
    });
    // Check behaviour
    it('getNotifications() method length should be 1 after single addNotification() method', function () {
        NM.addNotification(new Notification('text', notificationConfig));
        expect(NM.getNotifications().length).toEqual(1);
    });
    it('getNotifications() method length should be empty array after single addNotification() method and removeNotification()', function () {
        var not = new Notification('text', notificationConfig);
        NM.addNotification(not);
        NM.removeNotification(not);
        expect(NM.getNotifications().length).toEqual(0);
    });
    // Test callbacks
    it('will trigger callback after adding new notification', function (done) {
        notificationsManagerConfig.callback.notificationAdded = function () {
            done();
        };
        NM = new NotificationsManager(notificationsManagerConfig);
        NM.addNotification(new Notification('text', notificationConfig));
    });
    it('will trigger callback after removing notification', function (done) {
        notificationsManagerConfig.callback.notificationRemoved = function () {
            done();
        };
        NM = new NotificationsManager(notificationsManagerConfig);
        var not = new Notification('text', notificationConfig);
        NM.addNotification(not);
        NM.removeNotification(not);
    });
});

}((this.csNotifications = this.csNotifications || {}),jQuery));
//# sourceMappingURL=cs-notifications.js.map
