function Counter({ Item, onDelete, onChangeFn }) {
  const { id, value } = Item;

  const formatNumber = (num) => (num === 0 ? 'Zero' : num);

  const onChange = (add) => onChangeFn(Item, add);

  const removeItem = () => onDelete(id);

  const badgeStyle = () => {
    let style = 'm-2 badge bg-';
    return (style += value > 0 ? 'primary' : 'warning');
  };

  return (
    <div className="row">
      <div className="col-1">
        <span className={badgeStyle()}>{formatNumber(Item.value)}</span>
      </div>

      <div className="col">
        <button onClick={() => onChange(true)} className=" btn-secondary btn-sm btn m-2">
          +
        </button>

        <button disabled={!value && true} onClick={() => onChange()} className="btn-primary btn-sm btn m-2">
          -
        </button>

        <button onClick={removeItem} className="btn-danger btn-sm btn ">
          Remove Item
        </button>
      </div>
    </div>
  );
}

export default Counter;
