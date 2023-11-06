import styles from './bingoNumber.module.css';
import classnames from 'classnames';

const BingoNumber = (props) => {
    const { number, filled } = props;

    const filledClass = classnames({
        [styles['filled-root']]: true,
        [styles.filled]: filled,
    });

    return (
        <div className={styles.number}>
            <p>{number + 1}</p>
            <div className={filledClass}></div>
        </div>
    );

};

export default BingoNumber;