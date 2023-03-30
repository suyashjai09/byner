
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
import { useEffect, useState, useContext } from 'react';
import { BaseURL } from '../../sdk/constant';
import { useJwt } from "react-jwt";
import { AuthContext } from '../../sdk/context/AuthContext';
import Loading from '@carbon/react/lib/components/Loading';
import { Loader } from '../../Components/Loader/Loader';
import { DataLoader } from '../../Components/Loader/DataLoder';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './UserList.scss'
const token = localStorage.getItem('token');
// const token="eyJraWQiOiJ3SGw5Yzg5cDhnQW80MlVSdVBYZW9CT1wvcVk5Y3ZobGNTWXBxbUlpXC9JQ2s9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJlNWIwN2EwYi04YzAwLTQwZDktYjZlMC01ZjNiMDM3M2U1YzciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9JV2JoN0JMcnoiLCJjbGllbnRfaWQiOiIxYm1wNjZiMjM1MnMzYzBic";
export const UserList = () => {

    const navigate = useNavigate();
    const [isDelete, setIsDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext)
    const { decodedToken, isExpired } = useJwt(token);
    const [rows, setRow] = useState([]);

    // console.log(jwt_decode(token),"token")

    // const parseJwt = async(token) => {        
    //     const decode = JSON.parse(atob(token));
    //     console.log(decode);
    //     if (decode.exp * 1000 < new Date().getTime()) {
    //         await authContext.signout();
    //         console.log('Time Expired');
    //         return;
    //     }
    // };

    const getUserList = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseURL}/list-users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            const res = await response.json();
            if (response.ok) {

                const result = res?.result.map((value, index) => ({
                    ...value,
                    id: index,
                }));
                setRow(result);
            }
            else if (response.status === 500) {

            }
            setLoading(false);


        }
        catch (e) {
            setLoading(false);

        }
    }

    useEffect(async() => {
        // if (isExpired) {
        //     await authContext.signout();
        //     return;
        // }
        // parseJwt();
        getUserList();
    }, [])

    const headers = [
        {
            header: 'Username',
            key: 'username'
        },
        {
            header: 'Fullname',
            key: 'fullName'
        },
        {
            header: 'Country',
            key: 'country'
        },
        {
            header: 'City',
            key: 'city'
        },
        {
            header: 'PostalCode',
            key: 'postalCode'
        },
        {
            header: 'State',
            key: 'state'
        },
        {
            header: 'Phonenumber',
            key: 'phoneNumber'
        }
    ];

    const deleteUser = async (filteredOrganisationId) => {
        try {
            if (isExpired) {
                authContext.signout();
                return;
            }
            setLoading(true);
            const response = await fetch(`${BaseURL}/list-users`, {
                method: 'DELETE',
                body: JSON.stringify({ accountIDs: filteredOrganisationId }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            const res = await response.json();
            if (response.ok) {

                const result = res?.result.map((value, index) => ({
                    ...value,
                    id: index,
                }));
                setRow(result);
            }
            else if (response.status === 500) {

            }
            setLoading(false);


        }
        catch (e) {
            setLoading(false);

        }
    }

    const handleDelete = (selectedRows) => {
        const tempArray = selectedRows.map(a => a.id);
        let filteredOrganisationId = rows?.filter(person => tempArray.includes(person.id)).map(a => a.organisationID);
        deleteUser(filteredOrganisationId);
    }
    
    return (
        <>
            {loading ? (
                <div className='loader-page'>
                    <DataLoader />
                </div>)
                :
                (
                    <div className='data-table'>
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
                                    <TableToolbar>
                                        <TableBatchActions {...getBatchActionProps()}>
                                            <TableBatchAction
                                                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                                // renderIcon={TrashCan}
                                                onClick={() => { handleDelete(selectedRows) }}
                                            >
                                                Delete
                                            </TableBatchAction>
                                            <TableBatchAction
                                                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                                                // renderIcon={Save}
                                                onClick={() => { }}
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
                                                className="button"
                                                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                                onClick={() => navigate('/adduser')}
                                                size="sm"
                                                kind="primary"
                                            >
                                                Add new user
                                            </Button>
                                            <Button
                                                className="button"
                                                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                                onClick={() => setIsDelete(!isDelete)}
                                                size="sm"
                                                kind="primary"
                                            >
                                                Delete user
                                            </Button>
                                        </TableToolbarContent>
                                    </TableToolbar>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {isDelete && <TableSelectAll {...getSelectionProps()} />}
                                                {headers.map((header) => (
                                                   
                                                    <TableHeader  {...getHeaderProps({ header, isSortable: true })}>
                                                        {header.header}
                                                    </TableHeader>
                                                ))}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow {...getRowProps({ row })}>
                                                    {isDelete && <TableSelectRow {...getSelectionProps({ row })} />}
                                                    {row.cells.map((cell, index) => (
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
        </>
    )
}