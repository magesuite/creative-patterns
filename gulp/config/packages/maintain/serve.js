/**
 * Serve task configuration.
 * @type {Object}
 */
const settings = {
    /**
     * BrowserSync configuration.
     */
    browserSync: {
        port: 9000,
        server: {
            baseDir: [
                'packages',
            ],
            directory: true,
        },
    },
};

export default settings;
