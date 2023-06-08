import React, { ReactElement } from 'react';
import SettingsProvider from "./context/SettingsContext";
import Map from './components/Map';

export default function App(): ReactElement {
    return (
        <SettingsProvider>
            <Map />
        </SettingsProvider>
    );
}