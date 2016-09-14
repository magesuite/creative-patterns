"use strict";
var demoUrl = 'http://localhost:9000/customizations/cc-content-constructor/dist/demo/index.html';
var adderButton = '.cc-component-adder__button-create';
var firstComponentMoveUp = '.cc-layout-builder__component:first-of-type .cc-component-actions__button--up';
var firstComponentMoveDown = '.cc-layout-builder__component:first-of-type .cc-component-actions__button--down';
var lastComponentMoveUp = '.cc-layout-builder__component:last-of-type .cc-component-actions__button--up';
var lastComponentMoveDown = '.cc-layout-builder__component:last-of-type .cc-component-actions__button--down';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'Adding new component': function (browser) {
        browser
            .url(demoUrl)
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .acceptAlert()
            .waitForElementVisible('.cc-layout-builder__component', 1000)
            .end();
    },
    'Single component has properly enabled moving controls': function (browser) {
        browser
            .url(demoUrl)
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .acceptAlert()
            .waitForElementVisible('.cc-layout-builder__component', 1000);
        browser.expect.element(firstComponentMoveUp).to.not.be.enabled;
        browser.expect.element(lastComponentMoveDown).to.not.be.enabled;
        browser.end();
    },
    'First component has disabled up and last has disabled down control': function (browser) {
        browser
            .url(demoUrl)
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .acceptAlert()
            .waitForElementVisible('.cc-layout-builder__component', 1000)
            .click(adderButton)
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .acceptAlert()
            .waitForElementVisible('.cc-layout-builder__component:nth-of-type(2)', 1000);
        browser.expect.element(firstComponentMoveUp).to.not.be.enabled;
        browser.expect.element(firstComponentMoveDown).to.be.enabled;
        browser.expect.element(lastComponentMoveUp).to.be.enabled;
        browser.expect.element(lastComponentMoveDown).to.not.be.enabled;
        browser.end();
    },
    'Component is edited on edit button click': function (browser) {
        var settingsButton = '.cc-component-actions__button--settings';
        var placeholderContent = '.cc-component-placeholder__content';
        browser
            .url(demoUrl)
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .acceptAlert()
            .waitForElementVisible('.cc-layout-builder__component', 1000);
        browser.getText(placeholderContent, function (oldText) {
            browser
                .click(settingsButton)
                .pause(1000)
                .acceptAlert();
            browser.expect.element(placeholderContent).text.to.not.equal(oldText.value).after(1000);
        });
        browser.end();
    },
    'Component is deleted on remove button click': function (browser) {
        var deleteButton = '.cc-component-actions__button--delete';
        browser
            .url(demoUrl)
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .pause(1000)
            .acceptAlert()
            .pause(1000)
            .acceptAlert()
            .waitForElementVisible('.cc-layout-builder__component', 1000);
        browser
            .click(deleteButton)
            .pause(1000)
            .acceptAlert();
        browser.expect.element('.cc-layout-builder__component').to.not.be.present.after(1000);
        browser.end();
    },
};
