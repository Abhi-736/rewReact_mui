import { Button, Container, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import DepartmentList from './DepartmentList'
import Box from "@mui/material/Box";

const MainComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  interface dataObject {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  const [fetchData, setFetchData] = React.useState<Array<dataObject>>([]);
  const [sess, setSess] = React.useState<boolean>(
    location.state ? location.state.session : false
  );

  const rows: GridRowsProp = fetchData.map((value, index) => ({
    id: index+1,
    col1: value.title,
    col2: value.body,
    
  }));


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 10,
      align: "center",
      headerAlign: "center",
      
    },
    {
      field: "col1",
      headerName: "Title",
      maxWidth: 300,
      width:180,
      align: "left",
      headerAlign: "center",
      
    },
    {
      field: "col2",
      headerName: "Body",
      align: "left",
      headerAlign: "center",
      flex:1
    }
    
  ];

  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
            align: "center",
          },
        },
      },
    },
  });

  React.useEffect(() => {
    if (!sess) {
      navigate("/");
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setFetchData(data);
        })
        .catch((error) => {
          console.error("The wrror is ", error);
        });
    }
  }, [sess]);

  

  if (sess) {
    return (
      <Container sx={{py:'16px', font: "2rem sans-serif",display:'flex', flexDirection:'column', }}>
        <Box sx={{textAlign:'center',py:'10px',fontWeight:'700'}}>Component 1</Box>
        <ThemeProvider theme={theme}>
          <DataGrid rows={rows} columns={columns} />
        </ThemeProvider>
        {/* the session is active */}
       
        <DepartmentList/>
        <Button variant="outlined" color="error" size="large"
          onClick={() => {
            setSess(false);
          }}
        >
          Logout
        </Button>
      </Container>
    );
  } else {
    navigate("/");
    return <Container>Redirecting.....</Container>;
  }
};
export default MainComponent;
