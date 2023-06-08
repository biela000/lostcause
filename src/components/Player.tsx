import React, {ReactElement} from 'react';
import Position from "../types/Position";
import styles from '../stylesheets/Player.module.css';

export type PlayerProps = {
	number: number;
	position: Position;
}

export default function Player({ number, position }: PlayerProps): ReactElement {
	return (
		<div className={styles.player} style={{
			left: position.x,
			top: position.y
		}}>{ number }</div>
	);
}