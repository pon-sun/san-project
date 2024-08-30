


import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Grid, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Paper, Typography } from '@mui/material';
import {  Collapse } from '@mui/material';
import { AccountCircle, Group, People, Business, AttachMoney, Description } from '@mui/icons-material';
import { Button } from 'react-bootstrap';
import { AkaDetRequest, CustomerRequest, Emailids, FamilyPayload, Father, Mother, NumberofHUTs, OtherAssociationRequest, PartyRequest, Payload, PhoneNumbers, Relative, RelativePayload, Spouse, SpouseFamilyPayload } from '../../data/services/pep/viewpage/viewpagedetails-payload';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Form, Card, Col, Row, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUsers, faMobile, faUser, faFlag, faVenus, faMars, faSkull, faBuilding, faAddressCard, faHandshake, faIdCard, faBirthdayCake, faSync, faCalendarAlt, faGlobe, faMapMarker, faInfoCircle, faUserTie, faIndustry, faChild, faExternalLinkAlt, faBusinessTime, faList, faHome, faRing, faGraduationCap, faPerson, faPhone, faMailBulk, faFile } from '@fortawesome/free-solid-svg-icons';
import Header from '../../layouts/header/header';
import profile from '../../assets/Avatar.png';

import jsPDF, { jsPDFOptions } from 'jspdf';
import 'jspdf-autotable';
import { renderToString } from 'react-dom/server';
import html2canvas from 'html2canvas';

import { useSelector } from 'react-redux';
import ViewPageDetailsService from '../../data/services/pep/viewpage/viewpagedetails-api-service';
import { CustomerEditData } from '../../data/services/pep/Reports/CustomerEdit/customeredit-payload';
import AssociatedlistPayload from '../../data/services/pep/insert/dto/AssociatedlistPayload';
import AddressApiService from '../../data/services/pep/insert/address-api-service';
import IdentifyApiService from '../../data/services/pep/Identify/Identify_api_service';
import PartyApiService from '../../data/services/pep/party/party_api_serivces';


interface CompanyItem {
    companyDTO: {
        listAdverseInformation: number | string; // Adjust the type accordingly
        listRegulatoryAction: number | string;
        listGovernment: number | string;
    };
}
interface CustomerData {
    createdAt?: string;
}



interface Party {
    id: string;
    partyMasterId: String;
    partyName: string;
}
interface CompanyDetailsItem {
    companyDTO: {
        id: number;
        sourceLink: string;
        associateMasterId: number;
        companyName: string;
        listAdverseInformation: number;
        listRegulatoryAction: number;
        listGovernment: number;
        originalDateOfAppointment: string;
        typeId: number; // Explicitly specify typeId as number
        cinfcrn: string;
        document: string;
    },
    addressDTOS: Array<{
        id: number;
        companyId: number;
        registeredAddress: string;
    }>;
    contactDTOS: Array<{
        companyId: number;
        emailID: string;
    }>;
    companiesDirectorsDTOS: Array<{
        id: number;
        din: string;
        companyId: number;
        directorId: number;
        designationId: number;
        companyMasterId: number;
        appointmentDate: string;
        cessationDate: string;
        designation: string;
        directorStatus: string;
        directorName: string;
    }>;
    companyDocumentsDTOS: Array<{
        companyId: number;
        documentTypeId: number;
        documentType: string;
        imageName3: string;
        uid: number;
        files3: string[];
        path: number[];
        euid: number;
    }>;
}

