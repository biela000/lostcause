import {SettingsContextType} from "../context/SettingsContext";
import Entity from "./Entity";
import DuckUtils from "../utils/Duck";
import Position from "../types/Position";

export default class Duck extends Entity {
	protected _position: Position;
	public move(settings: SettingsContextType, wallPositions: Position[]): void {
		this._position = DuckUtils.calculateNextDuckPosition(
			settings,
			this._position,
			wallPositions
		);
	}

	constructor(startingPosition: Position) {
		super(startingPosition);
		this._position = startingPosition;
	}
}
