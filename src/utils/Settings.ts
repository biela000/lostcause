export default class Settings {
    private static _mapSettings = {
        blockSize: 50,
        blockCount: 16,
    }
    private static _duckSettings = {
        duckSize: 50,
        duckTimeToPassBlock: 200,
    }

    private static _playerSettings = {
        playerSize: 50,
        playerTimeToPassBlock: 200,
    }

    static get mapSettings() {
        return this._mapSettings;
    }

    static get duckSettings() {
        return this._duckSettings;
    }

    static get playerSettings() {
        return this._playerSettings;
    }
}