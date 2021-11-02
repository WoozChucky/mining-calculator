/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        REACT_APP_COINBASE_URL: 'https://api.coinbase.com'
        REACT_APP_COINBASE_VERSION: 'v2'
        REACT_APP_ETHERMINE_URL: 'https://api.ethermine.org'
    }
}