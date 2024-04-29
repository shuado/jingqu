const piniaPersisConfig = (key, paths) => {
    const persist = {
        key,
        storage: window.localStorage, // localStorage | sessionStorage
        paths,
    };
    return persist;
};

export default piniaPersisConfig;
