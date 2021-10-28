import _ from 'lodash';

function TableBody({ data, columnArr }) {
  const renderTd = (item, column) => (column.content ? column.content(item) : _.get(item, column.path));
  const createKey = (item, column) => item._id + (column.path || column.key);

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columnArr.map((column) => (
            <td className="titles" key={createKey(item, column)}>
              {renderTd(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
