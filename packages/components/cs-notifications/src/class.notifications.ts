import jQuery from 'jQuery';

$ = jQuery;

import {Notification} from './class.notification';

interface INotificationsManager {
    init(): void;
    addNotification(notification: Notification): void;
    removeNotification(notification: Notification): void;
    getNotifications(): Notification[];

}

interface INotificationsManagerSettings {
    callback?: {
        notificationAdded?(): any;
        notificationRemoved?(): any;
        notificationClosed?(): any;
    };
    $componentSelector: JQuery;
    $closeComponentSelector?: JQuery;
    deleteOnClose?: boolean;
}

class NotificationsManager implements INotificationsManager {

    private _defaults: INotificationsManagerSettings = {
        callback: {
            notificationAdded: null,
            notificationRemoved: null,
            notificationClosed: null,
        },
        $componentSelector: null,
        $closeComponentSelector: null,
    };

    private _settings: INotificationsManagerSettings = null;

    private _notificationsList: Notification[] = [];

    constructor(settings: INotificationsManagerSettings) {

        this._settings = $.extend(this._defaults, settings, true);

    }

    public init(): void {
        this._bindEvents();
    }

    public addNotification(notification: Notification): void {

        this._notificationsList.push(notification);

        this._printNotification(notification.getTemplate());

    }

    public removeNotification(notification: Notification): void {

        notification.remove();

        let arrayPos: number = this._notificationsList.indexOf(notification);
        this._notificationsList.splice(arrayPos, 1);

        if (this._settings.callback.notificationRemoved) {
            this._settings.callback.notificationRemoved();

        }

    }

    public getNotifications(): Notification[] {
        return this._notificationsList;
    }

    private _printNotification(template: HTMLElement|JQuery): void {
        this._settings.$componentSelector.append(template);

        if (this._settings.callback.notificationAdded) {
            this._settings.callback.notificationAdded();

        }

    }

    private _close(): void {
        if (this._settings.callback.notificationClosed) {
            this._settings.callback.notificationClosed();

        }

        if (this._settings.deleteOnClose) {
            for (let notification: Notification of this._notificationsList) {
                notification.remove();
            }
        }
    }

    private _bindEvents(): void {
        if (this._settings.$closeComponentSelector) {
            this._settings.$closeComponentSelector.on('click', (e: Event) => {
                e.preventDefault();
                this._close();

            });

        }

    }
}

export {INotificationsManager, INotificationsManagerSettings, NotificationsManager};
