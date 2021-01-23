import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const ObjectForm = (props) => {
  const initialStateValues = {
    type: "",
    name: "",
    description: ""
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validtype = (str) => {
    var pattern = new RegExp();
    return !!pattern.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validtype(values.type)) {
      return toast("invalid type", { type: "warning", autoClose: 1000 });
    }

    props.addOrEditObjects(values);
    setValues({ ...initialStateValues });
  };

  const getObjectById = async (id) => {
    const doc = await db.collection("objects").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getObjectById(props.currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group">
        <label className="form-label">Type</label>
        <input
          type="text"
          className="form-control"
          placeholder="Object Type"
          value={values.type}
          name="type"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          value={values.name}
          name="name"
          placeholder="Object Name"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a Description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Insert" : "Update"}
      </button>
    </form>
  );
};

export default ObjectForm;
