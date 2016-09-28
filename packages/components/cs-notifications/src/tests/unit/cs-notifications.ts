import $ from 'jQuery';

import {INotification, INotificationSettings, INotificationType, Notification} from '../../class.notification';
import {INotificationsManagerSettings, NotificationsManager} from '../../class.notifications';

let notificationConfig: INotificationSettings = {
    notificationHTML: '<li class="cs-notifications__item"><div class="cs-notifications__item-icon"></div><span class="cs-notifications__item-text"></span></li>',
    textSelector: '.cs-notifications__item-text',
    iconSelector: '.cs-notifications__item-icon',
};

describe('Single notification component', function (): void {
    let singleNotification: INotification = null;
    let notificationMessage: string = 'message';

    beforeEach(() => {
        singleNotification = new Notification(notificationMessage, notificationConfig);
    });

    afterEach(function (): void {
        singleNotification.getTemplate().remove();
    });

    // Check if methods exist
    it('has getMessage() method', () => {
        expect(typeof singleNotification.getMessage).toBe('function');
    });

    it('has getType() method', () => {
        expect(typeof singleNotification.getType).toBe('function');
    });

    it('has remove() method', () => {
        expect(typeof singleNotification.remove).toBe('function');
    });

    it('has setType() method', () => {
        expect(typeof singleNotification.setType).toBe('function');
    });

    it('has hide() method', () => {
        expect(typeof singleNotification.hide).toBe('function');
    });

    it('has show() method', () => {
        expect(typeof singleNotification.show).toBe('function');
    });

    it('has getTemplate() method', () => {
        expect(typeof singleNotification.getTemplate).toBe('function');
    });

    // Check if return values of methods are correct

    it('has getMessage() method returns string', () => {
        expect(typeof singleNotification.getMessage()).toBe('string');
    });

    it('has getTemplate() method returns JQuery', () => {

        expect(singleNotification.getTemplate().jquery).not.toBeUndefined();

        // expect(singleNotification.getTemplate() instanceof jQuery).toBeTruthy();
    });

    //TODO Waitning for stack overflow because WTF!

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

    it('allows to set custom type and returns it', () => {
        let typeName: string = 'name';
        let type: INotificationType = {
            name: typeName,
        };

        singleNotification.setType(type);

        expect(singleNotification.getType()).toBe(typeName);
    });

});

describe('Notifications manager component', function (): void {
    let $component: JQuery = $('<ul id="#notifications"></ul>');

    let notificationsManagerConfig: INotificationsManagerSettings = {
        $componentSelector: $('#notifications'),
        callback: {},
    };

    let NM: NotificationsManager = null;

    beforeEach(function (): void {
        $('body').append($component);

        NM = new NotificationsManager(
            notificationsManagerConfig,
        );
    });

    // Check if methods exist
    it('has init() method', () => {
        expect(typeof NM.init).toBe('function');
    });
    it('has addNotification() method', () => {
        expect(typeof NM.addNotification).toBe('function');
    });
    it('has removeNotification() method', () => {
        expect(typeof NM.removeNotification).toBe('function');
    });
    it('has getNotifications() method', () => {
        expect(typeof NM.getNotifications).toBe('function');
    });

    // Check if methods return proper value
    it('getNotifications() method returns array', () => {
        expect(NM.getNotifications()).toEqual(jasmine.any(Array));
    });

    // Check behaviour
    it('getNotifications() method length should be 1 after single addNotification() method', () => {
        NM.addNotification(new Notification('text', notificationConfig));

        expect(NM.getNotifications().length).toEqual(1);
    });

    it('getNotifications() method length should be empty array after single addNotification() method and removeNotification()', () => {
        let not: Notification = new Notification('text', notificationConfig);

        NM.addNotification(not);
        NM.removeNotification(not);

        expect(NM.getNotifications().length).toEqual(0);
    });

    // Test callbacks

    it('will trigger callback after adding new notification', (done: Function) => {

        notificationsManagerConfig.callback.notificationAdded = function (): void {
            done();
        };

        NM = new NotificationsManager(notificationsManagerConfig);

        NM.addNotification(new Notification('text', notificationConfig));

    });

    it('will trigger callback after removing notification', (done: Function) => {

        notificationsManagerConfig.callback.notificationRemoved = function (): void {
            done();
        };

        NM = new NotificationsManager(notificationsManagerConfig);

        let not: Notification = new Notification('text', notificationConfig);

        NM.addNotification(not);
        NM.removeNotification(not);

    });

});
