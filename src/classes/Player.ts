import {SettingsContextType} from "../context/SettingsContext";
import Entity from "./Entity";
import PlayerUtils from "../utils/Player";
import Position from "../types/Position";

export default class Player extends Entity {
	protected _position: Position;
	private _name: string;
	private readonly _id: string;
	private readonly _number: number;
	private _score: number = 0;
	public move(settings: SettingsContextType, wallPositions: Position[], acceleratorParams: { x: number, y: number, z: number }): void {
		const newPosition: Position = PlayerUtils.calculateNextPlayerPosition(
			settings,
			this._position,
			acceleratorParams
		);

		if (!wallPositions.some((wallPosition: Position) => {
			return wallPosition.x === newPosition.x && wallPosition.y === newPosition.y;
		})) {
			this._position = newPosition;
		}
	}

	public get name(): string {
		return this._name;
	}

	public set name(name: string) {
		this._name = name;
	}

	public get id(): string {
		return this._id;
	}

	public get number(): number {
		return this._number;
	}

	public get score(): number {
		return this._score;
	}

	public set score(score: number) {
		this._score = score;
	}

	constructor(startingPosition: Position, name: string, playerId: string) {
		super(startingPosition);
		this._position = startingPosition;
		this._name = name;
		this._id = playerId;
		this._number = parseInt(this.id.slice(-1));
		this._score = 0;
	}
}
