function TableHeader({ columnArr, onSort, sortColumn }) {
  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fas fa-sort-down"></i>;
    return <i className="fas fa-sort-up"></i>;
  };

  const handleSort = (path) => {
    const tempSortState = { ...sortColumn };
    if (tempSortState.path === path) {
      tempSortState.order = tempSortState.order === 'asc' ? 'desc' : 'asc';
    } else {
      tempSortState.path = path;
      tempSortState.order = 'asc';
    }

    onSort(tempSortState);
  };

  return (
    <thead className="table-light">
      <tr>
        {columnArr.map((column) => (
          <th
            style={{ cursor: 'pointer' }}
            key={column.label || column.key}
            onClick={() => handleSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
