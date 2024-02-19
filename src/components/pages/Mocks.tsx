import MockItem from '../shared/MockItem';

export default function Mocks() {
  const solutions = ['lithic', 'solaris', 'avidxchange', 'b4b', 'citi', 'concur', 'column', 'eurocard', 'schumann'];

  return (
    <div>
      <table>
        <tr>
          <th>Partner</th>
          <th>Is mocked</th>
        </tr>
        <tbody>
          <tr>
            <td colSpan={2}>
              {solutions.map((solution) => (
                <MockItem partner={solution} key={solution} />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
