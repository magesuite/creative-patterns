(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('csParsleyLang', ['exports'], factory) :
    (factory((global.csParsleyLang = global.csParsleyLang || {})));
}(this, (function (exports) { 'use strict';

var parsleyLangDe = {
    defaultMessage: 'Die Eingabe scheint nicht korrekt zu sein.',
    type: {
        email: 'Die Eingabe muss eine gültige E-Mail-Adresse sein.',
        url: 'Die Eingabe muss eine gültige URL sein.',
        number: 'Die Eingabe muss eine Zahl sein.',
        integer: 'Die Eingabe muss eine Zahl sein.',
        digits: 'Die Eingabe darf nur Ziffern enthalten.',
        alphanum: 'Die Eingabe muss alphanumerisch sein.',
    },
    notblank: 'Die Eingabe darf nicht leer sein.',
    required: 'Pflichtfeld! Bitte ergänzen Sie Ihre Angaben.',
    pattern: 'Die Eingabe scheint ungültig zu sein.',
    min: 'Die Eingabe muss größer oder gleich %s sein.',
    max: 'Die Eingabe muss kleiner oder gleich %s sein.',
    range: 'Die Eingabe muss zwischen %s und %s liegen.',
    minlength: 'Die Eingabe ist zu kurz. Es müssen mindestens %s Zeichen eingegeben werden.',
    maxlength: 'Die Eingabe ist zu lang. Es dürfen höchstens %s Zeichen eingegeben werden.',
    length: 'Die Länge der Eingabe ist ungültig. Es müssen zwischen %s und %s Zeichen eingegeben werden.',
    mincheck: 'Wählen Sie mindestens %s Angaben aus.',
    maxcheck: 'Wählen Sie maximal %s Angaben aus.',
    check: 'Wählen Sie zwischen %s und %s Angaben.',
    equalto: 'Dieses Feld muss dem anderen entsprechen.',
    dateiso: 'Die Eingabe muss ein gültiges Datum sein (YYYY-MM-DD).',
    minwords: 'Die Eingabe ist zu kurz. Sie muss aus %s oder mehr Wörtern bestehen.',
    maxwords: 'Die Eingabe ist zu lang. Sie muss aus %s oder weniger Wörtern bestehen.',
    words: 'Die Länge der Eingabe ist ungültig. Sie muss zwischen %s und %s Wörter enthalten.',
    gt: 'Die Eingabe muss größer sein.',
    gte: 'Die Eingabe muss größer oder gleich sein.',
    lt: 'Die Eingabe muss kleiner sein.',
    lte: 'Die Eingabe muss kleiner oder gleich sein.',
};

function setLanguage(parsley, lang) {
    if (lang.toLowerCase() === 'de') {
        parsley.addMessages('de', parsleyLangDe);
        parsley.setLocale('de');
    }
}

exports.setLanguage = setLanguage;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-parsley-lang.js.map
