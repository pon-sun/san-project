import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, InputLabel, FormControl, Select, MenuItem, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { Card } from 'react-bootstrap';
import { SelectChangeEvent } from '@mui/material/Select';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import Header from '../../layouts/header/header';
import PrintIcon from '@mui/icons-material/Print';
import { Slider } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ViewService from '../../data/services/san_search/viewpage/view_api_service';
import { Country, List, Program, All, Customer, CustomerRequest, Address, IdentificationData, AliasesData, PlaceOfBirthData, NationalityData, Birthdate, DetailsData, SearchDTO, RecordDTO, logicalIdentification, logicaAddress, LogicalDetails, Logicalcitiy, LogicalBirthDetails, LogicalAKADetails, GroupAliases, GroupIdentification, CityDetails, UnDetails, UnAliases, UnDesignationDetails } from '../../data/services/san_search/viewpage/view_payload';
import './Details.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchApiService from '../../data/services/san_search/search-api-service';
import { Timeline, TimelineItem, TimelineContent, TimelineDot, TimelineSeparator, TimelineConnector } from '@mui/lab';
import { useSelector } from 'react-redux';
import HitdatalifecycleApiService from '../../data/services/san_search/hitdatalifecycle/hitdatalifecycle-api-service';
import HitcaseApiService from '../../data/services/san_search/hitcase/hitcase-api-service';


