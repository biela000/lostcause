import {SettingsContextType} from "../context/SettingsContext";
import Position from "../types/Position";

export default class DuckUtils {
    public static calculateNextDuckPosition = (
        settings: SettingsContextType,
        position: Position,
        wallPositions: Position[]
    ): Position => {
        const possibleDirections: Position[] = [
            { x: position.x + settings.mapSettings.blockSize, y: position.y },
            { x: position.x - settings.mapSettings.blockSize, y: position.y },
            { x: position.x, y: position.y + settings.mapSettings.blockSize },
            { x: position.x, y: position.y - settings.mapSettings.blockSize }
        ];

        const newLastX: number = position.x;
        const newLastY: number = position.y;

        let possibleDirectionsFiltered: Position[] = possibleDirections.filter((direction: Position) => {
            return !wallPositions.some((wallPosition: Position) => {
                return wallPosition.x === direction.x && wallPosition.y === direction.y;
            });
        });

        // Make sure the duck does not go back if it has more than one possible direction
        if (possibleDirectionsFiltered.length > 1) {
            possibleDirectionsFiltered = possibleDirectionsFiltered.filter((direction: Position) => {
                return direction.x !== position.lastX || direction.y !== position.lastY;
            });
        }

        const randomIndex: number = Math.floor(Math.random() * possibleDirectionsFiltered.length);
        return {
            ...possibleDirectionsFiltered[randomIndex],
            lastX: newLastX,
            lastY: newLastY
        };
    }
}