import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from 'carbon-components-react';
import '../DataTable/DataTable.scss'
export const DataTables = () => {
    const rows = [
        {
            id: 'a',
            name: 'Load balancer 1',
            status: 'Disabled',
        },
        {
            id: 'b',
            name: 'Load balancer 2',
            status: 'Starting',
        },
        {
            id: 'c',
            name: 'Load balancer 3',
            status: 'Active',
        },
    ];

    const headers = [
        {
            key: 'name',
            header: 'Name',
        },
        {
            key: 'status',
            header: 'Status',
        },
    ];

    return (
        <div className='data-table'>
        <DataTable rows={rows} headers={headers}>
            {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <Table {...getTableProps()}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader {...getHeaderProps({ header })}>
                                    {header.header}
                                </TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow {...getRowProps({ row })}>
                                {row.cells.map((cell) => (
                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </DataTable>
        </div>
    )
}