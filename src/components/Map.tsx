import React, {ReactElement, useEffect, useState, useContext} from 'react';
import labyrinth, {BlockObject} from '../utils/Labyrinth';
import {SettingsContext} from "../context/SettingsContext";
import DuckUtils from "../utils/Duck";
import Block from './Block';
import Duck from "./Duck";
import styles from '../stylesheets/Map.module.css';
import Position from "../types/Position";
import BlockType from "../types/BlockType";

export default function Map(): ReactElement {
    const settings = useContext(SettingsContext);
    const [duckPosition, setDuckPosition] = useState({
        x: settings.mapSettings.blockSize,
        y: settings.mapSettings.blockSize,
        lastX: 0,
        lastY: 0
    } as Position);

    const wallPositions: Position[] = labyrinth
        .filter((block: BlockObject) => block.blockType === BlockType.Wall)
        .map((block: BlockObject) => {
            const yIndex: number = +block.id.slice(0, block.id.indexOf('-'));
            const xIndex: number = +block.id.slice(block.id.indexOf('-') + 1);

            return {
                x: xIndex * settings.mapSettings.blockSize,
                y: yIndex * settings.mapSettings.blockSize
            }
        });

    const blockElements: ReactElement[] = labyrinth.map((block: BlockObject) => {
        return (
            <Block blockType={block.blockType} id={block.id} key={block.id} />
        )
    });

    useEffect(() => {
        setInterval(() => {
            setDuckPosition((prevPosition: Position): Position =>
                DuckUtils.calculateNextDuckPosition(settings, prevPosition, wallPositions)
            );
        }, settings.duckSettings.duckTimeToPassBlock);
    }, []);

    return (
        <div className={styles.map}>
            {blockElements}
            <Duck position={duckPosition} />
        </div>
    );
}