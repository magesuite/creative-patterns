import {parsleyLangDe} from './de.cs-parsley-lang';
import Parsley from 'Parsley';

export interface IParsleyMessages {

    defaultMessage: string;
    type: {
        email: string;
        url: string;
        number: string;
        integer: string;
        digits: string;
        alphanum: string;
    };
    notblank: string;
    required: string;
    pattern: string;
    min: string;
    max: string;
    range: string;
    minlength: string;
    maxlength: string;
    length: string;
    mincheck: string;
    maxcheck: string;
    check: string;
    equalto: string;
    dateiso: string;
    minwords: string;
    maxwords: string;
    words: string;
    gt: string;
    gte: string;
    lt: string;
    lte: string;
}

function setLanguage(parsley: Parsley, lang: string): void {
    if (lang.toLowerCase() === 'de') {
        parsley.addMessages('de', parsleyLangDe);

        parsley.setLocale('de');
    }
}

export {setLanguage};
