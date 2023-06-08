import React, {ReactElement, useEffect, useState, useContext, useMemo} from 'react';
import labyrinth, {BlockObject} from '../utils/Labyrinth';
import {SettingsContext} from "../context/SettingsContext";
import Block from './Block';
import DuckComponent from "./Duck";
import PlayerComponent from "./Player";
import Duck from "../classes/Duck";
import Player from "../classes/Player";
import styles from '../stylesheets/Map.module.css';
import Position from "../types/Position";
import BlockType from "../types/BlockType";
import SocketMessage from "../types/SocketMessage";

export default function Map(): ReactElement {
    const settings = useContext(SettingsContext);
    const [duck, setDuck] = useState(new Duck({
        x: settings.mapSettings.blockSize,
        y: settings.mapSettings.blockSize,
        lastX: 0,
        lastY: 0
    }));
    const [players, setPlayers] = useState([] as Player[]);

    const wallPositions: Position[] = useMemo(() => {
        return (
            labyrinth
                .filter((block: BlockObject) => block.blockType === BlockType.Wall)
                .map((block: BlockObject) => {
                    const yIndex: number = +block.id.slice(0, block.id.indexOf('-'));
                    const xIndex: number = +block.id.slice(block.id.indexOf('-') + 1);

                    return {
                        x: xIndex * settings.mapSettings.blockSize,
                        y: yIndex * settings.mapSettings.blockSize
                    }
                })
        );
    }, [settings.mapSettings.blockSize]);

    const blockElements: ReactElement[] = labyrinth.map((block: BlockObject) => {
        return (
            <Block blockType={block.blockType} id={block.id} key={block.id} />
        )
    });

    const createPlayer = (startingPosition: Position, playerName: string, playerId: string): void => {
        const newPlayer = new Player(startingPosition, playerName, playerId);
        setPlayers((prevPlayers: Player[]): Player[] => {
            return [...prevPlayers, newPlayer];
        });
    }

    useEffect(() => {
        setInterval(() => {
            setDuck((prevDuck: Duck): Duck => {
                const newDuck = new Duck(prevDuck.position);
                newDuck.move(settings, wallPositions);
                return newDuck;
            });
        }, settings.duckSettings.duckTimeToPassBlock);
    }, [settings, wallPositions]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4444');
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'CREATE_LOBBY',
                payload: {
                    lobbyName: 'test'
                }
            }));
        }
        socket.onmessage = (message) => {
            const parsedMessage: SocketMessage = JSON.parse(message.data);

            switch (parsedMessage.type) {
                case 'PLAYER_JOINED':
                    createPlayer({
                        x: settings.mapSettings.blockSize,
                        y: settings.mapSettings.blockSize,
                        lastX: 0,
                        lastY: 0
                    }, parsedMessage.payload.playerName, parsedMessage.payload.playerId);
                    break;
                case 'PLAYER_MOVE':
                    setPlayers((prevPlayers: Player[]): Player[] => {
                        const playerIndex: number = prevPlayers.findIndex((player: Player) => player.id === parsedMessage.payload.playerId);
                        const newPlayers: Player[] = [...prevPlayers];
                        newPlayers[playerIndex].move(settings, wallPositions, parsedMessage.payload.acceleratorParams);
                        return newPlayers;
                    });
                    break;
                default:
                    break;

            }
        }
    }, [settings, wallPositions]);

    useEffect(() => {
        players.forEach((player: Player) => {
            if (player.position.x === duck.position.x && player.position.y === duck.position.y) {
                setPlayers((prevPlayers: Player[]): Player[] => {
                    const playerIndex: number = prevPlayers.findIndex((prevPlayer: Player) => prevPlayer.id === player.id);
                    const newPlayers: Player[] = [...prevPlayers];
                    newPlayers[playerIndex].score++;
                    newPlayers.forEach((player: Player) => {
                        player.position = {
                            x: settings.mapSettings.blockSize,
                            y: settings.mapSettings.blockSize,
                            lastX: 0,
                            lastY: 0
                        }
                    });
                    return newPlayers;
                });
                setDuck(new Duck({
                    x: 700,
                    y: 650,
                    lastX: 0,
                    lastY: 0
                }));
                alert(`${player.name} won!}`);
            }
        });
    }, [players, settings.mapSettings.blockSize]);

    const playerElements: ReactElement[] = players.map((player: Player) => {
        return (
            <PlayerComponent key={player.id} position={player.position} number={player.number} />
        );
    });

    return (
        <>
            <div className={styles.map}>
                {blockElements}
                <DuckComponent position={duck.position} />
                {playerElements}
            </div>
            <div>
                {players.map((player: Player) => {
                    return (
                        <div key={player.id}>{player.id}. {player.name}: {player.score}</div>
                    );
                })}
            </div>
        </>
    );
}