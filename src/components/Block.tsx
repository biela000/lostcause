import React, {ReactElement} from 'react';
import BlockType from '../types/BlockType';
import styles from '../stylesheets/Block.module.css';

export type BlockProps = {
    blockType: BlockType;
    id: string;
}

export default function Block({ blockType, id }: BlockProps): ReactElement {
    return (
        <div
            className={`${styles.block} ${blockType === BlockType.Wall ? styles.wall : styles.path}`}
            data-id={id}
            key={id}
        >
        </div>
    );
}