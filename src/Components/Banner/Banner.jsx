import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner: {
        width: '95%',
        margin: 'auto'
    },
    bannerContent: {
        // background: 'rgba(255, 255, 255, 0.2)',
        // borderRadius: '16px',
        // boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
        // backdropFilter: 'blur(5px)',
        // border: '1px solid rgba(255, 255, 255, 0.3)',
        // padding: '25px 0 !important',
        // height: 400,
        marginTop: 30,
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'space-around',
    },
    tagline: {
        display: 'flex',
        height: '40%',
        // flexDirection: 'column',
        justifyContent: 'space-between',
        // textAlign: 'center',
    },
}))

const Banner = () => {

    const classes = useStyles()

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    {/* <Typography
                        variant='h1'
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 15,
                            fontFamily: 'Montserrat',
                        }}
                    >
                        Crypto Scan
                    </Typography> */}
                    {/* <Typography
                        variant='subtitle2'
                        style={{
                            color: 'darkgrey',
                            textTransform: 'capitalize',
                            fontFamily: 'Montserrat'
                        }}
                    >
                        Invest now, you'll never regret it
                    </Typography> */}
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner