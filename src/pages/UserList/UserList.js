
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    TableToolbar,
    TableBatchActions,
    TableBatchAction,
    TableToolbarSearch,
    TableToolbarMenu,
    TableToolbarContent,
    TableToolbarAction,
    TableSelectAll,
    TableSelectRow,
} from 'carbon-components-react';
import {
    Form,
    Button,
    Heading,
} from '@carbon/react';
import {
    Link
} from 'carbon-components-react';
import { useState } from 'react';

export const UserList = () => {

    const [isDelete, setIsDelete] = useState(false);
    const headers = [
        {
            header: 'Name',
            key: 'name'
        },
        {
            header: 'Protocol',
            key: 'protocol'
        },
        {
            header: 'Port',
            key: 'port'
        },
        {
            header: 'Rule',
            key: 'rule'
        },
        {
            header: 'Attached groups',
            key: 'attached_groups'
        },
        {
            header: 'Status',
            key: 'status'
        }
    ];
    const rows = [
        {
            attached_groups: 'Kevin’s VM Groups',
            id: 'a',
            name: 'Load Balancer 3',
            port: 3000,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link disabled>Disabled</Link>
        },
        {
            attached_groups: 'Maureen’s VM Groups',
            id: 'b',
            name: 'Load Balancer 1',
            port: 443,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link>Starting</Link>
        },
        {
            attached_groups: 'Andrew’s VM Groups',
            id: 'c',
            name: 'Load Balancer 2',
            port: 80,
            protocol: 'HTTP',
            rule: 'DNS delegation',
            status: <Link>Active</Link>
        },
        {
            attached_groups: 'Marc’s VM Groups',
            id: 'd',
            name: 'Load Balancer 6',
            port: 3000,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link disabled>Disabled</Link>
        },
        {
            attached_groups: 'Mel’s VM Groups',
            id: 'e',
            name: 'Load Balancer 4',
            port: 443,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link>Starting</Link>
        },
        {
            attached_groups: 'Ronja’s VM Groups',
            id: 'f',
            name: 'Load Balancer 5',
            port: 80,
            protocol: 'HTTP',
            rule: 'DNS delegation',
            status: <Link>Active</Link>
        }
    ];

    return (
        <div className='data-table'>
            {/* <DataTable rows={rows} headers={headers}>
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
        </DataTable> */}
            <DataTable rows={rows} headers={headers}>
                {({
                    rows,
                    headers,
                    getHeaderProps,
                    getRowProps,
                    getSelectionProps,
                    getBatchActionProps,
                    onInputChange,
                    selectedRows,
                }) => (
                    <TableContainer>
                        <div>{console.log(getSelectionProps(),"test")}</div>
                        <TableToolbar>
                            <TableBatchActions {...getBatchActionProps()}>
                                <TableBatchAction
                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                    // renderIcon={TrashCan}
                                    onClick={() => console.log(getSelectionProps(),selectedRows)}
                                >
                                    Delete
                                </TableBatchAction>
                                <TableBatchAction
                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                    // renderIcon={Save}
                                    onClick={() => console.log('clicked')}
                                >
                                    Save
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch
                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                    onChange={onInputChange}
                                />
                                <Button
                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                    onClick={() => console.log('clicked')}
                                    size="small"
                                    kind="primary"
                                >
                                    Add new
                                </Button>
                                <Button
                                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                    onClick={() => setIsDelete(true)}
                                    size="small"
                                    kind="primary"
                                >
                                    Delete
                                </Button>
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {isDelete && <TableSelectAll {...getSelectionProps()} />}
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
                                        {isDelete && <TableSelectRow {...getSelectionProps({ row })} />}
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DataTable>
        </div>
    )
}