import styles from './display.module.css';

const Display = (props) => {
    const { value } = props;

    return (
        <div className={styles.display}>
            {value}
        </div>
    );

};

export default Display;