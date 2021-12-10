import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  const editItem = (index) => {
    const { id, title } = list.find((item) => item.id === index);
    setIsEditing(true);
    setName(title);
    setEditID(id);
  };

  const removeItem = (index) => {
    showAlert(true, "item removed", "red");
    setList(list.filter((item) => item.id != index));
  };

  const clearAll = () => {
    setList([]);
    showAlert(true, "empty list", "red");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return showAlert(true, "please enter value", "red");
    }
    if (isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { id: editID, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "green");
    } else {
      showAlert(true, "item added to the list", "green");
      let newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery buying list</h3>
        <div className='form-control'>
          <input
            className='grocery'
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder='e.g. Milk'
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearAll}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}
export default App;
