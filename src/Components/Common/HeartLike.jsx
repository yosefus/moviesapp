function HeartLike({ onClick, like }) {
  const heartStyle = like ? 'fas fa-heart text-success ' : 'far fa-heart';

  return (
    <button onClick={onClick} style={{ marginLeft: 5 }} className="btn">
      <i className={heartStyle}></i>
    </button>
  );
}

export default HeartLike;
