import React from 'react'
import { Container, Grow, Grid } from '@mui/material';
import Add from '../Form/Add';
import Posts from '../Posts/Posts';

function Home() {
    return (
        <>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" className='containermain' spacing={2}>
                        <Grid item xs={12} sm={6} md={7} lg={8}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={4}>
                            <Add />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home