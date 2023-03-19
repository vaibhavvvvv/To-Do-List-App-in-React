import React from "react"
import "./style.css"

const getLocalData = () => {
  const lists = localStorage.getItem("myToDoList") //gets data from localStorage

  if (lists) {
    return JSON.parse(lists) //converts string format list into array format
  } else {
    return []
  }
}

const Todo = () => {
  const [inputData, setInputData] = React.useState("")
  const [items, setItems] = React.useState(getLocalData) //get data from local storage so that whenever website is refreshed data doesn't vanish
  const [isEditItem, setIsEditItem] = React.useState("")
  const [toggleButton, setToggleButton] = React.useState(false)

  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data")
    } else if (inputData && toggleButton) {
      setItems(
        items.map((currentElement) => {
          if (currentElement.id === isEditItem) {
            return { ...currentElement, name: inputData }
          }
          return currentElement
        })
      )
      //to clear input field after editing is done
      setInputData("")
      setIsEditItem(null)
      setToggleButton(false)
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }

      setItems([...items, myNewInputData])
      setInputData("")
    }
  }

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((currentElement) => {
      return currentElement.id !== index
    })
    setItems(updatedItems)
  }

  // how to delete all
  const removeAll = () => {
    setItems([])
  }

  //adding data in local storage
  React.useEffect(() => {
    localStorage.setItem("myToDoList", JSON.stringify(items))
  }, [items])

  //editing items
  const editItem = (index) => {
    const item_todo_edited = items.find((currentElement) => {
      return currentElement.id === index
    })
    setInputData(item_todo_edited.name)
    setIsEditItem(index)
    setToggleButton(true)
  }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo-logo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️   Add Item"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton === false ? (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            ) : (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items */}
          <div className="showItems">
            {items.map((currentElement) => {
              return (
                <div className="eachItem" key={currentElement.id}>
                  <h3>{currentElement.name}</h3>
                  <div className="todo-btn ">
                    <i
                      class="far fa-edit add-btn"
                      onClick={() => editItem(currentElement.id)}
                    ></i>
                    {/* passing Id onclick to edit function */}
                    <i
                      class="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(currentElement.id)}
                    ></i>
                  </div>
                </div>
              )
            })}
          </div>

          {/* remove all buttons */}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
