import React from "react";
import Button from "@mui/material/Button";
import { Alert, Box, Container, Stack, TextField } from "@mui/material";
import {Link} from "react-router-dom";

interface LoginDetails {
  name: string;
  number: number | undefined;
  email: string;
}

const Signup: React.FC = () => {
  const [loginDetails, setLoginDetails] = React.useState<LoginDetails[]>([]);

  const [name, setName] = React.useState<string>("");
  const [number, setNumber] = React.useState<number | undefined>();
  const [email, setEmail] = React.useState<string>("");
  const [showAlert, setshowAlert] = React.useState<boolean>(false);
  const [loginbtn,showLoginbtn] =React.useState<boolean>(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name);
    console.log(number);
    console.log(email);

    setLoginDetails((value: LoginDetails[]): LoginDetails[] => {
      return [...value, { 'name': name, 'number': number, 'email': email }];
    });
  };
  React.useEffect(() => {
    
      const storedDetails = JSON.parse(localStorage.getItem("formDetails") || "[]");

      const match = storedDetails.some((value: LoginDetails) => {
        return (
          value.name === name &&
          value.number === number &&
          value.email === email
        );
      });
  
      if (match) {
        setshowAlert(true);
      } else {
        // Update localStorage with the updated login details
        setshowAlert(false);
        localStorage.setItem("formDetails", JSON.stringify(loginDetails));
name&&number&&email?showLoginbtn(true):null
        /* navigate("/Login"); */

      }
    
      
  }, [loginDetails]);

  return (
    <Container maxWidth="sm" style={{height:'82vh'}}>
      <Box sx={{display:'flex', justifyContent:'center', font:'2rem sans-serif',py: "16px",}}>Signup</Box>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Name"
            name="name"
            /* value={name} */
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <TextField
            label="Number"
            name="number"
            type="number"
            /* value={number} */
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              
              const parsedNumber = parseFloat(e.target.value);
              if (!isNaN(parsedNumber)) { 
                setNumber(parsedNumber);
              } else {
                setNumber(undefined); 
              }
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            /* value={email} */
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
      {showAlert &&<Alert severity="warning">The entry already exists!</Alert>}
      {loginbtn &&<Alert severity="info">Thankyou for signing up now <Link to='/'>Login</Link></Alert>}
    </Container>
  );
};

export default Signup;
