import React, { useEffect, useState } from "react";
import ObjectForm from "./ObjectForm";

import { db } from "../firebase";
import { toast } from "react-toastify";

const Objects = () => {
  const initialStateValues = {
    searchValue: ""
  };
  const [search, setValues] = useState(initialStateValues);
  const [objects, setObjects] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const searchSubmit = (e) => {
    e.preventDefault();
    const valueFind = search.searchValue; 
    getObjectsByName(valueFind);
  }

  const getObjectsByName = async (nameSearch) => {
    db.collection("objects").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().name.toLowerCase().includes(nameSearch.toLowerCase()))
          docs.push({ ...doc.data(), id: doc.id });
      });
      setObjects(docs);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...search , [name]: value });
  };

  const getObjects = async () => {
    db.collection("objects").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setObjects(docs);
    });
  };

  const onDeleteObject = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await db.collection("objects").doc(id).delete();
      toast("Object removed successfully", {
        type: "error",
        autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getObjects();
  }, []);

  const addOrEditObjects = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("objects").doc().set(linkObject);
        toast("New object added", {
          type: "success"
        });
      } else {
        await db.collection("objects").doc(currentId).update(linkObject);
        toast("Object updated successfully", {
          type: "info"
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <form onSubmit={searchSubmit} className="form-inline my-2 my-lg-0">
            <input
                className="form-control mr-sm-2"
                type="text"
                name="searchValue"
                placeholder="Search"
                value={search.searchValue}
                onChange={handleInputChange}
            />
            <button className="btn btn-success my-2 my-sm-0 mr-2" type="submit">
              Search
            </button>
          </form>
            <button className="btn btn-warning my-2 my-sm-0" onClick={getObjects}>
              Restart List
            </button>
        </div>
      </nav>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-4 p-2">
            <ObjectForm {...{ addOrEditObjects, currentId, objects }} />
          </div>
          <div className="col-md-8 p-2">
            {objects.map((object) => (
              <div className="card mb-1" key={object.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4>
                      <span className="normal">Name: </span>
                      {object.name}
                    </h4>
                    <div className="pointer">
                      <i
                        className="material-icons text-danger"
                        onClick={() => onDeleteObject(object.id)}
                      >
                        close
                      </i>
                      <i
                        className="material-icons"
                        onClick={() => setCurrentId(object.id)}
                      >
                        create
                      </i>
                    </div>
                  </div>
                  <p>Type: {object.type}</p>
                  <p>Description: {object.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Objects;
