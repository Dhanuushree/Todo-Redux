import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions';
const useStyles = makeStyles({
    root: {
        marginTop: 16,
        marginBottom: 16,
        padding: 16,
    },
    button: {
        padding: 16
    }
});

const Form = ({ title, setTitle, addItem, editItem, edit, error, setError }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        const title = event.target.value;

        setTitle(title);
        if (title.length === 0) {
            setError("Please enter title");
        } else {
            setError("");
        }
    }

    const handleClick = () => {
        if (title.length === 0) {
            setError("Please enter title");
            return;
        }
        if (edit) {
            editItem();
        } else {
            addItem();
        }
    }
    return (
        <Container className={classes.root}>
            <Grid container alignItems="center">
                <Grid item md={1}>
                </Grid>
                <Grid item md={8}>
                    <TextField value={title} onChange={handleChange}
                        error={!!error} helperText={error} id="outlined-basic" fullWidth label="Enter Item" multiline variant="outlined" />
                </Grid>
                <Grid item md={2}>
                    <Button className={classes.button} variant="contained" color="secondary" onClick={handleClick}>
                        {edit ? "Edit" : "Add"}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        title: state.title,
        edit: state.edit,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => dispatch(actionTypes.setTitle(title)),
        setError: (error) => dispatch(actionTypes.setError(error)),
        addItem: () => dispatch(actionTypes.addItem()),
        editItem: () => dispatch(actionTypes.editItem()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
