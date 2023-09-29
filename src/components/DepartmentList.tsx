import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DepartmentList() {
  const [checked1, setChecked1] = React.useState<Array<boolean>>([true, false]);
  const [checked2, setChecked2] = React.useState<Array<boolean>>([false,false,false,]);
  const [isOpen1, setisOpen1] = React.useState<boolean>(false);
  const [isOpen2, setisOpen2] = React.useState<boolean>(false);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setisOpen1((value: boolean) => !value);//it expand ir closes the "Customer_service" department
    setChecked1([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      setisOpen2((value: boolean) => !value);//it expand ir closes the "design" department
      setChecked2([e.target.checked, e.target.checked, e.target.checked]); 
  };

  const children1 = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="support"
        control={
          <Checkbox
            checked={checked1[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChecked1([e.target.checked, checked1[1]]);
            }}
          />
        }
      />
      <FormControlLabel
        label="customer_success"
        control={
          <Checkbox
            checked={checked1[1]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChecked1([checked1[0], e.target.checked]);
            }}
          />
        }
      />
    </Box>
  );//sub-departments of "Customer_service" depatment

  const children2 = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="graphic_design"
        control={
          <Checkbox
            checked={checked2[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChecked2([e.target.checked, checked2[1], checked2[2]]);
            }}
          />
        }
      />
      <FormControlLabel
        label="product_design"
        control={
          <Checkbox
            checked={checked2[1]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChecked2([checked2[0], e.target.checked, checked2[2]]);
            }}
          />
        }
      />
      <FormControlLabel
        label="web_design"
        control={
          <Checkbox
            checked={checked2[2]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setChecked2([checked2[0], checked2[1], e.target.checked]);
            }}
          />
        }
      />
    </Box>);//sub-department of "design" department

  return (
    <>
      <Box className="Component2" sx={{ p: 2, display:'flex',flexDirection:'column', textalign:'center' }}>
      <Box sx={{textAlign:'center',py:'20px',fontWeight:'700', }}>Component 2</Box>
        <Box className="container1" sx={{ display:'flex',justifyContent:'center'}} >
          <ExpandMoreIcon
          style={{marginTop:'8px'}}
            onClick={() => {
              setisOpen1((value: boolean) => !value);
            }}
            data-testid="ExpandMoreIcon"
          /> <Box>
          <FormControlLabel
            label="Customer_Services"
            control={
              <Checkbox
                checked={checked1[0] && checked1[1]}
                indeterminate={checked1[0] !== checked1[1]}
                onChange={handleChange1}
              />
            }
          />
          {isOpen1 && children1}
          </Box>
        </Box>
        <Box className="container2" sx={{display:'flex', justifyContent:'center'}}>
          <ExpandMoreIcon
          style={{marginTop:'8px'}}
            onClick={() => {
              setisOpen2((value: boolean) => !value);
            }}
            data-testid="ExpandMoreIcon"
          /><Box>
          <FormControlLabel
            label="design_Department"
            control={
              <Checkbox
                checked={checked2[0] && checked2[1] && checked2[2]}
                indeterminate={
                  checked2[0] !== checked2[1] ||
                  checked2[1] !== checked2[2] ||
                  checked2[2] !== checked2[0]
                }
                onChange={handleChange2}
              />
            }
          />
          {isOpen2 && children2}
        </Box>
        </Box>
      </Box>
    </>
  );
}
