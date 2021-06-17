import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setLoginDetails } from "../../store/adminStore";
import ImageUploading from "react-images-uploading";
import { AuthContext } from "../../contexts/authContext";
import { uploadFile } from 'react-s3';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateUser() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState<"0" | "1">("0");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      const S3_BUCKET = "urmenuimages";
      const REGION = "ap-southeast-2";
      const ACCESS_KEY = "AKIAS4SILAQS43AX4RVP";
      const SECRET_ACCESS_KEY = "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";
      const config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
      };
      const result = await uploadFile(images[0]['file'], config)
      await authContext.signUpWithEmail(username, email, password, isAdmin, result.location);
      dispatch(
        setLoginDetails({
          authKey: "test",
          id: "admin",
          name: "name",
          profileUrl:
            "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        })
      );
      history.push("/userMenu");
    } catch (err) {
      setError(err.message);
    }
  };
  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setEmail(evt.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="username"
          name="name"
          autoComplete="email"
          autoFocus
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setUsername(evt.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPassword(evt.target.value);
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="isAdmin"
              onChange={(evt) => {
                setIsAdmin(evt.target.value ? "1" : "0");
              }}
              color="primary"
            />
          }
          label="Is Admin"
        />
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        <Box mt={2}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={signInClicked}
        >
          Save
        </Button>
      </div>
    </Container>
  );
}
