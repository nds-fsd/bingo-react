

const ResetBingo = (props) => {
    const { onReset } = props;

    return (
        <div>
            <button onClick={onReset}>Reset</button>
        </div>
    );
};

export default ResetBingo;