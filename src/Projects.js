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
import { Radio } from "@material-ui/core";
import ProjectPostForm from './components/ProjectPostForm.js'

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

const Projects = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");  
  const [projectDelete, setProjectDelete] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectSelect, setProjectSelect] = useState("");
  const [projectCreate, setProjectCreate] = useState("");


  const getProductData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:3001/api/projects"
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

  const handleProject = (e) => {
    alert(e.target.value)
    setProjectSelect(e.target.value)
  }

  if(projectCreate){
    return (
      <div className="App">
        <ProjectPostForm />
        {/* <ProjectPostList /> */}
      </div>
    )
  }

  if(projectDelete == true && projectSelect !== ""){
    alert("Selected Project ID to Delete: " + projectSelect)
    fetch('http://localhost:3001/api/projects/'+ projectSelect, {method:'DELETE'})
  }


  
  return (
    <div className="Projects">
      <h1>Projects</h1>
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
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="center">People Working</StyledTableCell>
              <StyledTableCell align="right">Project Due Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((project) => {
                if (search == "") {
                  return project;
                } else if (
                  project.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return project;
                }
              })
              .map((project) => {
                return (
                  <StyledTableRow key={project.id}>
                    <StyledTableCell component="th" scope="row">
                    <input
                      type="radio"
                      placeholder={project.title}
                      onChange={(e) => setProjectSelect(e.target.value)}
                      value = {project._id}
                      checked = {projectSelect === project._id}
                    />{project.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {project.people}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {project.dueDate}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: 15, display: "flex" }}>
      <button onClick = {() => setProjectCreate(true)}
          style={{ marginLeft: 0 }}
        >
          Create New Project
        </button>
        <button onClick = {() => setProjectEdit(true)}
          style={{ marginLeft: "auto" }}
        >
          Edit Project
        </button>
        <button onClick = {() => setProjectDelete(true)}
          style={{ marginLeft: "auto" }}
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};

export default Projects;
