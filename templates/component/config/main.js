export default {
    /**
     * Namespace prefix for your classes eg. "cs-", "m2c-" etc.
     * @type {String}
     */
    prefix: 'cs-',
    /**
     * Name of the entry file for TypeScritpt/JavaScript without extension.
     * @type {String}
     */
    jsEntryFilename: '{{ dashCase name }}',
    /**
     * JavaScript namespace for your components code.
     * Basically, it is a name of the variable in global window object.
     * @type {String}
     */
    jsExportVariable: '{{ camelCase name }}'
};
