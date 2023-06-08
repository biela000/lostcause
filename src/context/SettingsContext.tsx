import React, {createContext, ReactElement, ReactNode, useState} from "react";

export type SettingsContextType = {
    mapSettings: {
        blockSize: number;
        blockCount: number;
    },
    duckSettings: {
        duckSize: number;
        duckTimeToPassBlock: number;
    },
    playerSettings: {
        playerSize: number;
    }
}

export const SettingsContext = createContext<SettingsContextType>({
    mapSettings: {
        blockSize: 0,
        blockCount: 0
    },
    duckSettings: {
        duckSize: 0,
        duckTimeToPassBlock: 0
    },
    playerSettings: {
        playerSize: 0
    }
});

export default function SettingsProvider({ children }: { children: ReactNode }): ReactElement {
    const [settings, setSettings] = useState({
        mapSettings: {
            blockSize: 50,
            blockCount: 16
        },
        duckSettings: {
            duckSize: 50,
            duckTimeToPassBlock: 200
        },
        playerSettings: {
            playerSize: 50
        }
    });

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}