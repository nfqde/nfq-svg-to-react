declare module 'cli-autoupdate' {
    import EventEmitter from 'events';

    /**
     *
     */
    class AutoUpdater extends EventEmitter {
        /**
         *
         */
        constructor(options: object);
    }

    export default AutoUpdater;
}