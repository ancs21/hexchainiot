import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2)
  },
  action: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export default () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Tooltip title="Add new device" aria-label="add">
        <Fab
          aria-label="add-form"
          className={classes.fab}
          color="primary"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Formik
        initialValues={{ name: '', description: '' }}
        validate={values => {
          let errors = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <Dialog
              maxWidth="sm"
              fullWidth={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Device</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add a name and description for device
                </DialogContentText>

                <TextField
                  id="form-name"
                  label="Name"
                  fullWidth={true}
                  placeholder="eg. Contact Page"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  error={errors.name ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />

                <TextField
                  id="form-description"
                  label="Description"
                  placeholder="eg. For website kene.io"
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </DialogContent>
              <DialogActions className={classes.action}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                >
                  Add Device
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </>
  )
}