const ViewDesign: React.FC = () => {
    const userDetails = useSelector((state: any) => state.loginReducer);
    const loginDetails = userDetails.loginDetails;
    const location = useLocation();
    const { pepId, uid, entity } = useParams();
    const strongStyle = { marginRight: '10px' };
    const [fathers, setFathers] = useState<Father[]>([]);
    const [mothers, setMothers] = useState<Mother[]>([]);
    const [NumberofHUTss, setNumberofHUTss] = useState<NumberofHUTs[]>([]);
    const [Spouses, setSpouses] = useState<Spouse[]>([]);
    const customer = new ViewPageDetailsService();
    const viewPageService = new ViewPageDetailsService();
    const [customerData, setCustomerData] = useState<CustomerData>({})
    const [associatedList, setAssociatedList] = useState<AssociatedlistPayload[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const backendColumns = ['Photo', 'Name', 'PAN', 'AKA Name', 'Phone Number', 'Email Id', 'Directors Identification Number (DIN)', 'Customer Information List', 'Media', 'Date of Birth', 'Place of Birth', 'Gender', 'Education', 'Position in the Government', 'Address', 'Party', 'Died', 'Other Information', 'Associated Details', 'Family Details', 'Spouse Details', 'Relative Details', 'Source Link', 'Company Information List', 'Company Media', 'Customer Files', 'Company Files','Pep Id','Last Updated Date'];
    const [showPreviousCompanyDetails, setShowPreviousCompanyDetails] = useState(false);
    const [showCompanyDetails, setShowCompanyDetails] = useState(false);
    const [showListAssociatedDetails, setShowListAssociatedDetails] = useState(false);
    const [showFamilyDetails, setShowFamilyDetails] = useState(false);
    const [showSpouseDetails, setShowSpouseDetails] = useState(false);
    const [showPartyDetails, setShowPartyDetails] = useState(false);
    const [showRelativeDetails, setShowRelativeDetails] = useState(false);
    const [showFullOtherInformation, setShowFullOtherInformation] = useState(false);
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const [showMoreLLPsDetails, setShowMoreLLPsDetails] = useState(false);
    const [showMoreBussinessDetails, setShowMoreBussinessDetails] = useState(false);
    const [showAllRows, setShowAllRows] = useState(false);
    const identifyApiService = new IdentifyApiService();
    const componentRef = useRef<HTMLDivElement | null>(null);
    const [showTable, setShowTable] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const tableRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showFullPosition, setShowFullPosition] = useState(false);
    const [showaddressPosition, setShowaddressPosition] = useState(false);
    const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
    const [textBoxValue, setTextBoxValue] = useState('');
    const textAreaRef = useRef<HTMLDivElement>(null);
    const [isError, setIsError] = useState(false);
    const maxLength = 100;
    const [showFull, setShowFull] = useState(false);
    const [associationaspermedia, setAssociationaspermedia] = useState<OtherAssociationRequest[]>([{ otherAssociationAsPerMedia: '' }]);
    const tableStyle = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
    };
    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    const buttonStyle = {
        backgroundColor: isHovered ? '#135688' : '#1976D2',
        color: '#fff',
    };

    const fetchCustomerData = async () => {
        try {
            const customerList = await viewPageService.getCustomerList();
            const matchingCustomer = customerList.find((customer: { id: any; }) => String(customer.id) === pepId);
            if (matchingCustomer) {
                setCustomerData(matchingCustomer);
            } else {
                console.error(`Customer with pepId ${pepId} not found`);
            }
        } catch (error) {
            console.error('Error fetching customer list:', error);
        }
    };


    useEffect(() => {
        fetchCustomerData();

        fetchPartylist();
    }, [pepId]);

    const [formData, setFormData] = useState<CustomerRequest>({
        name: '',
        sourceLink: '',
        education: '',
        placeOfBirth: '',
        dob: '',
        pan: '',
        directorsIdentificationNumber: '',
        uid: '',
        createdAt: '',
        genderId: 0,
    });


    const [akaformData, setAkaFormData] = useState<AkaDetRequest[]>([{ akaName: '' }]);

    const [PartyformData, setPartyFormData] = useState<PartyRequest[]>([
        {
            formerAndCurrent: '',
            stateId: '',
            countryId: '',
            otherInformation: '',
            died: '',
            permanentAddress: '',
            positionInTheGovernment: '',
            partyMasterId: '',
            positionInTheParty: ''
        },
    ]);

   
    const [formDatas, setformDatas] = useState<Payload>({
        combinedDTO: [
            {
                companyDTO: {
                    id: 0,
                    sourceLink: '',
                    associateMasterId: 0,
                    companyName: '',
                    listAdverseInformation: 0,
                    listRegulatoryAction: 0,
                    listGovernment: 0,
                    originalDateOfAppointment: '',

                    typeId: 0,
                    cinfcrn: '',

                    document: '',

                },
                addressDTOS: [
                    {
                        id: 0,
                        companyId: 0,
                        registeredAddress: '',
                    },
                ],
                contactDTOS: [
                    {
                        companyId: 0,
                        emailID: '',
                    },
                ],
                companiesDirectorsDTOS: [
                    {
                        id: 0,

                        din: '',
                        companyId: 0,
                        directorId: 0,
                        designationId: 0,
                        companyMasterId: 0,
                        appointmentDate: '',
                        cessationDate: '',
                        designation: '',
                        directorStatus: '',
                        directorName: '',


                    },
                ],
                companyDocumentsDTOS: [
                    {
                        companyId: 0,
                        documentTypeId: 0,

                        documentType: '',
                        imageName3: '',
                        uid: 0,
                        files3: [],
                        path: [],
                        euid: 0,
                    },
                ],
                companyAssociationDTOS: [
                    {
                        id: 0,
                        companyId: 0,
                        companyAssociation: '',
                        uid: loginDetails.id,

                    },
                ],

            },
        ],
    });

    const [RelativeformData, setRelativeFormData] = useState<RelativePayload>({
        relativeCombineDTO: [
            {
                relativeDTO: {
                    pepId: 0,
                    relativeMasterId: '',
                    relativeName: '',
                    pan: '',
                },
                relativeDetDTOS: [
                    {
                        pepId: 0,
                        relativeId: 0,
                        name: '',
                        pan: '',
                    },
                ],
                relativeChildrenDTOS: [
                    {
                        pepId: 0,
                        relativeDetId: 0,
                        relativeId: 0,
                        childrenName: '',
                        pan: '',
                    },
                ],
            },
        ],
    });
    const [SpouseFamilyformData, setSpouseFamilyFormData] = useState<SpouseFamilyPayload>({
        spouseCommonDTO: [
            {
                spouseDetailsDTO: {
                    pepId: 0,

                    spouseName: '',
                    spousePan: '',
                },
                spouseHufDTOS: [
                    {
                        pepId: 0,
                        spouseId: 0,
                        hufName: '',
                        hufPan: '',
                    },
                ],

                spouseFatherDTOS: [
                    {
                        pepId: 0,
                        spouseId: 0,
                        fatherName: '',
                        fatherPan: '',
                    },
                ],
                spouseMotherDTOS: [
                    {
                        pepId: 0,
                        spouseId: 0,
                        motherName: '',
                        motherPan: '',
                    },
                ],
            },
        ],
    });
    const [FamilyformData, setFamilyFormData] = useState<FamilyPayload>({
        familyCombinedDTO: [
            {

                hufDTO: [
                    {
                        pepId: 0,
                        hufPan: '',
                        hufName: '',
                    },
                ],

                fatherDTOS: [
                    {
                        pepId: 0,

                        fatherName: '',
                        fatherPan: '',
                    },
                ],
                motherDTOS: [
                    {
                        pepId: 0,

                        motherName: '',
                        motherPan: '',
                    },
                ],
            },
        ],
    });

    const [relative, setRelative] = useState<Relative[]>([]);
    const [PhoneNumberss, setPhoneNumberss] = useState<PhoneNumbers[]>([]);
    const [Emailidss, setEmailidss] = useState<Emailids[]>([]);
    const [appendedData, setAppendedData] = useState<CustomerEditData[]>([]);
    const [serialNumber, setSerialNumber] = useState(1);
    const navigate = useNavigate();

 



    const viewPageDetailsService = new ViewPageDetailsService();



    const [adverseInformation, setAdverseInformation] = useState('');
    const [regulatoryAction, setRegulatoryAction] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchRelativeData();
        fetchPartylist();
        console.log("PhoneNumberss:", PhoneNumberss);
        console.log("Emailidss:", Emailidss);
        fetchProfilePicture(parseInt(pepId || '0', 10), 1);
        // fetchCompanyPicture(parseInt('9' || '0', 10), 5);
        const fetchCustomer = async (pepId: string, uid: string) => {
            try {
                setIsLoading(true);
                const customerData = await customer.getcustomer(pepId);
                if (customerData.createCustomerRequest) {
                    const {
                        name,
                        sourceLink,
                        education,
                        dob,
                        placeOfBirth,
                        pan,
                        directorsIdentificationNumber,
                        adverseInformation,
                        regulatoryAction,
                        genderId,
                        createdAt,
                    } = customerData.createCustomerRequest;

                    if (adverseInformation) {
                        setAdverseInformation(adverseInformation);
                    }

                    if (regulatoryAction) {
                        setRegulatoryAction(regulatoryAction);
                    }

                    setFormData({
                        name: name || '',
                        sourceLink: sourceLink || '',
                        education: education || '',
                        placeOfBirth: placeOfBirth || '',
                        dob: dob || '',
                        pan: pan || '',
                        genderId: genderId || '',
                        directorsIdentificationNumber: directorsIdentificationNumber || '',
                        adverseInformation: adverseInformation || '',
                        regulatoryAction: regulatoryAction || '',

                        uid: uid,
                        createdAt: createdAt || '',
                    });
                }
                {
                    formData.sourceLink && (
                        <a href={formData.sourceLink} target="_blank" rel="noopener noreferrer">
                            {formData.sourceLink}
                        </a>
                    )
                }
                if (customerData.akaDetDataList) {
                    setAkaFormData(
                        customerData.akaDetDataList.map((aka: { akaName: string }) => ({ akaName: aka.akaName || '' }))
                    );
                }


                if (customerData.otherAssociationDataList) {
                    setAssociationaspermedia(
                        customerData.otherAssociationDataList.map((aka: { otherAssociationAsPerMedia: string }) => ({ otherAssociationAsPerMedia: aka.otherAssociationAsPerMedia || '' }))
                    );
                }
                if (customerData.combinedDTO) {
                    setformDatas({
                        combinedDTO: customerData.combinedDTO

                    });
                    console.log('combinedDTO:', customerData.combinedDTO);
                }
                // if (customerData.relativeCombineDTOList) {
                //     setRelativeFormData({
                //         relativeCombineDTO: customerData.relativeCombineDTOList

                //     });
                // }
                if (customerData.Relative) {
                    setRelative(
                        customerData.Relative.map((aka: { name: string }) => ({ name: aka.name || '' }))
                    );
                }

                if (customerData.contactsDetailsDataList) {
                    setPhoneNumberss(
                        customerData.contactsDetailsDataList
                            .filter((PhoneNumbers: PhoneNumbers) => PhoneNumbers.communicationTypeId === 1)
                            .map((PhoneNumbers: PhoneNumbers) => ({
                                communicationTypeId: 1,
                                communicationDt: PhoneNumbers.communicationDt || '',
                            }))
                    );
                    setEmailidss(
                        customerData.contactsDetailsDataList
                            .filter((Email: Emailids) => Email.communicationTypeId === 2)
                            .map((Email: Emailids) => ({
                                communicationTypeId: 2,
                                communicationDt: Email.communicationDt || '',
                            }))
                    );
                    if (customerData.relativeCombineDTOList) {
                        setRelativeFormData({
                            relativeCombineDTO: customerData.relativeCombineDTOList,
                        });
                    }
                    if (customerData.familyCombinedDTOList) {
                        setFamilyFormData({
                            familyCombinedDTO: customerData.familyCombinedDTOList

                        });
                    }
                    if (customerData.spouseCommonDTOList) {
                        setSpouseFamilyFormData({
                            spouseCommonDTO: customerData.spouseCommonDTOList

                        });
                    }
                    if (customerData.partyDataList && customerData.partyDataList.length > 0) {

                        setPartyFormData(customerData.partyDataList);

                        console.log('PartyformData:', PartyformData);


                    } else {
                        console.log('No party data available');
                    }
                }
                if (customerData.createCustomerRequest) {
                    await customer.updateQcManager(pepId, uid, 'ManagerView');
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (pepId && uid) {
            fetchCustomer(pepId, uid);
        }
        window.scrollTo(0, 0);
    }, [pepId, uid],);


   
    function getAssociatedName(associateMasterdId: number) {
        switch (associateMasterdId) {
            case 1:
                return 'Private';
            case 2:
                return 'LLP';
            default:
                return 'Unknown';
        }
    }
    function getgenderName(genderId: number) {
        switch (genderId) {
            case 1:
                return 'Male';
            case 2:
                return 'FeMale';
            case 3:
                return 'Others';

        }
    };
    function getDesignationName(associateMasterdId: number) {
        switch (associateMasterdId) {
            case 1:
                return 'Managing Director';
            case 2:
                return 'Manager';
            case 3:
                return 'Nominee Director';
            case 4:
                return 'Director';
            case 5:
                return 'Company Secretary';
            case 6:
                return 'CFO';
            case 7:
                return 'Additional Director';
            case 8:
                return 'CEO';
            default:
                return 'Not Available';
        }
    }

    const addressApiService = new AddressApiService();

    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({
        base64: null,
        filename: null,
    });
    const [profileImageData, setProfileImageData] = useState<string | null>(null);
    const [companyDetails, setCompanyDetails] = useState({
        companyName: '',
        id: 0,
        documentType: '' // Add documentType to the state
    });
    const [documentTypes, setDocumentTypes] = useState<string[]>([]);
    const [directorDocumentType, setDirectorDocumentTypes] = useState<string[]>([]);
    const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageSource, setImageSource] = useState<string | null>(null);
    const fetchImage = async (pepId: number, pathId: number) => {
        try {
            const imageData = await addressApiService.getImage(pathId, pepId);
            const base64Image = arrayBufferToBase64(imageData);
            setBase64Image(base64Image);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };


    const [error, setError] = useState<string | null>(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const binary = new Uint8Array(buffer);
        const bytes = new Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = String.fromCharCode(binary[i]);
        }
        const base64String = btoa(bytes.join(''));
        return `data:image/png;base64,${base64String}`;
    };
  
    const handleButtonClick = async (pepId: number, pathId: number) => {
        setError(null);
        setLoading(true);
        setBase64Image(null); // Reset base64Image state

        try {
            // Generate a random number (0 or 1) to determine file type
            const randomFileTypeIndex = Math.floor(Math.random() * 2);
            const fileType = randomFileTypeIndex === 0 ? 'pdf' : 'image';

            if (fileType === 'image') {
                const imageData = await addressApiService.getImage(pathId, pepId);
                const base64Image = arrayBufferToBase64(imageData);
                setBase64Image(base64Image);
                setPdfData({ base64: null, filename: null });
            } else if (fileType === 'pdf') {
                const { data, filename } = await addressApiService.getPDF(pathId, pepId);
                setPdfData({ base64: data, filename });
                setBase64Image(null);
            }
            console.log('Clicked button for pepId:', pepId, 'fileType:', fileType);
        } catch (error) {
            setError('Not Available');
        } finally {
            setLoading(false);
        }
    };
    const handleCompanyButtonClick = async (companyId: number, pathId: number) => {
        setError(null);
        setLoading(true);

        try {
            const companyDetailsData: any[] = await addressApiService.getDocumentType(companyId, pathId);

            const types = companyDetailsData.map(documentData => documentData.documentType);

            setCompanyDetails({
                companyName: companyDetailsData[0]?.companyName || 'Not Available',
                id: companyId,
                documentType: types[0] || null,
            });

            setDocumentTypes(types);

            console.log('Clicked button for companyId:', companyId);
            console.log('Clicked button for documentTypes:', types);

            // Fetch and display the document images for the selected company and document types
            types.forEach(type => handleDocumentTypeClick(type, companyId)); // Call handleDocumentTypeClick for each document type
        } catch (error) {
            setError('Error fetching data');
            setImageSrc(null);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle document type click
    const handleDocumentTypeClick = async (imageName: string, companyId: number) => {
        try {
            const imagePathId = 5; // Replace with the actual pathId value
            const imageResponse = await addressApiService.getDocumentImage(companyId, imageName, imagePathId);

            console.log(`Image Response for Document Type ${imageName}:`, imageResponse);

            // Convert ArrayBuffer to base64 string
            const base64Image = arrayBufferToBase64(imageResponse);

            setImageSrc(base64Image);
        } catch (error) {
            console.error(`Error fetching document image for Document Type ${imageName}:`, error);
        }
    };
    const handleDiretorCompanyButtonClick = async (companyId: number, pathId: number) => {
        setError(null);
        setLoading(true);

        try {
            // const companyDetailsData: any[] = await addressApiService.getDocumentType(companyId, pathId);

            // const types = companyDetailsData.map(documentData => documentData.documentType);
            const companyDetailsData: any[] = await addressApiService.getDocumentType(companyId, pathId);

            const types = companyDetailsData.map(documentData => documentData.documentType);


            setCompanyDetails({
                companyName: companyDetailsData[0]?.companyName || 'Not Available',
                id: companyId,
                documentType: types[0] || null,
            });

            setDirectorDocumentTypes(types);

            console.log('Clicked button for DirectorcompanyId:', companyId);
            console.log('Clicked button for DirectordocumentTypes:', types);
            types.forEach(type => handleDocumentListTypeClick(type, companyId));
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentListTypeClick = async (imageName: string, companyId: number) => {
        try {
            const imagePathId = 6; // Replace with the actual pathId value
            const imageResponse = await addressApiService.getDocumentImage(companyId, imageName, imagePathId);

            console.log(`Image Response for Document Type ${imageName}:`, imageResponse);

            // Convert ArrayBuffer to base64 string
            const base64Image = arrayBufferToBase64(imageResponse);

            setImageSrc(base64Image);
        } catch (error) {
            console.error(`Error fetching document image for Document Type ${imageName}:`, error);
        }
    };


    const isDataAvailable = () => {
        return (
            formData.sourceLink ||
            formData.name ||
            formData.pan ||
            formData.education ||
            formData.dob ||
            akaformData.some((aka) => aka.akaName) ||
            PhoneNumberss.some((item) => item.communicationDt) ||
            Emailidss.some((item) => item.communicationDt)
        );
    };

    const headingStyle = {
        fontFamily: 'Times New Roman',
        fontSize: '20px',
    };

    const nameStyle = {
        fontFamily: 'Times New Roman',
        fontSize: '25px',
        fontWeight: 'bold',
        margin: '0',
    };

    const fetchProfilePicture = async (pepId: number, pathId: number) => {
        try {
            const imageData = await addressApiService.getImage(pathId, pepId);
            const profileImageData = arrayBufferToBase64(imageData);
            setProfileImageData(profileImageData);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
    function formatDateInMonth(datesString: string | number | Date) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const date = new Date(datesString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    const partyservices = new PartyApiService();
    const fetchPartylist = async () => {
        try {
            const partylistData = await partyservices.getparty();
            setPartylist(partylistData);
        } catch (error) {
            console.error('Error fetching associated list:', error);
        }
    };
    const [partylist, setPartylist] = useState<{ id: string; partyName: string }[]>([]);

    const mapPartyIdToName = (partyId: string | number) => {
        const idToFindString = typeof partyId === 'number' ? partyId.toString() : partyId;
        const party = partylist.find((party) => party.id == idToFindString);
        return party ? party.partyName : 'Not Available';
    };
   
    const renderAkaNames = () => {
        return (
            akaformData && akaformData.some((aka) => aka.akaName.trim() !== '') ? (
                akaformData.map((aka, index) => (
                    <div key={index}>
                        {index > 0} {/* Line break if not the first name */}
                        <span>{aka.akaName}</span>
                    </div>
                ))
            ) : (
                'Not Available'
            )
        );
    };
    const
        [RelativeList, setRelativeList] = useState<Relative[]>([]);
    const fetchRelativeData = async () => {
        try {
            const response = await customer.getRelative();
            console.log('API Response:', response);
            setRelativeList(response);
            console.log('RelativeList:', RelativeList);
        } catch (error) {
            console.error('Error fetching Relatives Data:', error);
        }
    };

    const getColumnIcon = (columnName: string) => {
        switch (columnName) {
            case 'Photo':
                return <FontAwesomeIcon icon={faUserCircle} />;
            case 'Name':
                return <FontAwesomeIcon icon={faUser} />;

            case 'PAN':
                return <FontAwesomeIcon icon={faIdCard} />;
            case 'Directors Identification Number (DIN)':
                return <FontAwesomeIcon icon={faIdCard} />;
            case 'AKA Name':
                return <FontAwesomeIcon icon={faUser} />;
            case 'Phone Number':
                return <FontAwesomeIcon icon={faPhone} />;
            case 'Email Id':
                return <FontAwesomeIcon icon={faMailBulk} />;
            case 'Customer Information List':
                return <FontAwesomeIcon icon={faMailBulk} />;
            case 'Media':
                return <FontAwesomeIcon icon={faUser} />;
            case 'Date of Birth':
                return <FontAwesomeIcon icon={faBirthdayCake} />;
            case 'Place of Birth':
                return <FontAwesomeIcon icon={faMapMarker} />;
            case 'Gender':
                return (
                    <>
                        <FontAwesomeIcon icon={faVenus} title="Female" />
                        <FontAwesomeIcon icon={faMars} title="Male" />
                    </>
                );
            case 'Education':
                return <FontAwesomeIcon icon={faGraduationCap} />;
            case 'Position in the Government':
                return <FontAwesomeIcon icon={faBuilding} />;
            case 'Address':
                return <FontAwesomeIcon icon={faAddressCard} />
            case 'Party':
                return <FontAwesomeIcon icon={faHandshake} />;
            case 'Died':
                return <FontAwesomeIcon icon={faSkull} />;
            // case 'Company / LLP Details':
            //     return <FontAwesomeIcon icon={faBuilding} />;
            // case 'Previous Company / LLP Details':
            //     return <FontAwesomeIcon icon={faBuilding} />;
            case 'Other Information':
                return <FontAwesomeIcon icon={faInfoCircle} />;
            // case 'Bussiness Associated Details':
            //     return <FontAwesomeIcon icon={faBusinessTime} />
            case 'Associated Details':
                return <FontAwesomeIcon icon={faList} />
            case 'Family Details':
                return <FontAwesomeIcon icon={faHome} />;
            case 'Relative Details':
                return <FontAwesomeIcon icon={faUsers} />
            case 'Spouse Details':
                return <FontAwesomeIcon icon={faRing} />;
            case 'Son Name':
                return <FontAwesomeIcon icon={faChild} />;
            case 'PAN':
                return <FontAwesomeIcon icon={faIdCard} />;
            case 'Daughter Name':
                return <FontAwesomeIcon icon={faChild} />;
            case 'PAN':
                return <FontAwesomeIcon icon={faIdCard} />;
            case 'Source Link':
                return <FontAwesomeIcon icon={faExternalLinkAlt} />;
            case 'Company Information List':
                return <FontAwesomeIcon icon={faMailBulk} />;
            case 'Company Media':
                return <FontAwesomeIcon icon={faUser} />;
            case 'Customer Files':
                return <FontAwesomeIcon icon={faFile} />
            case 'Company Files':
                return <FontAwesomeIcon icon={faFile} />
                case 'Pep Id':
                return <FontAwesomeIcon icon={faIdCard} />;
                case 'Last Updated Date':
                    return <FontAwesomeIcon icon={faCalendarAlt} />;
            default:
                return null;
        }
    };

    const toggleDetails = () => {
        setShowMoreDetails(!showMoreDetails);
    };

    const toggleLLPsDetails = () => {
        setShowMoreLLPsDetails(!showMoreLLPsDetails);
    };
    const toggleBussinessDetails = () => {
        setShowMoreBussinessDetails(!showMoreBussinessDetails);
    };


    const renderTableRows = () => {
        return backendColumns.map((columnName, index) => (
            <TableRow key={columnName} style={{ height: '30px' }}>
                <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>
                        <span style={{ marginRight: '10px' }}>{getColumnIcon(columnName)}</span>
                        <Typography variant="body1" fontWeight="bold" style={{ marginLeft: '3px', lineHeight: '1' }}>
                            {columnName}
                        </Typography>
                    </div>
                </TableCell>
                <TableCell>
                    <div style={{ marginLeft: '20px' }}>
                        {renderColumnValue(columnName, formDatas)}
                    </div>
                </TableCell>
            </TableRow>
        ));
    };

    const handleDownloadPDF = async () => {
        try {
            setLoading(true);
            const tableElement = tableRef.current;
            if (!tableElement) {
                console.error("Table element is null");
                return;
            }
            const canvas = await html2canvas(tableElement, { scale: 3 });
            const pdf = new jsPDF({
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                precision: 16,
                putOnlyUsedFonts: true,
                floatPrecision: 16,
            });
            pdf.setLineWidth(0.5);
            pdf.rect(5, 5, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10);
            pdf.setFontSize(14);
            pdf.text('USER DETAILS', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 30);
            pdf.save('user_details.pdf');
        } catch (error) {
            console.error('Error exporting to PDF:', error);
        } finally {
            setLoading(false);
        }
    };


    const formatDate = (dateString: string | number | Date) => {
        if (!dateString) {
            return 'Not Available';
        }
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };



    const handleRequestForUpdateClick = () => {
        setIsTextBoxVisible(true);
    };


    const handleTextBoxSubmit = async () => {
        if (!textBoxValue.trim()) {
            setIsError(true);
        } else {
            try {
                const parsedPepId = pepId ? parseInt(pepId) : 0;
                const parsedUid = uid ? parseInt(uid) : 0;
                const payload = {
                    pepId: parsedPepId,
                    description: textBoxValue,
                    uid: parsedUid,
                };
                const apiService = new ViewPageDetailsService();
                const response = await apiService.saveRequestDescription(payload);
                setIsButtonDisabled(true);
                handleRequestUpdateClick();
            } catch (error) {
                console.error('Error submitting description:', error);
            }
        }
    };

    const handleRequestUpdateClick = async () => {
        try {
            const singlePayload = {
                pepId: 0,
                requestAt: '1',
                requestUid: 0,
                updatedUid: 0,
                valid: 1,
                updated: 'string',
                requestForUpdate: '1',
            };
            const apiService = new ViewPageDetailsService();
            const response = await apiService.saveRequestForUpdate(singlePayload);
            if (response && response.success) {
                setIsButtonDisabled(true);
            }
            setIsButtonDisabled(true);
        } catch (error: any) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const renderColumnValue = (columnName: string, formDatas: any) => {
        switch (columnName) {
            case 'Photo':
                if (profileImageData) {
                    return (
                        <img
                            src={profileImageData}
                            alt="Profile"
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                        />
                    );
                } else {
                    return (
                        <img
                            src={profile}
                            alt="Default Avatar"
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                        />
                    );
                }
            case 'Name':
                return formData.name || 'Not Available';
            case 'PAN':
                return formData.pan || 'Not Available';
            case 'AKA Name':
                return renderAkaNames();
            case 'Date of Birth':
                if (formData.dob) {
                    const dobDate = new Date(formData.dob);
                    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                    const day = dobDate.getDate();
                    const month = monthNames[dobDate.getMonth()];
                    const year = dobDate.getFullYear();
                    const formattedDate = `${day}-${month}-${year}`;
                    return formattedDate;
                } else {
                    return 'Not Available';
                }
            case 'Place of Birth':
                return formData.placeOfBirth || 'Not Available';
            case 'Directors Identification Number (DIN)':
                return formData.directorsIdentificationNumber || 'Not Available';
            case 'Customer Information List':
                return (
                    <>
                        <Grid item xs={12} sm={12}>
                            {adverseInformation || regulatoryAction ? (
                                <>
                                    {adverseInformation && (
                                        <div>Adverse Information : Yes</div>
                                    )}
                                    {regulatoryAction && (
                                        <div>Regulatory Action : Yes</div>
                                    )}
                                </>
                            ) : (
                                <div>Not available</div>
                            )}
                        </Grid>
                    </>
                );

          

            case 'Phone Number':
                return PhoneNumberss && PhoneNumberss.length > 0 ?
                    PhoneNumberss.map((phone, index) => (
                        <div key={index}>{phone.communicationDt}</div>
                    )) :
                    'Not Available';

            case 'Email Id':
                return Emailidss && Emailidss.length > 0 ?
                    Emailidss.map((email, index) => (
                        <div key={index}>{email.communicationDt}</div>
                    )) :
                    'Not Available';

            case 'Gender':
                return getgenderName(formData.genderId) || 'Not Available';

            // case 'Education':
            //     return formData.education || 'Not Available';
            case 'Education':
                const educationContent = formData.education;
                const displayContent = showFull
                    ? educationContent
                    : (educationContent && educationContent.length > maxLength)
                        ? educationContent.slice(0, maxLength) + '...'
                        : educationContent || 'Not Available';
                const toggleShowFull = () => {
                    setShowFull(!showFull);
                };
                const shouldShowLink = educationContent && educationContent.length > maxLength;
                return (
                    <div>
                        {displayContent && <p>{displayContent}
                            {shouldShowLink && (
                                <span
                                    style={{
                                        cursor: 'pointer',
                                        color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))',
                                        textDecoration: 'underline',
                                    }}
                                    onClick={toggleShowFull}
                                >
                                    {showFull ? 'Show less' : 'Show more'}
                                </span>
                            )}</p>}
                    </div>
                );
            case 'Position in the Government':
                const positionInTheGovernment = PartyformData[0].positionInTheGovernment || 'Not Available';
                const formattedPosition = positionInTheGovernment.replace(/\n/g, '<br/>');
                const isTruncated = formattedPosition.length > 100;
                const truncatedPosition = isTruncated
                    ? showFullPosition
                        ? formattedPosition
                        : formattedPosition.slice(0, 100) + '...'
                    : formattedPosition;

                return (
                    <>
                        <span dangerouslySetInnerHTML={{ __html: truncatedPosition }}></span>
                        {isTruncated && (
                            <span
                                style={{
                                    cursor: 'pointer',
                                    color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => setShowFullPosition(!showFullPosition)}
                            >
                                {showFullPosition ? ' Show Less' : ' Show More'}
                            </span>
                        )}
                    </>
                );

            case 'Address':
                const permanentAddress = PartyformData[0].permanentAddress || 'Not Available';
                const isTruncate = permanentAddress.length > 100;
                const truncatePosition = isTruncate
                    ? showaddressPosition
                        ? permanentAddress
                        : permanentAddress.slice(0, 100) + '...'
                    : permanentAddress;

                const addressLines = truncatePosition.split('\n'); // Splitting addresses by newline character

                return (
                    <>
                        {addressLines.map((address, index) => (
                            <div key={index}>
                                <span>{address}</span>
                                <br /> {/* New line for each address */}
                            </div>
                        ))}
                        {isTruncate && (
                            <span
                                style={{
                                    cursor: 'pointer',
                                    color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => setShowaddressPosition(!showaddressPosition)}
                            >
                                {showaddressPosition ? ' Show Less' : ' Show More'}
                            </span>
                        )}
                    </>
                );


            case 'Died':
                return PartyformData[0].died || 'Not Available';

           
            case 'Other Information':
                const otherInformation = PartyformData[0]?.otherInformation || 'Not Available';
                const formattedOtherInformation = otherInformation.replace(/\n/g, '<br/>');
                const isTruncateds = formattedOtherInformation.length > 200;
                const truncatedOtherInformation = isTruncateds
                    ? showFullOtherInformation
                        ? formattedOtherInformation
                        : formattedOtherInformation.slice(0, 200) + '...'
                    : formattedOtherInformation;
                const toggleReadMore = () => {
                    setShowFullOtherInformation(!showFullOtherInformation);
                };
                return (
                    <>
                        <div dangerouslySetInnerHTML={{ __html: truncatedOtherInformation }}></div>
                        {isTruncateds && (
                            <span
                                style={{
                                    cursor: 'pointer',
                                    color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))',
                                    textDecoration: 'underline'
                                }}
                                onClick={toggleReadMore}
                            >
                                {showFullOtherInformation ? ' Read Less' : ' Read More'}
                            </span>
                        )}
                    </>
                );
           
            case 'Associated Details':
                return (
                    <div>
                        {formDatas.combinedDTO && formDatas.combinedDTO.length > 0 ? (
                            formDatas.combinedDTO.map((company: CompanyDetailsItem, index: number) => (
                                <div key={index}>
                                    <Grid item xs={12} sm={12} style={{ fontFamily: 'times new roman' }}>
                                        <strong>SourceLink : </strong>{" "}
                                        <a href={company.companyDTO.sourceLink} target="_blank" rel="noopener noreferrer">
                                            {company.companyDTO.sourceLink}
                                        </a>
                                    </Grid>
                                    <Grid item xs={12} sm={3} style={{ fontFamily: 'times new roman' }}>
                                        <strong>Company Name : </strong>{" "}
                                        {company.companyDTO.companyName}
                                    </Grid>
                                    {showListAssociatedDetails ? null : (
                                        <Typography
                                            component="span"
                                            style={{ cursor: 'pointer', color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))', textDecoration: 'underline' }}
                                            onClick={() => setShowListAssociatedDetails(!showListAssociatedDetails)}
                                        >
                                            Show More Details
                                        </Typography>
                                    )}
                                    <Collapse in={showListAssociatedDetails}>
                                        <Grid item xs={12} sm={3} style={{ fontFamily: 'times new roman' }}>
                                            <strong>CINFCRN:</strong>{" "}
                                            {company.companyDTO.cinfcrn}
                                            <br />
                                            <strong>OriginalDateOfAppointment:</strong>{" "}
                                            {company.companyDTO.originalDateOfAppointment ? formatDateInMonth(company.companyDTO.originalDateOfAppointment) : 'Not Available'}
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <TableContainer component={Paper} style={{ width: '100%' }}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell style={{ width: '50%', ...tableStyle }}><strong>EmailId</strong></TableCell>
                                                            <TableCell style={{ width: '50%', ...tableStyle }}><strong>RegisteredAddress</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>{company.contactDTOS && company.contactDTOS.length > 0 ? company.contactDTOS[0].emailID : 'Not Available'}</TableCell>
                                                            <TableCell>{company.addressDTOS && company.addressDTOS.length > 0 ? company.addressDTOS[0].registeredAddress : 'Not Available'}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <TableContainer component={Paper} style={{ width: '100%', marginTop: '1%' }}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell ><strong>D.Name</strong></TableCell>
                                                            <TableCell ><strong>Din</strong></TableCell>
                                                            <TableCell ><strong>Designation</strong></TableCell>
                                                            <TableCell ><strong>Director Status</strong></TableCell>
                                                            <TableCell ><strong>Date Of Appointment</strong></TableCell>
                                                            <TableCell ><strong>Date Of Cessation</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {company.companiesDirectorsDTOS && company.companiesDirectorsDTOS.length > 0 ? (
                                                            company.companiesDirectorsDTOS.map((director, dirIndex) => {
                                                                console.log("Director Name:", director.directorName); // Log director name for debugging
                                                                console.log("Designation ID:", director.designationId); // Log designation ID for debugging
                                                                const designationName = getDesignationName(director.designationId);
                                                                console.log("Designation Name:", designationName); // Log designation name for debugging
                                                                return (
                                                                    <TableRow key={dirIndex}>
                                                                        <TableCell>{director.directorName}</TableCell>
                                                                        <TableCell>{director.din}</TableCell>
                                                                        <TableCell>{designationName}</TableCell>
                                                                        <TableCell>{director.directorStatus}</TableCell>
                                                                        <TableCell>{director.appointmentDate}</TableCell>
                                                                        <TableCell>{director.cessationDate}</TableCell>
                                                                    </TableRow>
                                                                );
                                                            })
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={6}>No director data available</TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Collapse>
                                </div>
                            ))
                        ) : (
                            <p>Not Available</p>
                        )}
                        {showListAssociatedDetails && (
                            <Typography
                                component="span"
                                style={{ cursor: 'pointer', color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))', textDecoration: 'underline' }}
                                onClick={() => setShowListAssociatedDetails(!showListAssociatedDetails)}
                            >
                                Hide More Details
                            </Typography>
                        )}
                    </div>
                );

            case 'Family Details':
                return (
                    <div>
                        {FamilyformData.familyCombinedDTO && FamilyformData.familyCombinedDTO.length > 0 ? (
                            <>
                                <Typography
                                    component="span"
                                    style={{ cursor: 'pointer', color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))', textDecoration: 'underline' }}
                                    onClick={() => setShowFamilyDetails(!showFamilyDetails)}
                                >
                                    {showFamilyDetails ? 'Hide More Details' : 'Show More Details'}
                                </Typography>
                                <Collapse in={showFamilyDetails}>
                                    <div>
                                        {FamilyformData.familyCombinedDTO && FamilyformData.familyCombinedDTO.length > 0 ? (
                                            <TableContainer component={Paper} style={{ width: '100%', marginBottom: '1%' }}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell><strong>Huf Name</strong></TableCell>
                                                            <TableCell><strong>Huf Pan</strong></TableCell>
                                                            <TableCell><strong>Father Name</strong></TableCell>
                                                            <TableCell><strong>Father Pan</strong></TableCell>
                                                            <TableCell><strong>Mother Name</strong></TableCell>
                                                            <TableCell><strong>Mother Pan</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {FamilyformData.familyCombinedDTO?.map((item, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    {item.hufDTO?.map((contact, contactIndex) => (
                                                                        <p key={contactIndex}>{contact.hufName || '_'}</p>
                                                                    ))}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.hufDTO?.map((contact, contactIndex) => (
                                                                        <p key={contactIndex}>{contact.hufPan || '_'}</p>
                                                                    ))}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.fatherDTOS?.length > 0 ? (
                                                                        item.fatherDTOS.map((contact, contactIndex) => (
                                                                            <p key={contactIndex}>{contact.fatherName || '_'}</p>
                                                                        ))
                                                                    ) : (
                                                                        <p>_</p>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.fatherDTOS?.length > 0 ? (
                                                                        item.fatherDTOS.map((contact, contactIndex) => (
                                                                            <p key={contactIndex}>{contact.fatherPan || '_'}</p>
                                                                        ))
                                                                    ) : (
                                                                        <p>_</p>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.motherDTOS?.length > 0 ? (
                                                                        item.motherDTOS.map((contact, contactIndex) => (
                                                                            <p key={contactIndex}>{contact.motherName || '_'}</p>
                                                                        ))
                                                                    ) : (
                                                                        <p>_</p>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.motherDTOS?.length > 0 ? (
                                                                        item.motherDTOS.map((contact, contactIndex) => (
                                                                            <p key={contactIndex}>{contact.motherPan || '_'}</p>
                                                                        ))
                                                                    ) : (
                                                                        <p>_</p>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        ) : (
                                            <p>Not Available</p>
                                        )}
                                    </div>
                                </Collapse>
                            </>
                        ) : (
                            <p>Not Available</p>
                        )}
                    </div>
                );
            case 'Party':
                return (
                    <div>
                        {PartyformData.length > 0 ? (
                            <>
                                <Typography
                                    component="span"
                                    style={{ cursor: 'pointer', color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))', textDecoration: 'underline' }}
                                    onClick={() => setShowPartyDetails(!showPartyDetails)}
                                >
                                    {showPartyDetails ? 'Hide More Details' : 'Show More Details'}
                                </Typography>
                                <Collapse in={showPartyDetails}>
                                    <TableContainer component={Paper} style={{ width: '100%' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell ><strong>Party</strong></TableCell>
                                                    <TableCell><strong>Party Name</strong></TableCell>
                                                    <TableCell><strong>Position in the Party</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {PartyformData.map((partyData, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <p>{mapPartyIdToName(partyData.partyMasterId)}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <p>{partyData.formerAndCurrent || 'Not Available'}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <p>
                                                                {partyData.positionInTheParty
                                                                    ? partyData.positionInTheParty.split('\n').map((item, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {item}
                                                                            <br /> {/* New line for each item */}
                                                                        </React.Fragment>
                                                                    ))
                                                                    : 'Not Available'}
                                                            </p>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Collapse>

                            </>

                        ) : (
                            <p>Party details not available</p>
                        )}
                    </div>
                );

            case 'Spouse Details':
                return (
                    <div>
                        {SpouseFamilyformData.spouseCommonDTO && SpouseFamilyformData.spouseCommonDTO.length > 0 ? (
                            <>
                                <Typography
                                    component="span"
                                    style={{ cursor: 'pointer', color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))', textDecoration: 'underline' }}
                                    onClick={() => setShowSpouseDetails(!showSpouseDetails)}
                                >
                                    {showSpouseDetails ? 'Hide More Details' : 'Show More Details'}
                                </Typography>
                                <Collapse in={showSpouseDetails}>
                                    <TableContainer component={Paper} style={{ width: '100%', marginBottom: '1%' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><strong>Spouse Name</strong></TableCell>
                                                    <TableCell><strong>Spouse PAN</strong></TableCell>
                                                    <TableCell><strong>Huf Name</strong></TableCell>
                                                    <TableCell><strong>Huf Pan</strong></TableCell>
                                                    <TableCell><strong>Father Name</strong></TableCell>
                                                    <TableCell><strong>Father Pan</strong></TableCell>
                                                    <TableCell><strong>Mother Name</strong></TableCell>
                                                    <TableCell><strong>Mother Pan</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {SpouseFamilyformData.spouseCommonDTO.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <p>{item.spouseDetailsDTO && item.spouseDetailsDTO.spouseName ? item.spouseDetailsDTO.spouseName : '_'}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <p>{item.spouseDetailsDTO && item.spouseDetailsDTO.spousePan ? item.spouseDetailsDTO.spousePan : '_'}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.spouseHufDTOS?.map((contact, contactIndex) => (
                                                                <p key={contactIndex}>{contact.hufName || '_'}</p>
                                                            ))}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.spouseHufDTOS?.map((contact, contactIndex) => (
                                                                <p key={contactIndex}>{contact.hufPan || '_'}</p>
                                                            ))}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.spouseFatherDTOS?.length > 0 ? (
                                                                item.spouseFatherDTOS.map((contact, contactIndex) => (
                                                                    <p key={contactIndex}>{contact.fatherName || '_'}</p>
                                                                ))
                                                            ) : (
                                                                <p>_</p>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.spouseFatherDTOS?.length > 0 ? (
                                                                item.spouseFatherDTOS.map((contact, contactIndex) => (
                                                                    <p key={contactIndex}>{contact.fatherPan || '_'}</p>
                                                                ))
                                                            ) : (
                                                                <p>_</p>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.spouseMotherDTOS?.length > 0 ? (
                                                                item.spouseMotherDTOS.map((contact, contactIndex) => (
                                                                    <p key={contactIndex}>{contact.motherName || '_'}</p>
                                                                ))
                                                            ) : (
                                                                <p>_</p>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.spouseMotherDTOS?.length > 0 ? (
                                                                item.spouseMotherDTOS.map((contact, contactIndex) => (
                                                                    <p key={contactIndex}>{contact.motherPan || '_'}</p>
                                                                ))
                                                            ) : (
                                                                <p>_</p>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Collapse>
                            </>
                        ) : (
                            <p>Not Available</p>
                        )}
                    </div>
                );
            case 'Relative Details':

                return (
                    <div>
                        {RelativeformData.relativeCombineDTO && RelativeformData.relativeCombineDTO.length > 0 ? (
                            <>
                                <Typography
                                    component="span"
                                    style={{ cursor: 'pointer', color: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))', textDecoration: 'underline' }}
                                    onClick={() => setShowRelativeDetails(!showRelativeDetails)}
                                >
                                    {showRelativeDetails ? 'Hide More Details' : 'Show More Details'}
                                </Typography>
                                <Collapse in={showRelativeDetails}>
                                    <div>
                                        {RelativeformData.relativeCombineDTO && RelativeformData.relativeCombineDTO.length > 0 ? (
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Relative List</TableCell>
                                                            <TableCell>Relative Name</TableCell>
                                                            <TableCell>PAN</TableCell>
                                                            <TableCell>Spouse Name</TableCell>
                                                            <TableCell>Spouse PAN</TableCell>
                                                            <TableCell>Children Name</TableCell>
                                                            <TableCell>Children PAN</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {RelativeformData.relativeCombineDTO.map((relative, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    {RelativeList.find(item => item.id === relative.relativeDTO.relativeMasterId)?.name || '-'}
                                                                </TableCell>
                                                                <TableCell>{relative.relativeDTO.relativeName || '-'}</TableCell>
                                                                <TableCell>{relative.relativeDTO.pan || '-'}</TableCell>
                                                                <TableCell>
                                                                    {relative.relativeDetDTOS.length > 0 ? (
                                                                        relative.relativeDetDTOS.map((spouse, spouseIndex) => (
                                                                            <div key={spouseIndex}>
                                                                                {spouse.name}
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        '-'
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {relative.relativeDetDTOS.length > 0 ? (
                                                                        relative.relativeDetDTOS.map((spouse, spouseIndex) => (
                                                                            <div key={spouseIndex}>
                                                                                {spouse.pan || '-'}
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        '-'
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {relative.relativeChildrenDTOS.length > 0 ? (
                                                                        relative.relativeChildrenDTOS.map((child, childIndex) => (
                                                                            <div key={childIndex}>
                                                                                {child.childrenName}
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        '-'
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {relative.relativeChildrenDTOS.length > 0 ? (
                                                                        relative.relativeChildrenDTOS.map((child, childIndex) => (
                                                                            <div key={childIndex}>
                                                                                {child.pan || '-'}
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        '-'
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        ) : (
                                            <p>Not Available</p>
                                        )}
                                    </div>
                                </Collapse>
                            </>
                        ) : (
                            <p>Not Available</p>
                        )}
                    </div>
                );


            case 'Source Link':
                const sourceLink = formData.sourceLink;
                const maxLinkLength = 50; // Adjust this value according to your preference
                return (
                    <div>
                        {sourceLink ? (
                            sourceLink.split('\n').map((link: string, index: number) => (
                                <React.Fragment key={index}>
                                    <p style={{ marginBottom: '-14px', maxWidth: '100%' }}>
                                        <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {link.length > maxLinkLength ? `${link.substring(0, maxLinkLength)}...` : link}
                                        </a>
                                    </p>
                                    {index < sourceLink.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))
                        ) : (
                            <p style={{ marginBottom: '5px' }}>Not Available</p>
                        )}
                    </div>
                );
            case 'Media':

                return (
                    <div>
                        {associationaspermedia && associationaspermedia.length > 0 ? (
                            associationaspermedia.map((aka, index) => (
                                <p key={index}>{aka.otherAssociationAsPerMedia}</p>
                            ))
                        ) : (
                            <p>Not Available</p>
                        )}
                    </div>
                );
            
            case 'Company Information List':
                return (
                    <>
                        <Grid item xs={12} sm={12}>
                            {formDatas.combinedDTO && formDatas.combinedDTO.length > 0 ? (
                                <>
                                    {formDatas.combinedDTO.map((item: any, index: number) => (
                                        <div key={index}>
                                            {item.companyDTO.listAdverseInformation && (
                                                <div>AdverseInformation: Yes</div>
                                            )}
                                            {item.companyDTO.listRegulatoryAction && (
                                                <div>RegulatoryAction: Yes</div>
                                            )}
                                            {item.companyDTO.listGovernment && (
                                                <div>Government: Yes</div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div>Not Available</div>
                            )}
                        </Grid>
                    </>
                );
            
            case 'Company Media':
                return (
                    <div>
                        {formDatas && formDatas.combinedDTO.length > 0 ? (
                            formDatas.combinedDTO.map((item: any, index: number) => (
                                <Grid item xs={12} sm={3} key={index}>
                                    <p>{item.companyAssociationDTOS && item.companyAssociationDTOS.length > 0 ? (
                                        item.companyAssociationDTOS.map((associationItem: any, associationIndex: number) => (
                                            <p key={associationIndex}>{associationItem.companyAssociation}</p>
                                        ))
                                    ) : (
                                        <p>Not Available</p>
                                    )}</p>
                                </Grid>
                            ))
                        ) : (
                            <p>Not Available</p>
                        )}
                    </div>
                );


            case 'Customer Files':

                return (
                    <div>
                        <Grid item xs={12}>
                            <Form>
                                <Row>
                                    <Col xs={1}>
                                        <Button variant="primary" onClick={() => { setButtonClicked(true); handleButtonClick(parseInt(pepId || '0', 10), 2); }}>
                                            Party
                                        </Button>
                                    </Col>
                                    <Col xs={1}>
                                        <Button variant="primary" onClick={() => { setButtonClicked(true); handleButtonClick(parseInt(pepId || '0', 10), 3); }}>
                                            DIN
                                        </Button>
                                    </Col>
                                    <Col xs={1}>
                                        <Button variant="primary" onClick={() => { setButtonClicked(true); handleButtonClick(parseInt(pepId || '0', 10), 4); }}>
                                            C.LLP
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <div>

                                {error && base64Image === null && pdfData.base64 === null && buttonClicked && (
                                    <p style={{ color: 'red' }}>{error}</p>
                                )}
                            </div>
                            {base64Image && buttonClicked && (
                                <Col xs={12} style={{ marginTop: '2%' }}>
                                    <div>
                                        <h2>Image Preview</h2>
                                        <Image src={base64Image} alt="Preview" style={{ maxHeight: '250px', maxWidth: '300px' }} />
                                    </div>
                                </Col>
                            )}
                            {pdfData.base64 && buttonClicked && (
                                <Col xs={12} style={{ marginTop: '2%' }}>
                                    <div>
                                        <h2>PDF Preview</h2>
                                        <iframe
                                            title="PDF Preview"
                                            width="100%"
                                            height="500px"
                                            style={{ border: 'none' }}
                                            src={`data:application/pdf;base64,${pdfData.base64}`}
                                        />
                                        {pdfData.filename && (
                                            <div style={{ marginTop: '10px' }}>
                                                <a
                                                    href={`data:application/pdf;base64,${pdfData.base64}`}
                                                    download={pdfData.filename}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
                                                >
                                                    Download PDF
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            )}
                            {/* Show "not available" if neither image nor PDF is available */}

                        </Grid>
                    </div>
                );
           

           
            case 'Company Files':
                return (
                    <div>
                        <Grid item xs={12}>
                            <div>
                                <h5 style={headingStyle}>List of  Associated Details</h5>
                                {formDatas.combinedDTO && formDatas.combinedDTO.length > 0 ? (
                                    formDatas.combinedDTO
                                        .filter((item: CompanyDetailsItem) => item.companyDTO && item.companyDTO.typeId === 1)
                                        .map((item: CompanyDetailsItem, index: number) => (
                                            <React.Fragment key={index}>
                                                <span
                                                    onClick={() => handleCompanyButtonClick(item.companyDTO.id, 5)}
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    {item.companyDTO.companyName}
                                                </span>
                                                {index < formDatas.combinedDTO.length - 1 && <br />}{' '}
                                                {companyDetails.id === item.companyDTO.id && (
                                                    <div>
                                                        {documentTypes.map((type, typeIndex) => (
                                                            <div
                                                                key={typeIndex}
                                                                //variant="secondary"
                                                                style={{ margin: '0.3rem', marginTop: '10px' }}
                                                                onClick={() => handleDocumentTypeClick(type, companyDetails.id)}
                                                            >
                                                                {/* {`Document Type: ${type}, Company ID: ${companyDetails.id}`} */}
                                                            </div>
                                                        ))}
                                                        {/* Display the image if imageSrc is available */}
                                                        {imageSrc && (
                                                            <img src={imageSrc} alt="Document Image" style={{ width: '25%' }} />
                                                        )}
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))
                                ) : (
                                    <span>Not Available</span>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <h5 style={headingStyle}>Bussiness Associated Details</h5>
                                {formDatas.combinedDTO && formDatas.combinedDTO.length > 0 ? (
                                    formDatas.combinedDTO
                                        .filter((item: CompanyDetailsItem) => item.companyDTO && item.companyDTO.typeId === 2)
                                        .map((item: CompanyDetailsItem, index: number) => (
                                            <React.Fragment key={index}>
                                                <span
                                                    onClick={() => handleDiretorCompanyButtonClick(item.companyDTO.id, 6)}
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    {item.companyDTO.companyName}
                                                </span>
                                                {index < formDatas.combinedDTO.length - 1 && <br />}{' '}
                                                {companyDetails.id === item.companyDTO.id && (
                                                    <div>
                                                        {directorDocumentType.map((type, typeIndex) => (
                                                            <div
                                                                key={typeIndex}
                                                                //variant="secondary"
                                                                style={{ margin: '0.3rem', marginTop: '10px' }}
                                                                onClick={() => handleDocumentListTypeClick(type, companyDetails.id)}
                                                            >
                                                                {/* {`Document Type: ${type}, Company ID: ${companyDetails.id}`} */}
                                                            </div>
                                                        ))}
                                                        {/* Display the image if imageSrc is available */}
                                                        {imageSrc && (
                                                            <img src={imageSrc} alt="Document Image" style={{ width: '25%' }} />
                                                        )}

                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))
                                ) : (
                                    <span>Not Available</span>
                                )}
                            </div>
                        </Grid>
                    </div>
                );
                case 'Pep Id':
                    return pepId || 'Not Available';
                    case 'Last Updated Date':
                        const createdAt = customerData.createdAt;
                        return createdAt ? new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Not Available';
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            <Box m={6}>
                <Card
                    style={{
                        margin: '6%',
                        padding: '1%',
                        boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px',
                        marginLeft: '10%',
                        width: '80%',
                    }}
                >
                    <Container
                        style={{
                            maxWidth: 'none',
                            backgroundColor: 'white',
                            margin: '10px',
                        }}
                    >
                        <Box m={4}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    {/* <h4 style={{ marginBottom: '1%' }}>MANAGER VIEW</h4> */}
                                </Grid>
                                {/* <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleDownloadPDF}
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                        style={buttonStyle}
                                    >
                                        Download PDF
                                    </Button>
                                    {loading && <div style={{ margin: '20px', color: 'red' }}>Generating PDF Please wait...</div>}
                                </Grid> */}
                            </Grid>
                            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                                <Table ref={tableRef}>
                                    <TableBody>{renderTableRows()}</TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Container>
                </Card>
            </Box> 

            <div ref={componentRef}></div>
        </div>


    );


};



export default ViewDesign;


