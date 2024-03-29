import React from "react";
import { useState, useContext, useEffect } from "react";

import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 ",
});
const Error = styled(Typography)`
   font-size=10px;
   color:#ff6161;
   line-height:0;
   margin-top:10px;
   font-weight:600;

`;

const Wrapper = styled(Box)`
  padding: 25px 30px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  \ & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const Loginbutton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const Signupbutton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const loginInitialValues = {
  username: "",
  password: "",
};
const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [account, toggleAccount] = useState("login");
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);
  const imageURL =
    "https://e7.pngegg.com/pngimages/933/921/png-clipart-computer-icons-blogger-social-media-blog-text-orange-thumbnail.png";
  useEffect(() => {
    showError("");
  }, [login]);

  const onValueChange =(e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onInputChange =(e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const loginUser = async() => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    } else {
      showError("Something went wrong! please try again later");
    }
  }
  const signupUser = async() => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong try again later");
    }
  };
  const toggleSignup =() => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              id="standard-basic"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter username"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter password"
              variant="standard"
            />
            {error && <Error>{error}</Error>}
            <Loginbutton variant="contained" onClick={() => loginUser()}>
              Login
            </Loginbutton>
            <Typography
              style={{
                textAlign: "center",
                color: "#878787",
                fontSize: "14px",
              }}
            >
              OR{" "}
            </Typography>
            <Signupbutton onClick={() => toggleSignup()}>
              CREATE AN ACCOUNT
            </Signupbutton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="standard-basic"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter username"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter password"
              variant="standard"
            />
            {error && <Error>{error}</Error>}
            <Signupbutton onClick={() => signupUser()}>Signup</Signupbutton>
            <Typography
              style={{
                textAlign: "center",
                color: "#878787",
                fontSize: "14px",
              }}
            >
              OR{" "}
            </Typography>
            <Loginbutton variant="contained" onClick={() => toggleSignup()}>
              Already have an account?
            </Loginbutton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
