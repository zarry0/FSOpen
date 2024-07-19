
const SearchBox = ({label, value, onChange}) => {

    return (
        <>
            <form>
                {label} <input type="text" value={value} onChange={onChange}/>
            </form>
        </>
    );
};

export default SearchBox;