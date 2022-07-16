import { teal } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    selectButton: {
        border: '1px solid',
        borderColor: teal.A700,
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Montserrat',
        cursor: 'pointer',
        '&:hover': {
            background: teal[400],
            color: 'black',
        },
        width: '22%',
    },
})

const SelectButton = ({ children, selected, onClick }) => {


    const classes = useStyles()
  return (
    <span
        className={classes.selectButton}
        onClick={onClick}
        style={{
            background: selected ? teal[200] : '',
            color: selected ? 700 : 500,
        }}
    >
        {children}
    </span>
  )
}

export default SelectButton