import React, {ReactElement} from 'react';
import styles from '../stylesheets/Duck.module.css';
import Position from "../types/Position";

export type DuckProps = {
    position: Position;
}

export default function Duck({ position }: DuckProps): ReactElement {
    return (
        <div className={styles['duck-container']} style={{
            left: position.x,
            top: position.y
        }}>
            <div className={styles.duck}>
                <div className={styles.head}>
                    <div className={styles.eye}></div>
                    <div className={styles.beak}></div>
                </div>
                <div className={styles.body}></div>
                <div className={`${styles.leg} ${styles['left-leg']}`}></div>
                <div className={`${styles.leg} ${styles['right-leg']}`}></div>
            </div>
        </div>
    );
}