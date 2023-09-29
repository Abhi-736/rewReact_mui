import React from "react";
import Button from "@mui/material/Button";
import { Alert, Box, Container, Stack, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface LoginDetails {
  name: string;
  number: number | undefined;
  email: string;
}

const Login: React.FC = () => {
  const [loginDetails] = React.useState<LoginDetails[] | []>(
    JSON.parse(localStorage.getItem("formDetails") || "[]")
  );

  const [name, setName] = React.useState<string>("");
  const [number, setNumber] = React.useState<number | undefined>();
  const [email, setEmail] = React.useState<string>("");
  const [wrongEmail, setWrongEmail] = React.useState<boolean>(false);
  const [wrongDetails, setWrongDetails] = React.useState<boolean>(false);
  const [noAccount, setNoAccount] = React.useState<boolean>(false);
  const Navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setWrongEmail(false);
    setWrongDetails(false);
    e.preventDefault();

    loginDetails.length
      ? loginDetails.forEach((value: LoginDetails): void => {
          if (
            value.name == name &&
            value.number == number &&
            value.email == email
          ) {
            Navigate("/MainComponent", { state: { session: true } });
          } else if (
            value.name == name &&
            value.number == number &&
            value.email != email
          ) {
            setWrongEmail(true);
          } else {
            setWrongDetails(true);
          }
        })
      : setNoAccount(true);
  };
  return (
    <Container maxWidth="sm" style={{height:'82vh'}} >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          font: "2rem sans-serif",
          py: "16px",
        }}
      >
        Login
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Name"
            name="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <TextField
            label="Number"
            name="number"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // Parse the input value to a number and handle potential parsing errors
              const parsedNumber = parseFloat(e.target.value);
              if (!isNaN(parsedNumber)) {
                // Update the state with the parsed number
                setNumber(parsedNumber);
              } else {
                // Handle the case where the input is not a valid number
                setNumber(undefined); // or set it to another suitable value
              }
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          {/* Add more form fields here */}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
      {wrongEmail && <Alert severity="info">The email is incorrect</Alert>}
      {wrongDetails && (
        <Alert severity="info">the name or the number is incorrect</Alert>
      )}
      {noAccount && (
        <Alert severity="info">No account found with that information </Alert>
      )}
      <small>
        Don't have an account? <Link to="/Signup">Signup</Link>
      </small>
    </Container>
  );
};
export default Login;
