import { INotificationSettings, INotificationType, Notification } from './class.notification';
import { INotificationsManager, INotificationsManagerSettings, NotificationsManager } from './class.notifications';

let nmSettings: INotificationsManagerSettings = {
    $componentSelector: $('.cs-notifications'),
    $closeComponentSelector: $('.cs-notifications__close'),
    callback: {
        notificationClosed(): void {
            $('.cs-notifications').hide();
        },
        notificationAdded(): void {
        },
    },
    deleteOnClose: true,
};

let notificationsManager: INotificationsManager = new NotificationsManager(nmSettings);
notificationsManager.init();

let notificationConfig: INotificationSettings = {
    notificationHTML: '<li class="cs-notifications__item"><div class="cs-notifications__item-icon"></div><span class="cs-notifications__item-text"></span></li>',
    textSelector: '.cs-notifications__item-text',
    iconSelector: '.cs-notifications__item-icon',

};

let negativeType: INotificationType = {
    name: 'negative',
    textClass: 'cs-notifications__item-text--negative',
};

class NegativeNotification extends Notification {
    constructor(message: string, settings: INotificationSettings) {
        super(message, settings);

        this._type = negativeType;

    }
}

let not1: Notification = new Notification('notification message default style', notificationConfig);
let not2: Notification = new NegativeNotification('negative message via extended notification class with another "Type"', notificationConfig);
window.n = not1;
notificationsManager.addNotification(not1);
notificationsManager.addNotification(not2);

$('#newNot').click(function (): void {
    notificationsManager.addNotification(new Notification('new notification added', notificationConfig));
});
