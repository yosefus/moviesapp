import { Counter } from '../';

function Counters(props) {
  const { Items, onChange, onDelete, onReset } = props;

  return (
    <>
      <button className="btn btn-secondary m-3" onClick={onReset}>
        Reset
      </button>
      {Items && Items.map((item) => <Counter onChangeFn={onChange} Item={item} onDelete={onDelete} key={item.id} />)}
    </>
  );
}

export default Counters;
