"use strict";
var adderButton = '.cc-component-adder__button-create';
var firstComponentMoveUp = '.cc-layout-builder__component:first-of-type .cc-component-actions__button--up';
var firstComponentMoveDown = '.cc-layout-builder__component:first-of-type .cc-component-actions__button--down';
var lastComponentMoveUp = '.cc-layout-builder__component:last-of-type .cc-component-actions__button--up';
var lastComponentMoveDown = '.cc-layout-builder__component:last-of-type .cc-component-actions__button--down';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'Adding new component': function (browser) {
        browser
            .url('http://localhost:9000/demo/index.html')
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .waitForElementVisible('.cc-layout-builder__component', 1000)
            .end();
    },
    'Single component has properly enabled moving controls': function (browser) {
        browser
            .url('http://localhost:9000/demo/index.html')
            .waitForElementVisible('body', 1000)
            .click('.cc-component-adder__button-create')
            .waitForElementVisible('.cc-layout-builder__component', 1000);
        browser.expect.element(firstComponentMoveUp).to.not.be.enabled;
        browser.expect.element(lastComponentMoveDown).to.not.be.enabled;
        browser.end();
    },
    'First component has disabled up and last has disabled down control': function (browser) {
        browser
            .url('http://localhost:9000/demo/index.html')
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .waitForElementVisible('.cc-layout-builder__component', 1000)
            .click(adderButton)
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
            .url('http://localhost:9000/demo/index.html')
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .waitForElementVisible('.cc-layout-builder__component', 1000);
        browser.getText(placeholderContent, function (oldText) {
            browser.click(settingsButton);
            browser.expect.element(placeholderContent).text.to.not.equal(oldText.value).after(1000);
        });
        browser.end();
    },
    'Component is deleted on remove button click': function (browser) {
        var deleteButton = '.cc-component-actions__button--delete';
        browser
            .url('http://localhost:9000/demo/index.html')
            .waitForElementVisible('body', 1000)
            .click(adderButton)
            .waitForElementVisible('.cc-layout-builder__component', 1000);
        browser.click(deleteButton);
        browser.acceptAlert();
        browser.expect.element('.cc-layout-builder__component').to.not.be.present.after(1000);
        browser.end();
    },
};
