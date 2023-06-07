import React, {ReactElement, useEffect, useState} from 'react';
import labyrinth, {BlockObject} from '../utils/Labyrinth';
import Settings from "../utils/Settings";
import Block from './Block';
import Duck from "./Duck";
import styles from '../stylesheets/Map.module.css';
import Position from "../types/Position";
import BlockType from "../types/BlockType";

export default function Map(): ReactElement {
    const [duckPosition, setDuckPosition] = useState({
        x: Settings.mapSettings.blockSize,
        y: Settings.mapSettings.blockSize
    });

    const wallPositions: Position[] = labyrinth
        .filter((block: BlockObject) => block.blockType === BlockType.Wall)
        .map((block: BlockObject) => {
            const yIndex: number = +block.id.slice(0, block.id.indexOf('-'));
            const xIndex: number = +block.id.slice(block.id.indexOf('-') + 1);

            return {
                x: xIndex * Settings.mapSettings.blockSize,
                y: yIndex * Settings.mapSettings.blockSize
            }
        });

    const blockElements: ReactElement[] = labyrinth.map((block: BlockObject) => {
        return (
            <Block blockType={block.blockType} id={block.id} key={block.id} />
        )
    });

    useEffect(() => {
        setInterval(() => {
            setDuckPosition((prevPosition: Position): Position => {
                const possibleDirections: Position[] = [
                    { x: prevPosition.x + Settings.mapSettings.blockSize, y: prevPosition.y },
                    { x: prevPosition.x - Settings.mapSettings.blockSize, y: prevPosition.y },
                    { x: prevPosition.x, y: prevPosition.y + Settings.mapSettings.blockSize },
                    { x: prevPosition.x, y: prevPosition.y - Settings.mapSettings.blockSize }
                ];

                const possibleDirectionsFiltered: Position[] = possibleDirections.filter((direction: Position) => {
                    return !wallPositions.some((wallPosition: Position) => {
                        return wallPosition.x === direction.x && wallPosition.y === direction.y;
                    });
                });

                const randomIndex: number = Math.floor(Math.random() * possibleDirectionsFiltered.length);
                return possibleDirectionsFiltered[randomIndex];
            });
        }, Settings.duckSettings.duckTimeToPassBlock);
    }, []);

    return (
        <div className={styles.map}>
            {blockElements}
            <Duck position={duckPosition} />
        </div>
    );
}