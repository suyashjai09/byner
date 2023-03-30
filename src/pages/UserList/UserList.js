
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
    Notification20, UserAvatar20, Switcher20, Search20,
    AppSwitcher20, User, Edit20
} from '@carbon/icons-react';
import {
    Form,
    Button,
    Heading,
} from '@carbon/react';
import {
    Link
} from 'carbon-components-react';
import {
    Checkbox,
} from '@carbon/react';
import { Search } from '@carbon/icons-react';
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
import { EditUser } from '../EditUser/EditUser';

export const UserList = () => {

    const token = localStorage.getItem('token');
    // const token = "eyJraWQiOiJ3SGw5Yzg5cDhnQW80MlVSdVBYZW9CT1wvcVk5Y3ZobGNTWXBxbUlpXC9JQ2s9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJlNWIwN2EwYi04YzAwLTQwZDktYjZlMC01ZjNiMDM3M2U1YzciLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9JV2JoN0JMcnoiLCJjbGllbnRfaWQiOiIxYm1wNjZiMjM1MnMzYzBic2xsOGM1cWZkOSIsIm9yaWdpbl9qdGkiOiJmZWFlYjI5My01Yjg3LTRhMmEtODdlNy05NjY2NzM3YTM0YjAiLCJldmVudF9pZCI6IjQxNjAwODA4LWU2MTAtNDU1Yy1iZTlkLTVhZjM0Y2U0NGJiOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODAxNTUxMjksImV4cCI6MTY4MDE1ODcyOSwiaWF0IjoxNjgwMTU1MTI5LCJqdGkiOiI2NjljNjk4NC00OTcxLTRlNTMtYjFkOC1iZTNlODJhNjFiNjQiLCJ1c2VybmFtZSI6ImU1YjA3YTBiLThjMDAtNDBkOS1iNmUwLTVmM2IwMzczZTVjNyJ9.BTN2sIzQ84oxaXTjDUlShiA1-Phy9iB-XbjqODJvJCic_iGTD2FyaIF1PnkzLUG5ugem-J7eWEuVoUqPKRpQRP4Ey6Y0ItR6qA6ed4F1XqoZWynQy62Nm-KOb-V5tQcXQ0Z3CST6axbhr5e730FxUgHyuQZEIyOUHA5kJ5UjRyR7RHk8pMsppo2DbSnDvrWdSHNmA7CqpTefPbqqQ4YLNNkul-3BIJuEiNJ9WK4fur3grO7ZMogsTd0sga22Jx4uwCTMCIdKBpaS0aWOPKl3cunGDSXP0cluqdFfkDRa5fdvkBNI6_YJCMDiTgv0lSpQhYKvfG5UXOsYbEmj42-4Fg";
    const navigate = useNavigate();
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext)
    const [rows, setRow] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [isUserDetailEdit, setIsEditUserDetail] = useState(false);

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
            

            if (response.ok) {
                const res = await response.json();
                const result = res?.result.map((value, index) => ({
                    ...value,
                    id: index,
                }));
                setRow(result);
            }
            setLoading(false);
        }
        catch (e) {
            console.log(e.response,"error");
            debugger;
            // await authContext.signout();
            setLoading(false);
        }
    }

    useEffect(async () => {
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

    const handleUserEdit = (index) => {

        const userEdit = {
            username: rows[index]?.username,
            fullName: rows[index]?.fullName,
            country: rows[index]?.country,
            addressLine: rows[index]?.addressLine,
            addressLine2: rows[index]?.addressLine2,
            city: rows[index]?.city,
            postalCode: rows[index]?.postalCode,
            state: rows[index]?.state,
            phoneNumber: rows[index]?.phoneNumber,
            organisationId: rows[index]?.organisationID,
            organisationAccount: rows[index]?.organisationAccount
        }
        setUserDetails(userEdit);
        setIsEditUserDetail(true);
        console.log(index,userEdit);
    }

    const deleteUser = async (filteredOrganisationId) => {
        try {
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
            console.log(e,"error");
            setLoading(false);
            await authContext.signout();

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
                    <>
                        {isUserDetailEdit ? (
                            <div>
                                <EditUser userDetails={userDetails}/>
                            </div>
                        ) : (
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
                                                    <Button
                                                        className="button"
                                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                                        onClick={() => setIsEdit(!isEdit)}
                                                        size="sm"
                                                        kind="primary"
                                                    >
                                                        Edit user
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
                                                        {isEdit && <TableHeader />}

                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {rows.map((row, index) => (
                                                        <TableRow {...getRowProps({ row })}>
                                                            {isDelete && <TableSelectRow {...getSelectionProps({ row })} />}
                                                            {row.cells.map((cell) => (
                                                                <TableCell key={cell.id}>{cell.value}</TableCell>

                                                            ))}
                                                            {isEdit && <TableCell style={{cursor:'pointer'}} onClick={() => { handleUserEdit(row.id) }}>{<Edit20/>}</TableCell>}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </DataTable>
                            </div>)
                        }
                    </>
                )
            }
        </>
    )
}