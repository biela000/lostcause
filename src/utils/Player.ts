import {SettingsContextType} from "../context/SettingsContext";
import AcceleratorParams from "../types/AcceleratorParams";
import Position from "../types/Position";

export default class PlayerUtils {
	public static calculateNextPlayerPosition(settings: SettingsContextType, playerPosition: Position, acceleratorParams: AcceleratorParams): Position {
		const newPosition: Position = {...playerPosition};

		if (Math.abs(acceleratorParams.x) > Math.abs(acceleratorParams.y)) {
			if (acceleratorParams.x < -0.3) {
				newPosition.x += settings.mapSettings.blockSize;
			} else if (acceleratorParams.x > 0.3) {
				newPosition.x -= settings.mapSettings.blockSize;
			}
		} else {
			if (acceleratorParams.y < -0.3) {
				newPosition.y -= settings.mapSettings.blockSize;
			} else if (acceleratorParams.y > 0.3) {
				newPosition.y += settings.mapSettings.blockSize;
			}
		}

		return newPosition;
	}
}