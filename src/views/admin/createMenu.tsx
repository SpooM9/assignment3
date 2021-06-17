import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setLoginDetails, setIsSuper } from "../../store/adminStore";
import ImageUploading from "react-images-uploading";
import { uploadFile } from "react-s3";
import { Subtitles } from "@material-ui/icons";

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

export default function CreateMenu() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const handelLogin = async () => {
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
    const result = await uploadFile(images[0]["file"], config);
    fetch("http://urmenu-env.eba-9cbkqy3k.ap-southeast-2.elasticbeanstalk.com/public/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        subtitle: subTitle,
        imageUrl: result.location,
      }),
    })
    setTimeout(() => {
      history.push("/userMenu");      
    }, 500);
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
          id="name"
          label="Item Name"
          name="name"
          autoFocus
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTitle(evt.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="type"
          label="Type"
          name="type"
          autoFocus
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            setSubTitle(evt.target.value);
          }}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handelLogin}
        >
          Save
        </Button>
      </div>
    </Container>
  );
}
