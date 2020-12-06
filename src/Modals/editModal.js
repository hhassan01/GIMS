const [survey, setSurvey] = React.useState(undefined);
const handleInputChange = e => {
        setSurvey(e.target.value);
    };
const handleAddSurvey = () => {
        handleClose()
    };

<Dialog 
    open={openModal} 
    onClose={handleClose} 
    aria-labelledby="form-dialog-title"
>
    <DialogTitle id="form-dialog-title">Some Title</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Some Explanation
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={survey}
            onChange={handleInputChange}
        />

        <TextField
            autoFocus
            margin="dense"
            id="min_amount"
            label="Minimum Amount"
            type="number"
            fullWidth
            value={survey}
            onChange={handleInputChange}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} color="secondary">
            Cancel
        </Button>
        <Button onClick={handleAddSurvey} color="primary">
            Create
        </Button>
    </DialogActions>
</Dialog>



export default function ModalExample() {
    // React Hooks allow you to use state in what previously we called "dumb" components or stateless components; You can set the variable as a first argument e.g. survey and a function setSurvey that will mutate the variable
    const [openModal, setOpenModal] = React.useState(true);
    const [survey, setSurvey] = React.useState(undefined);
    
    const handleInputChange = e => {
        setSurvey(e.target.value);
    };
    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleAddSurvey = () => {
//Do something when users press create e.g. a DB call
        handleClose()
    };


    return (
        <Button variant="outlined" className={classes.addSruveyBtn}            
        onClick={handleOpen}>Open Modal</Button>
    )
