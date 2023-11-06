import styles from './board.module.css';
import BingoNumber from '../bingoNumber/bingoNumber';

const Board = (props) => {
    const { bungoNumbers } = props;

    return (
        <div className={styles.board}>
            {bungoNumbers.map((number, index) => (
                <BingoNumber key={index} number={index} filled={number} />
            ))}
        </div>
    );

};

export default Board;