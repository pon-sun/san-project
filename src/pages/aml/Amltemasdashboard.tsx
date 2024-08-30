

import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/header/header';
import { Box, Grid, Avatar, Typography } from '@mui/material';
import sanctionImage from '../../../src/assets/sanction.png';
import fraud1 from '../../../src/assets/fraud1.png';
import pepImage from '../../../src/assets/pep.jpg';
import counter from '../../../src/assets/counter.png';
import aml from '../../../src/assets/aml.webp';
import scam1 from '../../../src/assets/scam1.png';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Branch from '../../../src/assets/Branch.png';


const AmlDashboard = () => {

    const navigate = useNavigate();

    const handlepepClick = () => {
        navigate('/Aml');
    };


    const handlefraudClick = () => {
        navigate('/QcViewaml');
    };

   
    const handlecounterfeit = () => {
        navigate('/CounterfeitDetails');
    };
    const handlescamClick = () => {
        navigate('/AmlScam');
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Container style={{ maxWidth: 'none', backgroundColor: 'white' }}>
                        <Box m={2}>
                            <h4>DASHBOARD</h4>
                            <div className="d-flex justify-content-center">
                                <div className="card" style={{ boxShadow: '1px 1px 1px grey', width: '100%', margin: '1%' }}>
                                    <div className="card-body">
                                        
                                        <Grid container spacing={2} style={{ margin: '20px' }}>


                                            <Grid item sm={4} >
                                                <Card style={{ padding: '9%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', alignItems: 'center', width: '275px' }}>
                                                    <Avatar alt="Aml InterConnections" src={aml} style={{ width: '100px', height: '100px', cursor: 'pointer' }} onClick={handlepepClick} />
                                                    <Typography onClick={handlepepClick} style={{ cursor: 'pointer' }}>AmlTo Teams</Typography>
                                                </Card>
                                            </Grid>


                                            <Grid item sm={4} >
                                                <Card style={{ padding: '9%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', alignItems: 'center', width: '275px' }}>

                                                    <Avatar alt="Fraud CounterFeit Alert" src={Branch} style={{ width: '100px', height: '100px', cursor: 'pointer' }} onClick={handlefraudClick} />
                                                    <Typography onClick={handlefraudClick} style={{ cursor: 'pointer' }}>Branch To Aml</Typography>
                                                </Card>
                                            </Grid>

                                           
                                            
                                        </Grid>


                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default AmlDashboard;
