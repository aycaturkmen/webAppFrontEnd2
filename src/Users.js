import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import React, { Component }  from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import UserPostForm from './components/UserPostForm.js'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});



const Users = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [userCreate, setUserCreate] = useState(false);
  const [userEdit, setUserEdit] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const [userSelect, setUserSelect] = useState("");
  const [userSelectName, setUserSelectName] = useState("");
  

  const getProductData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:3001/api/users"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);


  var selectedUserId = "";
  const handleUser = (e) => {
    alert("Target Value: " + e.target.value)
    alert("selected Value: " + selectedUserId)
    setUserSelect(e.target.value)
    selectedUserId = e.target.value
    alert("selected Value2: " + selectedUserId)
    alert("setuserselect: " + setUserSelect)
    alert("User Select: " + userSelect)
    return selectedUserId
  }
 


  if(userEdit == true && selectedUserId !== "" ){
    
      return (
        <div className="App">
          <UserPostForm />
          {/* <UserPostList /> */}
        </div>
      )
  }

  if(userDelete == true && userSelect !== ""){
    alert("ID of the Selected User to be Delete: " + userSelect)
    fetch('http://localhost:3001/api/users/'+ userSelect, {method:'DELETE'})
  }

  /*
  if(userEdit == true && userSelect !== ""){
    alert("ID of the Selected User to be Edited: " + userSelect)
    fetch('http://localhost:3001/api/users/'+ userSelect, {method:'DELETE'})
  }
  */



  if(userCreate){
    return (
      <div className="App">
        <UserPostForm />
        {/* <UserPostList /> */}
      </div>
    )
    
  }


  return (
    <div className="Users">
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell marginLeft="60">Name Surname</StyledTableCell>
              <StyledTableCell marginLeft="120">Position</StyledTableCell>
              <StyledTableCell marginLeft="180">Birth Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((user) => {
                if (search == "") {
                  return user;
                } else if (
                  user.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) => {
                return (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                    <input
                      type="radio"
                      placeholder={user.name}
                      onChange={(e) => setUserSelect(e.target.value)}
                      value = {user._id}
                      checked = {userSelect === user._id}
                    />{user.name}
                    </StyledTableCell>
                    <StyledTableCell marginLeft="60">
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell align="120">
                      {user.position}
                    </StyledTableCell>
                    <StyledTableCell align="180">
                      {user.birthDate}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: 15, display: "flex" }}>
        <button onClick = {() => setUserCreate(true)}
          style={{ marginLeft: 0 }}
        >
          Create New User
        </button>
        <button onClick = {() => setUserEdit(true)}
          style={{ marginLeft: "auto" }}
        >
          Edit User
        </button>
        <button onClick = {() => setUserDelete(true)}
          style={{ marginLeft: "auto" }}
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default Users;
