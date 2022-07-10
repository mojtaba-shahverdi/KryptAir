import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner: {
        background: 'url(./banner.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    bannerContent: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: 'space-around',
    },
    tagline: {
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
}))

const Banner = () => {

    const classes = useStyles()

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h1'
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 15,
                            fontFamily: 'Montserrat',
                        }}
                    >
                        Crypto Scan
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color: 'darkgrey',
                            textTransform: 'capitalize',
                            fontFamily: 'Montserrat'
                        }}
                    >
                        Invest now, you'll never regret it
                    </Typography>
                </div>
                        <Carousel />
            </Container>
        </div>
    )
}

export default Banner