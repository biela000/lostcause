import {SettingsContextType} from "../context/SettingsContext";
import Position from "../types/Position";

export default abstract class Entity {
	protected _position: Position;
	public abstract move(settings: SettingsContextType, wallPositions: Position[], acceleratorParams?: any): void;
	public get position(): Position {
		return this._position;
	}

	public set position(position: Position) {
		this._position = position;
	}

	protected constructor(startingPosition: Position) {
		this._position = startingPosition;
	}
}