interface Status {
    id: string;
    name: string;
    // Add other properties if necessary
}
function Details() {
    const userDetails = useSelector((state: any) => state.loginReducer);
    const userFirstName = userDetails.userData?.firstName;
    const loginDetails = userDetails.loginDetails;
    const userId = loginDetails.uid;

    const location = useLocation();
    const { id, ids } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RecordDTO>({
        ids: 0,
        name: '',
        address: '',
        program: '',
        entityType: '',
        list: '',
        score: 0,
        fileType: 0,
        fileList: '',
        criminalId: '',
        searchId: '',
        hitId: '',
    });

    const [countryData, setcountryData] = useState<Customer>({
        id: 0,
        city: '',
        State: '',
    });

    const [RecordType, setRecordType] = useState<All[]>([
    ]);

    const viewservice = new ViewService();
    const [selectedRecordType, setSelectedRecordType] = useState(0);
    const [Program, setProgram] = useState<Program[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<string>('');
    const [List, setList] = useState<List[]>([]);
    const [selectedList, setSelectedList] = useState(0);
    const [country, setCountry] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [filteredData, setFilteredData] = useState<RecordDTO[]>([]);
    const [searchError, setSearchError] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(100);
    const [data, setData] = useState<RecordDTO[]>([
    ]);
    const [address, setaddress] = useState<Address[]>([
    ]);
    const [identification, setIdentification] = useState<IdentificationData[]>([
    ]);
    const [aliases, setAliases] = useState<AliasesData[]>([
    ]);
    const [details, setdetails] = useState<DetailsData[]>([
    ]);
    const [sortedColumn, setSortedColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showModal, setShowModal] = useState(false);
    const [showModallogical, setShowModallogical] = useState(false);
    const [showModalgroup, setShowModalgroup] = useState(false);
    const [showModalun, setShowModalun] = useState(false);

    const [selectedSearchDetails, setSelectedSearchDetails] = useState<string>(''); // Initialize with an appropriate default value
    const [logicaldetails, setLogicaldetails] = useState<LogicalDetails[]>([
    ]);
    const [logicalcitiy, setLogicalcitiy] = useState<Logicalcitiy[]>([
    ]);
    const [logicalBirthDetails, setLogicalBirthDetails] = useState<LogicalBirthDetails[]>([
    ]);
    const [logicalidentification, setLogicalIdentification] = useState<logicalIdentification[]>([
    ]);
    const [logicalAddress, setLogicalAddress] = useState<logicaAddress[]>([
    ]);
    const [logicalAka, setLogicalAka] = useState<LogicalAKADetails[]>([
    ]);
    const [Groupaliases, setGroupaliases] = useState<GroupAliases[]>([
    ]);
    const [CityDetails, setCityDetails] = useState<CityDetails[]>([]);
    const [groupidentification, setGroupIdentification] = useState<GroupIdentification[]>([
    ]);
    const [UnDetails, setUnDetails] = useState<UnDetails[]>([]);
    const [Unaliases, setUnaliases] = useState<UnAliases[]>([
    ]);
    const [UnDesignationDetails, setUnDesignationDetails] = useState<UnDesignationDetails[]>([
    ]);
    const [statusData, setStatusData] = useState<Status[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedActions, setSelectedActions] = useState<{ [key: number]: string }>({});
    const [remarksAndActions, setRemarksAndActions] = useState<{ action: string; remarks: string }[]>([]);

    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [selectedCourierTracker, setSelectedCourierTracker] = useState<any | null>(null); // State to store the selected courier tracker
    const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [selectedRow, setSelectedRow] = useState<number | null>(null); // Initialize with null or -1 if no row is selected
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchCountry();
        fetchList();
        fetchProgram();
        fetchAll();
        fetchAddresses();
        fetchIdentification();
        fetchAliases();
        fetchDetails();
        fetchiden();
        fetchaddress();
        fetchadetails();
        fetchacitiy();
        fetchBirthDetails();
        fetchAka();
        fetchaliase();
        fetchanationalid();
        fetchCityDetails();
        fetchUnDetails();
        fetchunaliase();
        fetchundesingation();
        fetchStatus();


    }, [ids]);


    const fetchCountry = async () => {
        try {
            const countryData = await viewservice.getCountryList();
            setCountry(countryData);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchList = async () => {
        try {
            const ListData = await viewservice.getList();
            setList(ListData);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchProgram = async () => {
        try {
            const ProgramData = await viewservice.getProgram();
            setProgram(ProgramData);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchAll = async () => {
        try {
            const AllData = await viewservice.getAll();
            setRecordType(AllData);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchAddresses = async () => {
        try {
            const Address = await viewservice.getAddresses(id);
            setaddress(Address);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchAliases = async () => {
        try {
            const aliases = await viewservice.getAliases(id);
            setAliases(aliases);
        } catch (error) {
            console.error("Error fetching aliases list:", error);
        }
    };

    const fetchIdentification = async () => {
        try {
            const identification = await viewservice.getIdentification(id);
            setIdentification(identification);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchDetails = async () => {
        try {
            const details = await viewservice.getDetails(id);
            setdetails(details);
        } catch (error) {
            console.error("Error fetching the details:", error);
        }
    };
    const fetchiden = async () => {
        try {
            const Address = await viewservice.getLogicalIdentification(id);
            setLogicalIdentification(Address);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchaddress = async () => {
        try {
            const Address = await viewservice.getLogicalAddress(id);
            setLogicalAddress(Address);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchadetails = async () => {
        try {
            const Address = await viewservice.getLogicaldetails(id);
            setLogicaldetails(Address);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchacitiy = async () => {
        try {
            const Address = await viewservice.getLogicalcity(id);
            setLogicalcitiy(Address);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchBirthDetails = async () => {
        try {
            const Address = await viewservice.getLogicalBirthDetails(id);
            setLogicalBirthDetails(Address);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchAka = async () => {
        try {
            const Address = await viewservice.getLogicalAka(id);
            setLogicalAka(Address);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchaliase = async () => {
        try {
            const Groupaliases = await viewservice.getGroupAliases(id);
            setGroupaliases(Groupaliases);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchCityDetails = async () => {
        try {
            const CityDetails = await viewservice.getGroupCityDetails(id);
            setCityDetails(CityDetails);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchanationalid = async () => {
        try {
            const groupidentification = await viewservice.getGroupIdentification(id);
            setGroupIdentification(groupidentification);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchUnDetails = async () => {
        try {
            const UnDetails = await viewservice.getUnDetails(id);
            setUnDetails([UnDetails]);
            console.log('UnDetails:', UnDetails); // Log data to check structure
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };
    const fetchunaliase = async () => {
        try {
            const Unaliases = await viewservice.getUnAliases(id);
            setUnaliases(Unaliases);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const fetchundesingation = async () => {
        try {
            const UnDesignationDetails = await viewservice.getUnDesignationDetailss(id);
            setUnDesignationDetails(UnDesignationDetails);
        } catch (error) {
            console.error("Error fetching country list:", error);
        }
    };

    const handleRecordTypeChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value;
        setSelectedRecordType(typeof value === 'string' ? parseInt(value) : value);
    };

    const handleListChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value;
        setSelectedList(typeof value === 'string' ? parseInt(value) : value);
    };

    const handleCountryChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value;
        setSelectedCountry(typeof value === 'string' ? parseInt(value) : value);
    };

    const handleKeyPress = (e: { key: string }) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSort = (columnName: string) => {
        if (columnName === sortedColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(columnName);
            setSortDirection('asc');
        }
    };

    const sortedData = (filteredData ?? []).length > 0 ? filteredData.sort((a, b) => {
        const valueA = String(a[sortedColumn as keyof RecordDTO]);
        const valueB = String(b[sortedColumn as keyof RecordDTO]);
        if (valueA && valueB) {
            return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return 0;
        }
    }) : [];

    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            if (!formData.name && !formData.address && sliderValue === 100) {
                setSearchError(true);
                setFilteredData([]);
                setLoading(false);
                return;
            }
            const searchDTO: SearchDTO = {
                name: formData.name,
                matching_score: sliderValue,
                listID: selectedList,
                partySubTypeID: selectedRecordType,
                countryId: selectedCountry,
            };
            const filtered = await viewservice.getRecordsCount(searchDTO);
            console.log('Filtered Data:', filtered);
            if (Array.isArray(filtered) && filtered.length > 0) {
                setFilteredData(filtered);
                setSearchError(false);
            } else {
                setSearchError(true);
                setFilteredData([]);
            }
            console.log('setFilteredData:', setFilteredData);
        } catch (error) {
            console.error("Error fetching lookup data:", error);
            setSearchError(true);
            setFilteredData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({ ids: 0, name: '', address: '', entityType: '', program: '', list: '', score: 0, fileType: 0, fileList: '', searchId: '', hitId: '', criminalId: '' });
        setFilteredData([]);
        setSliderValue(100);
        setSearchError(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const exportToExcel = () => {
        try {

            const dataForExport = filteredData.map((row) => ({
                FileList: row.fileList,
                Name: row.name,
                Address: row.address,
                Type: row.entityType,
                Program: row.program,
                List: row.list,
                Score: row.score
            }));
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(dataForExport);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Lookup Results");
            XLSX.writeFile(workbook, "lookup_results.xlsx");
        } catch (error) {
            console.error("Error exporting data to Excel:", error);
        }
    };

    const allValues = RecordType.map((item) => item.type_text).join(", ");


    const handleTableRowClick = async (ids: number, fileType: number) => {
        const id = String(ids);
        console.log('Clicked row id:', id); // Check if id is correctly logged

        if (fileType === 1) {
            setShowModal(true);

            try {

                const detailsData = await viewservice.getDetails(id);
                setdetails(detailsData);

                const identificationData = await viewservice.getIdentification(id);
                setIdentification(identificationData);

                const aliasesData = await viewservice.getAliases(id);
                setAliases(aliasesData);

                const addressData = await viewservice.getAddresses(id);
                setaddress(addressData);

            } catch (error) {
                console.error("Error fetching details:", error);
            }


        } else if (fileType === 2) {
            setShowModallogical(true);



            try {

                // Fetch detailed information based on selected ID
                const logicalidentification = await viewservice.getLogicalIdentification(id);
                setLogicalIdentification(logicalidentification);

                const logicalAddress = await viewservice.getLogicalAddress(id);
                setLogicalAddress(logicalAddress);

                const logicaldetails = await viewservice.getLogicaldetails(id);
                setLogicaldetails(logicaldetails);

                const logicalcitiy = await viewservice.getLogicalcity(id);
                setLogicalcitiy(logicalcitiy);
                const logicalBirthDetails = await viewservice.getLogicalBirthDetails(id);
                setLogicalBirthDetails(logicalBirthDetails);
                const logicalAka = await viewservice.getLogicalAka(id);
                setLogicalAka(logicalAka);

            } catch (error) {
                console.error("Error fetching details:", error);
            }

        } else if (fileType === 3) {

            setShowModalgroup(true);

            try {
                // Fetch detailed information based on selected ID
                const Groupaliases = await viewservice.getGroupAliases(id);
                setGroupaliases(Groupaliases);

                const CityDetails = await viewservice.getGroupCityDetails(id);
                setCityDetails(CityDetails);
                const groupidentification = await viewservice.getGroupIdentification(id);
                setGroupIdentification(groupidentification);

            } catch (error) {
                console.error("Error fetching details:", error);
            }
        }
        else if (fileType === 4) {

            setShowModalun(true);

            try {
                // Fetch detailed information based on selected ID
                const UnDetails = await viewservice.getUnDetails(id);
                setUnDetails([UnDetails]);

                const Unaliases = await viewservice.getUnAliases(id);
                setUnaliases(Unaliases);
                const UnDesignationDetails = await viewservice.getUnDesignationDetailss(id);
                setUnDesignationDetails(UnDesignationDetails);

            } catch (error) {
                console.error("Error fetching details:", error);
            }
        }
    }



    const handleCloseModal = () => {
        setShowModal(false);

    };
    const handleCloseModallogical = () => {
        setShowModallogical(false);

    };
    const handleCloseModalgroup = () => {
        setShowModalgroup(false);

    };
    const handleCloseModalun = () => {
        setShowModalun(false);

    };
    const authApiService = new SearchApiService();
    const hitdatalifecycleApiService = new HitdatalifecycleApiService();
    const hitcaseApiService = new HitcaseApiService();
    const fetchStatus = async () => {
        try {
            const statuses: Status[] = await authApiService.getStatus(); // Specify the type as Status[]

            // Filter the statuses to keep only "close" and "Escalation" (matching the actual case)
            const filteredStatuses = statuses.filter((status: Status) => {
                return status.name === "close" || status.name === "Escalation";
            });

            console.log(filteredStatuses); // Add this line to check the filtered statuses
            setStatusData(filteredStatuses); // Update the statusData state with the filtered results
        } catch (error) {
            console.error("Error fetching statuses:", error);
        }
    };
    const handleCloseRemarksDialog = () => {
        console.log('Closing remarks dialog.');

        setIsRemarksDialogOpen(false);
        setSelectedAction(null);
        setRemarks('');
    };


    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setSelectedStatus(event.target.value);
    };

    const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemarks(event.target.value);
    };

    const handleIconClick = (row: number) => {
        const currentIndex = page * rowsPerPage + row;
        const existingAction = selectedActions[currentIndex] || '';
        const existingRemarks = remarksAndActions[currentIndex]?.remarks || '';

        setSelectedStatus(existingAction);
        setRemarks(existingRemarks);
        setSelectedRow(currentIndex);
        setIsRemarksDialogOpen(true);
    };




    const getStatusName = (action: string) => {
        const status = statusData.find((status) => status.id === action);

        if (status) {
            // Define a mapping from status ID to CSS class
            const statusClassMap: { [key: string]: string } = {
                '1': 'green-text', // Assuming '1' corresponds to 'Closed'
                '2': 'red-text',   // Assuming '2' corresponds to 'Escalation'
                '3': 'yellow-text', // Assuming '3' corresponds to 'Request For Information'
            };

            const statusClass = statusClassMap[status.id];

            if (statusClass) {
                return (
                    <span className={statusClass}>
                        {status.name}
                    </span>
                );
            } else {
                // If the status ID doesn't match any of the defined classes, return the status name as is
                return status.name;
            }
        } else {
            return ''; // Handle cases where the status is not found
        }
    };
    const handleRemarksSubmit = async () => {
        try {
            if (selectedRow !== null && selectedRow >= 0 && selectedRow < filteredData.length) {
                const updatedRemarksAndActions = [...remarksAndActions];
                updatedRemarksAndActions[selectedRow] = { action: selectedStatus, remarks };

                setRemarksAndActions(updatedRemarksAndActions);

                const selectedSearchResult = filteredData[selectedRow];
                console.log("selectedRow:", selectedRow);
                console.log("filteredData:", filteredData);

                if (!selectedSearchResult) {
                    console.error("Selected search result is undefined");
                    alert("Selected search result is undefined. Check console for more details.");
                    return;
                }

                alert(JSON.stringify(selectedSearchResult)); // Display the selectedSearchResult in an alert

                if (selectedSearchResult) {
                    const hitdatalifecyclePayload = {
                        searchId: selectedSearchResult.searchId,
                        criminalId: selectedSearchResult.ids.toString(),  // Convert ids value to string

                        statusId: selectedStatus,
                        remark: remarks,
                        hitId: selectedSearchResult.hitId,
                        levelId: '1',
                        caseId: '0',
                        uid: userId
                    };

                    const hitcasePayload = {
                        display: '-',
                        searchId: selectedSearchResult.searchId,
                        hitId: selectedSearchResult.hitId,
                        criminalId: selectedSearchResult.ids.toString(),  // Convert ids value to string

                        levelId: '1',
                        statusNowId: selectedStatus,
                        cycleId: '1',
                        remark: remarks,
                        uid: userId
                    };

                    console.log("hitdatalifecycle Payload:", hitdatalifecyclePayload);
                    console.log("hitCasePayload:", hitcasePayload);

                    if (parseInt(selectedStatus) == 1) {
                        await hitdatalifecycleApiService.CreateHitdatalifecycle(hitdatalifecyclePayload);
                    } else if (parseInt(selectedStatus) == 2) {
                        alert(hitcasePayload.criminalId);
                        await hitcaseApiService.CreateHitCaseInsert(hitcasePayload);
                    }
                }

                setSelectedActions({
                    ...selectedActions,
                    [selectedRow]: selectedStatus,
                });

                setIsRemarksDialogOpen(false);
            } else {
                console.error("Selected row is null, invalid, or out of bounds");
            }
        } catch (error) {
            console.error("Error submitting remarks:", error);
        }
    };





    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box m={2} style={{ marginTop: '5%' }}>
                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>

                            <div className="card-body" style={{ border: '1px solid black' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4>LOOK UP</h4>
                                    <Button variant="contained" color="primary" onClick={handlePrint}>
                                        <PrintIcon />
                                    </Button>
                                </div>
                                <br></br>
                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={2}>
                                            <FormControl style={{ width: '100%' }}>
                                                <InputLabel htmlFor="record-type">Type</InputLabel>
                                                <Select
                                                    label="Type"
                                                    size='small'
                                                    variant="outlined"
                                                    value={selectedRecordType}
                                                    onChange={handleRecordTypeChange}
                                                >
                                                    <MenuItem value={0}>All</MenuItem>
                                                    {RecordType.map((item) => (
                                                        <MenuItem key={item.partyTypeID} value={parseInt(item.partyTypeID)}>
                                                            {item.type_text}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <TextField
                                                style={{ width: '100%' }}
                                                label="Name"
                                                id="Name"
                                                size='small'
                                                variant="outlined"
                                                type="text"
                                                name="name"
                                                autoComplete="off"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            {List.length > 0 && (
                                                <FormControl style={{ width: '100%' }}>
                                                    <InputLabel htmlFor="record-type">List</InputLabel>
                                                    <Select
                                                        label="List"
                                                        size='small'
                                                        variant="outlined"
                                                        value={selectedList}
                                                        onChange={handleListChange}
                                                    >
                                                        <MenuItem value={0}>All</MenuItem>
                                                        {List.map((item) => (
                                                            <MenuItem key={item.primaryKey} value={item.primaryKey}>
                                                                {item.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {country.length > 0 && (
                                                <FormControl style={{ width: '100%' }}>
                                                    <InputLabel htmlFor="record-type">Country</InputLabel>
                                                    <Select
                                                        label="Country"
                                                        size='small'
                                                        variant="outlined"
                                                        value={selectedCountry}
                                                        onChange={handleCountryChange}
                                                    >
                                                        <MenuItem value={0}>All</MenuItem>
                                                        {country.map((item) => (
                                                            <MenuItem key={item.primaryKey} value={item.primaryKey}>
                                                                {item.text}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Slider
                                                style={{ width: '90%' }}
                                                value={sliderValue}
                                                onChange={(e, newValue) => setSliderValue(newValue as number)}
                                                aria-labelledby="discrete-slider"
                                                step={1}
                                                marks
                                                min={50}
                                                max={100}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                style={{ width: '55px' }}
                                                id="max-score"
                                                size='small'
                                                variant="outlined"
                                                type="text"
                                                name="maxScore"
                                                autoComplete="off"
                                                value={sliderValue.toString()}
                                                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} justifyContent="center" >
                                        <Grid item xs={4}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={5}>
                                                    <br />
                                                    <Button variant="contained" onClick={handleSearch} onKeyPress={handleKeyPress} >Search</Button>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <br />
                                                    <Button variant="contained" onClick={handleReset}>Reset</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                                <br />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4>LOOKUP RESULTS {filteredData.length > 0 && `(${filteredData.length})`}</h4>

                                    <Button
                                        variant="contained"
                                        onClick={exportToExcel}
                                        style={{ padding: '8px 16px' }}
                                    >
                                        <FileDownloadIcon />
                                    </Button>
                                </div>
                                <br></br>
                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                    <Grid item xs={12}>
                                        <TableContainer className="table-container" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white', width: '10%' }} onClick={() => handleSort('fileList')}>
                                                            File List {sortedColumn === 'fileList' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }} onClick={() => handleSort('name')}>
                                                            Name {sortedColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }} onClick={() => handleSort('address')}>
                                                            Address {sortedColumn === 'address' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }} onClick={() => handleSort('typeId')}>
                                                            Type {sortedColumn === 'typeId' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }} onClick={() => handleSort('programId')}>
                                                            Program {sortedColumn === 'programId' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }} onClick={() => handleSort('listId')}>
                                                            List {sortedColumn === 'listId' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }} onClick={() => handleSort('score')}>
                                                            Score {sortedColumn === 'score' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell>
                                                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Action</TableCell>
                                                        {/* <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }} onClick={() => handleSort('score')}>
                                                            File Type {sortedColumn === 'score' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                        </TableCell> */}
                                                    </TableRow>
                                                </TableHead>
                                                {/* 
                                                <TableBody>
                                                    {loading && (
                                                        <TableRow>
                                                            <TableCell colSpan={6} align="center">
                                                                <Typography variant="body1">Loading...</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}

                                                    {!loading && filteredData.length > 0 && filteredData.map((row) => (
                                                        
                                                        <TableRow key={row.ids} >
                                                            <TableCell>{row.fileList}</TableCell>
                                                            <TableCell
                                                                onClick={() => handleTableRowClick(row.ids, row.fileType)}
                                                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                                            >
                                                                {row.name}
                                                            </TableCell>

                                                            <TableCell >{row.address}</TableCell>
                                                            <TableCell >{row.entityType}</TableCell>
                                                            <TableCell >{row.program}</TableCell>
                                                            <TableCell >{row.list}</TableCell>
                                                            <TableCell>{row.score}</TableCell>
                                                            <TableCell>
                                                                <IconButton onClick={() => handleIconClick(row.ids)} style={{ padding: '1px 1px' }}>
                                                                    {selectedAction ? (
                                                                        <VisibilityOffIcon style={{ color: 'red' }} /> // Red color for 'VisibilityOffIcon'
                                                                    ) : (
                                                                        <VisibilityIcon style={{ color: 'green' }} /> // Green color for 'VisibilityIcon'
                                                                    )}
                                                                </IconButton>


                                                                {selectedAction && (
                                                                    <span>{getStatusName(selectedAction)}</span>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {searchError && (
                                                        <Typography variant="body2" color="error" style={{ textAlign: 'center', marginTop: '10px' }}>
                                                            {filteredData.length === 0 ? "Your search has not returned any results." : "At least one search parameter is required."}
                                                        </Typography>
                                                    )}
                                                </TableBody> */}
                                                <TableBody>
                                                    {loading && (
                                                        <TableRow>
                                                            <TableCell colSpan={8} align="center">
                                                                <Typography variant="body1">Loading...</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}

                                                    {!loading && filteredData.length > 0 && filteredData.map((row, index) => {
                                                        const currentIndex = page * rowsPerPage + index;
                                                        const selectedAction = selectedActions[currentIndex] || '';
                                                        return (
                                                            <React.Fragment key={row.ids}>
                                                                <TableRow key={row.ids}>
                                                                    <TableCell>{row.fileList}</TableCell>
                                                                    <TableCell
                                                                        onClick={() => handleTableRowClick(row.ids, row.fileType)}
                                                                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                                                    >
                                                                        {row.name}
                                                                    </TableCell>
                                                                    <TableCell>{row.address}</TableCell>
                                                                    <TableCell>{row.entityType}</TableCell>
                                                                    <TableCell>{row.program}</TableCell>
                                                                    <TableCell>{row.list}</TableCell>
                                                                    <TableCell>{row.score}</TableCell>
                                                                    <TableCell>
                                                                        <IconButton onClick={() => handleIconClick(index)} style={{ padding: '1px 1px' }}>
                                                                            {selectedAction ? (
                                                                                <VisibilityOffIcon style={{ color: 'red' }} />
                                                                            ) : (
                                                                                <VisibilityIcon style={{ color: 'green' }} />
                                                                            )}
                                                                        </IconButton>
                                                                        {selectedAction && (
                                                                            <span>{getStatusName(selectedAction)}</span>
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </React.Fragment>
                                                        );
                                                    })}

                                                    {/* {filteredData.length === 0 && (
                                                        <TableRow>
                                                            <TableCell colSpan={8} align="center">
                                                                <Typography variant="body1">Your search has not returned any results.</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )} */}

                                                    {searchError && (
                                                        <Typography variant="body2" color="error" style={{ textAlign: 'center', marginTop: '10px' }}>
                                                            {filteredData.length === 0 ? "Your search has not returned any results." : "At least one search parameter is required."}
                                                        </Typography>
                                                    )}
                                                </TableBody>


                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Card>
                            </div>
                        </Card>
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={isRemarksDialogOpen}
                onClose={handleCloseRemarksDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogActions>
                    <Button onClick={handleCloseRemarksDialog} color="primary">

                        <ClearIcon />
                    </Button>
                </DialogActions>
                {selectedCourierTracker && (

                    <Timeline position="left" style={{ marginRight: '50%' }}>
                        <TimelineItem>
                            <TimelineContent>{selectedCourierTracker.name}</TimelineContent>

                            <TimelineSeparator>
                                <TimelineDot style={{ background: 'blue' }} />
                                <TimelineConnector style={{ background: 'blue' }} />
                            </TimelineSeparator>
                            <TimelineContent color="text.secondary">Name</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineContent>{selectedCourierTracker.matchingScore}</TimelineContent>

                            <TimelineSeparator>
                                <TimelineDot style={{ background: 'blue' }} />
                                <TimelineConnector style={{ background: 'blue' }} />
                            </TimelineSeparator>
                            <TimelineContent color="text.secondary">Matching Score</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineContent>{selectedCourierTracker.hitId}</TimelineContent>
                            <TimelineSeparator>
                                <TimelineDot style={{ background: 'blue' }} />
                                <TimelineConnector style={{ background: 'blue' }} />
                            </TimelineSeparator>
                            <TimelineContent color="text.secondary">hitId</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineContent>{selectedCourierTracker.searchId}</TimelineContent>
                            <TimelineSeparator>
                                <TimelineDot style={{ background: 'blue' }} />
                                <TimelineConnector style={{ background: 'blue' }} />
                            </TimelineSeparator>
                            <TimelineContent color="text.secondary">searchId</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineContent>{selectedCourierTracker.remark}</TimelineContent>
                            <TimelineSeparator >
                                <TimelineDot style={{ backgroundColor: 'green' }} />
                                {/* <TimelineConnector style={{ backgroundColor: 'green' }} /> */}
                            </TimelineSeparator>
                            <TimelineContent color="text.secondary">Remark</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                )}

                <DialogTitle>Enter Remarks</DialogTitle>
                <DialogContentText style={{ textAlign: 'center' }}>
                    Select a status and enter remarks for this employee.
                </DialogContentText>
                <DialogContent>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth variant="outlined" margin="dense">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label="Status"
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                >
                                    <MenuItem value="">Select Status</MenuItem>
                                    {statusData.map((status) => (
                                        <MenuItem key={status.id} value={status.id}>
                                            {status.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                    </Grid>
                    {selectedStatus && (
                        <div>
                            <DialogContentText style={{ textAlign: 'center' }}>
                                Enter your remarks for this action.
                            </DialogContentText>

                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="outlined-multiline-static"
                                        label="Remarks"
                                        type="text"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={remarks}
                                        defaultValue="Default Value"
                                        onChange={handleRemarksChange}
                                    />

                                </Grid>
                            </Grid>

                        </div>
                    )}
                </DialogContent>
                <DialogActions>


                    <Button onClick={handleRemarksSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showModal} onClose={handleCloseModal} fullScreen
                maxWidth="md">

                <DialogContent >
                    <Box sx={{ display: 'flex' }}>
                        <Header />


                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                            <Box m={2} >
                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                    <div className="card-body" >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4>DETAILS:</h4>
                                            <Button variant="contained" color="primary" onClick={handlePrint}>
                                                <PrintIcon />
                                            </Button>
                                        </div>
                                        <br></br>
                                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>

                                            <Grid container spacing={2} justifyContent="space-between">

                                                <Grid item xs={3}>
                                                    {details.slice(0, Math.ceil(details.length / 3)).map((details, index) => (
                                                        <p key={index}><b>{details.heading} {details.heading.includes(':') ? '' : ':'}</b> {details.val}</p>
                                                    ))}
                                                </Grid>
                                                {/* Middle */}
                                                <Grid item xs={3}>
                                                    {details.slice(Math.ceil(details.length / 3), Math.ceil(2 * details.length / 3)).map((details, index) => (
                                                        <p key={index}><b>{details.heading} {details.heading.includes(':') ? '' : ':'}</b> {details.val}</p>
                                                    ))}
                                                </Grid>
                                                {/* Right side */}
                                                <Grid item xs={3}>
                                                    {details.slice(Math.ceil(2 * details.length / 3)).map((details, index) => (
                                                        <p key={index}><b>{details.heading} {details.heading.includes(':') ? '' : ':'}</b> {details.val}</p>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        <br />
                                        {identification.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>IDENTIFICATIONS:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Type</TableCell>
                                                                        <TableCell>ID</TableCell>
                                                                        {/* <TableCell>ID</TableCell> */}
                                                                        <TableCell>Country</TableCell>
                                                                        <TableCell>Issue Date </TableCell>
                                                                        {/* <TableCell>Expire Date</TableCell> */}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {identification.map((identification, index) => (
                                                                        <TableRow key={identification.type + identification.country + identification.issue_Date} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{identification.type}</TableCell>
                                                                            <TableCell>{identification.ids}</TableCell>
                                                                            <TableCell>{identification.country}</TableCell>
                                                                            <TableCell>
                                                                                {identification.issue_Date !== '0000-00-00' ? identification.issue_Date : ''}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}
                                        {aliases.filter(alias => alias.aliasesType !== "Name").length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>ALIASES:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Type</TableCell>
                                                                        <TableCell>Category</TableCell>
                                                                        <TableCell>Name</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {aliases.filter(alias => alias.aliasesType !== "Name").map((alias, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{alias.aliasesType}</TableCell>
                                                                            <TableCell>{alias.category}</TableCell>
                                                                            <TableCell>{alias.aliasesName}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>

                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}
                                        {address.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>Addresses:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Region</TableCell>
                                                                        <TableCell>Address1</TableCell>
                                                                        <TableCell>Address2</TableCell>
                                                                        <TableCell>Address3</TableCell>
                                                                        <TableCell>City</TableCell>
                                                                        <TableCell>Province</TableCell>
                                                                        <TableCell>Postal Code</TableCell>
                                                                        <TableCell>Country </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {address.map((addres, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{addres.region}</TableCell>
                                                                            <TableCell>{addres.address1}</TableCell>
                                                                            <TableCell>{addres.address2}</TableCell>
                                                                            <TableCell>{addres.address3}</TableCell>
                                                                            <TableCell>{addres.city}</TableCell>
                                                                            <TableCell>{addres.province}</TableCell>
                                                                            <TableCell>{addres.postal}</TableCell>
                                                                            <TableCell>{addres.countryName}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                            </>
                                        )}
                                        <br></br>
                                        <div style={{ display: 'flex' }}>
                                            <DialogActions>
                                                <Button variant="contained" onClick={handleCloseModal}>Back</Button>
                                            </DialogActions>
                                        </div>
                                    </div>

                                </Card>
                            </Box>
                        </Box>

                    </Box>

                </DialogContent>

            </Dialog>

            <Dialog open={showModallogical} onClose={handleCloseModallogical} fullScreen
                maxWidth="md">
                {/* <DialogTitle>Search Details</DialogTitle> */}
                <DialogContent >
                    <Box sx={{ display: 'flex' }}>
                        <Header />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Box m={2} style={{ marginTop: '5%' }}>
                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                    <div className="card-body">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4>DETAILS:</h4>
                                        </div>
                                        <br />
                                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                            <Grid container spacing={2} justifyContent="space-between">
                                                {logicaldetails.length > 0 ? (
                                                    logicaldetails.map((detail, index) => (
                                                        <React.Fragment key={index}>
                                                            <Grid item xs={4}>
                                                                <Typography><b>First Name</b>: {detail.naal_firstname}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography><b>Middle Name</b>: {detail.naal_middlename}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography><b>Last Name</b>: {detail.naal_lastname}</Typography>
                                                            </Grid>
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <Grid item xs={12}>
                                                        <Typography>No details available</Typography>
                                                    </Grid>
                                                )}

                                                {logicalBirthDetails.length > 0 ? (
                                                    logicalBirthDetails.map((detail, index) => (
                                                        <React.Fragment key={index}>
                                                            <Grid item xs={4}>
                                                                <Typography><b>Birth Country</b>: {detail.birt_country}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography><b>Birth Place</b>: {detail.birt_plcae}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography><b>Birth Date</b>: {detail.birt_date}</Typography>
                                                            </Grid>
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <Grid item xs={12}>
                                                        <Typography>No details available</Typography>
                                                    </Grid>
                                                )}
                                                {logicalcitiy.length > 0 ? (
                                                    logicalcitiy.map((detail, index) => (
                                                        <React.Fragment key={index}>
                                                            <Grid item xs={4}>
                                                                <Typography><b>City Country</b>: {detail.citi_country}</Typography>
                                                            </Grid>

                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <Grid item xs={12}>
                                                        <Typography>No details available</Typography>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Card>
                                        <br />
                                        {logicalidentification.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>IDENTIFICATIONS:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper}>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Identification_Leba_publication_date</TableCell>
                                                                        <TableCell>Entity_logical_id_Identification</TableCell>
                                                                        <TableCell>Identification _leba_numtitle</TableCell>
                                                                        <TableCell>Identification</TableCell>
                                                                        <TableCell>Identification</TableCell>

                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {logicalidentification.map((id, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{id.entity_logical_id_Iden}</TableCell>
                                                                            <TableCell>{id.iden_Leba_publication_date}</TableCell>
                                                                            <TableCell>{id.iden_country}</TableCell>
                                                                            <TableCell>{id.iden_leba_numtitle}</TableCell>
                                                                            <TableCell>{id.iden_number}</TableCell>

                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}
                                        <br />
                                        {logicalAddress.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>Addresses:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper}>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>

                                                                        {/* <TableCell>entity_logical_id_Address </TableCell> */}
                                                                        <TableCell>Address_number </TableCell>
                                                                        <TableCell>Address_street </TableCell>
                                                                        <TableCell>Address_zipcode </TableCell>
                                                                        <TableCell>Address_city </TableCell>
                                                                        <TableCell>Address_country</TableCell>
                                                                        <TableCell>Address_other </TableCell>

                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {logicalAddress.map((addr, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>

                                                                            {/* <TableCell>{addr.entity_logical_id_Addr}</TableCell> */}
                                                                            <TableCell>{addr.addr_number}</TableCell>
                                                                            <TableCell>{addr.addr_street}</TableCell>
                                                                            <TableCell>{addr.addr_zipcod}</TableCell>
                                                                            <TableCell>{addr.addr_city}</TableCell>
                                                                            <TableCell>{addr.addr_country}</TableCell>
                                                                            <TableCell>{addr.addr_other}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}
                                        <br />
                                        {logicalAka.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>ALIASES:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper}>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>

                                                                        {/* <TableCell>entity_logical_id_Address </TableCell> */}
                                                                        <TableCell>Name </TableCell>


                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {logicalAka.map((addr, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>

                                                                            {/* <TableCell>{addr.entity_logical_id_Addr}</TableCell> */}
                                                                            <TableCell>{addr.name}</TableCell>

                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}
                                        <br />
                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex' }}>
                                        <DialogActions>
                                            <Button variant="contained" onClick={handleCloseModallogical}>Back</Button>
                                        </DialogActions>
                                    </div>
                                </Card>
                            </Box>
                        </Box>

                    </Box>

                </DialogContent>

            </Dialog>
            <Dialog open={showModalgroup} onClose={handleCloseModalgroup} fullScreen
                maxWidth="md">
                {/* <DialogTitle>Search Details</DialogTitle> */}
                <DialogContent >

                    <Box sx={{ display: 'flex' }}>
                        <Header />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Box m={2} style={{ marginTop: '5%' }}>
                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                    <div className="card-body">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h5">DETAILS:</Typography>
                                        </div>
                                        <br />
                                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                            {CityDetails.length > 0 && (
                                                <>
                                                    {/* {CityDetails.map((detail, index) => (
                                                <Grid container spacing={2} justifyContent="space-between" key={index}>
                                                    <Grid item xs={3}>
                                                        <Typography>Regulator:</Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography>Regulator List:</Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography>Type: {detail.group_Type}</Typography>
                                                    </Grid>
                                                </Grid>
                                            ))} */}
                                                    <br />

                                                    {/* <Grid item xs={3}>
                                                    <Typography>PID:</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography>Title:</Typography>
                                                </Grid> */}
                                                    {CityDetails.map((detail, index) => (
                                                        <Grid container spacing={2} justifyContent="space-between">
                                                            <React.Fragment key={index}>
                                                                <Grid item xs={4}>
                                                                    <Typography><b>Name</b> : {detail.name}</Typography>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Typography><b>place_of_Birth</b>: {detail.place_of_Birth}</Typography>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Typography><b>DOB</b>: {detail.dob}</Typography>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Typography><b>group_Type</b>: {detail.group_Type}</Typography>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Typography><b>citizenship</b>: {detail.citizenship}</Typography>
                                                                </Grid>
                                                            </React.Fragment>
                                                        </Grid>
                                                    ))}

                                                </>
                                            )}
                                        </Card>
                                        <br />
                                        {groupidentification.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="h5">IDENTIFICATIONS:</Typography>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper}>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Identity</TableCell>
                                                                        <TableCell>Number</TableCell>

                                                                        <TableCell>det</TableCell>

                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {groupidentification.map((id, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{id.identity}</TableCell>
                                                                            <TableCell>{id.number}</TableCell>
                                                                            <TableCell>{id.det}</TableCell>

                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}
                                        <br />

                                        <br />
                                        {Groupaliases.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>ALIASES:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper}>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Type</TableCell>
                                                                        <TableCell>Quality</TableCell>

                                                                        <TableCell>Name</TableCell>


                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {Groupaliases.map((id, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{id.alias_Type}</TableCell>
                                                                            <TableCell>{id.alias_Quality}</TableCell>
                                                                            <TableCell>{id.name}</TableCell>


                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}

                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex' }}>
                                        <DialogActions>
                                            <Button variant="contained" onClick={handleCloseModalgroup}>Back</Button>
                                        </DialogActions>
                                    </div>
                                </Card>
                            </Box>
                        </Box>
                    </Box>

                </DialogContent>

            </Dialog>
            <Dialog open={showModalun} onClose={handleCloseModalun} fullScreen
                maxWidth="md">
                {/* <DialogTitle>Search Details</DialogTitle> */}
                <DialogContent >

                    <Box sx={{ display: 'flex' }}>
                        <Header />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Box m={2} style={{ marginTop: '5%' }}>
                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                    <div className="card-body">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h5">DETAILS:</Typography>
                                        </div>
                                        <br />
                                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                            {UnDetails.length > 0 ? (
                                                UnDetails.map((detail, index) => (
                                                    <React.Fragment key={index}>
                                                        <Grid container spacing={2} justifyContent="space-between">

                                                            <Grid item xs={3}>
                                                                <Typography><b>First Name</b>: {detail.firstName}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Sec Name</b>: {detail.secName}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Third Name</b>: {detail.thirdName}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>List</b>: {detail._list}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Birth Place</b>: {detail.birthPlace}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Birth Type</b>: {detail.birthType}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Citizenship</b>: {detail.citizenship}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>DOB</b>: {detail.dob}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Gender</b>: {detail.gender}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Data ID</b>: {detail.dataid}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Nationality</b>: {detail.nationality}</Typography>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <Typography><b>Remarks</b>: {detail.remarks}</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <Typography>No details available</Typography>
                                            )}
                                        </Card>


                                        <br />
                                        {Unaliases.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>ALIASES:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper}>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Type</TableCell>
                                                                        <TableCell>Quality</TableCell>

                                                                        <TableCell>Name</TableCell>


                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {Unaliases.map((id, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{id._Type}</TableCell>
                                                                            <TableCell>{id.quality}</TableCell>
                                                                            <TableCell>{id.name}</TableCell>


                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />
                                            </>
                                        )}
                                        <br />
                                        {UnDesignationDetails.length > 0 && (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4>ALIASES:</h4>
                                                </div>
                                                <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper}>
                                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Identity</TableCell>



                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {UnDesignationDetails.map((id, index) => (
                                                                        <TableRow key={index} style={{ background: index % 2 === 0 ? 'white' : 'whitesmoke' }}>
                                                                            <TableCell>{id.identity}</TableCell>



                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Card>
                                                <br />

                                            </>
                                        )}

                                    </div>
                                    <br></br>
                                    <div style={{ display: 'flex' }}>
                                        <DialogActions>
                                            <Button variant="contained" onClick={handleCloseModalun}>Back</Button>
                                        </DialogActions>
                                    </div>
                                </Card>
                            </Box>
                        </Box>
                    </Box>

                </DialogContent>

            </Dialog>


        </>
    )
}

export default Details;