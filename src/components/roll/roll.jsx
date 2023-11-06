import styles from './roll.module.css';

const Roll = (props) => {
    const { onRoll } = props;

    return (
        <div className={styles.roll}>
            <button onClick={onRoll}>Roll</button>
        </div>
    );

};

export default Roll;