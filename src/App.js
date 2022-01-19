import { useState, memo, useEffect } from "react";

import "./App.css";
const transform = {
  3: 0,
  4: 1,
  5: 2,
  6: 3,
  7: 4,
  8: 5,
  9: 6,
  10: 7,
  J: 8,
  Q: 9,
  K: 10,
  A: 11,
};
let memory = [{
  3: 4,
  4: 4,
  5: 4,
  6: 4,
  7: 4,
  8: 4,
  9: 4,
  10: 4,
  J: 4,
  Q: 4,
  K: 4,
  A: 4,
  2: 4,
}];
let mul = 1;
function App() {
  const [userInput, setUserInput] = useState("");
  const [remainCards, setRemainCards] = useState({
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    J: 4,
    Q: 4,
    K: 4,
    A: 4,
    2: 4,
  });
  useEffect(() => (checkHandle()) , [userInput])

  const checkHandle = () => {
    if (userInput.includes("Sảnh") && userInput.split(" ").length === 3) multipleCardHandler();
    // Nếu là Đôi
    else if (userInput.includes("Đôi") && (!isNaN(userInput.split(" ")[1]) || ['J', 'Q', 'K', 'A'].includes(userInput.split(" ")[1])))
      doubleCardHandler();
    // Nếu là Ba con
    else if (userInput.includes("Tam") && userInput.split(" ").length === 2)
      tripleCardHandler();
    // Nếu là tứ quý
    else if (userInput.includes("Tứ") && userInput.split(" ").length === 3 )
      quadraCardHandler();
    // Nếu là Đôi Thông
    else if (userInput.includes("Thông") && userInput.split(" ").length === 4)
      doublePineHandle();
  }
  const onClickNumber = (content) => {
    if(userInput.length === 0) singleCardHandler(content)
    else setUserInput((userInput + " " + content).trim());
    
  };
  const onClickCommand = (content) => {
    if(['Sảnh', 'Đôi', 'Tam', 'Tứ Quý', 'Đôi Thông'].includes(userInput.split(" ")[0])) return;
    setUserInput((userInput + " " + content).trim());
  };
  const onClickDelete = () => {
    setUserInput("");
  };

  const singleCardHandler = (content) => {
    const updatedRemainCards = { ...remainCards };
    updatedRemainCards[content] -= 1*mul;
    memory.push(updatedRemainCards)
    setRemainCards(updatedRemainCards);
    setUserInput("");
  };
  const multipleCardHandler = () => {
    const [_, start, end] = userInput.split(" ");
    if(transform[end] < transform[start]){
      setUserInput("");
      return;
    }
    const startIndex = transform[start];
    const endIndex = transform[end];
    const keys = Object.keys(remainCards); // cái này nó tự sort làm cho số 2 lên đầu
    const updatedRemainCards = { ...remainCards };
    for (let i = startIndex + 1; i < endIndex + 2; i++) {
      // Bắt đầu chạy từ index 1 để loại bỏ con 2.
      updatedRemainCards[keys[i]] -= 1*mul;
    }
    memory.push(updatedRemainCards)
    setRemainCards(updatedRemainCards);
    setUserInput("");
  };
  const doubleCardHandler = () => {
    const [_, number] = userInput.split(" ");
    const updatedRemainCards = { ...remainCards };
    updatedRemainCards[number] -= 2*mul;
    memory.push(updatedRemainCards)
    setRemainCards(updatedRemainCards);
    setUserInput("");
  };
  const tripleCardHandler = () => {
    const [_, number] = userInput.split(" ");
    const updatedRemainCards = { ...remainCards };
    updatedRemainCards[number] -= 3*mul;
    memory.push(updatedRemainCards)
    setRemainCards(updatedRemainCards);
    setUserInput("");
  };

  const quadraCardHandler = () => {
    const [_, __, number] = userInput.split(" ");
    const updatedRemainCards = { ...remainCards };
    updatedRemainCards[number] -= 4*mul;
    memory.push(updatedRemainCards)
    setRemainCards(updatedRemainCards);
    setUserInput("");
  };
  const doublePineHandle = () => {
    const [_, __, start, end] = userInput.split(" ");
    if(transform[end] < transform[start]){
      setUserInput("");
      return;
    }
    const startIndex = transform[start];
    const endIndex = transform[end];
    const keys = Object.keys(remainCards); // cái này nó tự sort làm cho số 2 lên đầu
    const updatedRemainCards = { ...remainCards };

    for (let i = startIndex + 1; i < endIndex + 2; i++) {
      // Bắt đầu chạy từ index 1 để loại bỏ con 2.
      updatedRemainCards[keys[i]] -= 2*mul;
    }
    memory.push(updatedRemainCards)
    setRemainCards(updatedRemainCards);
    setUserInput("");
  };

  const onClickBack = () => {
    if(memory.length === 1) return;
    setRemainCards(memory[memory.length-2])
    memory.pop();
  }
  const resestHandle = () => {
    setRemainCards(memory[0]);
    memory = [{
      3: 4,
      4: 4,
      5: 4,
      6: 4,
      7: 4,
      8: 4,
      9: 4,
      10: 4,
      J: 4,
      Q: 4,
      K: 4,
      A: 4,
      2: 4,
    }];
  }
  const TouchableItem = memo(({ type, content, onClick }) => {
    return (
      <div className="card" onClick={onClick}>
        <p className= {type}>
          {content}
          {type === "number" && ":"}
          {remainCards[content]}
        </p>
      </div>
    );
  });

  return (
    <div className="App">
      <div className="input">
        <div className = 'reset' onClick = {resestHandle}></div>
        <p>{userInput}</p>
      </div>
      <div className="container">
        {["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"].map(
          (e) => (
            <TouchableItem
              type="number"
              content={e}
              onClick={() => onClickNumber(e)}
            />
          )
        )}
        {["Sảnh", "Đôi", "Tam", "Tứ Quý", "Đôi Thông"].map((e) => (
          <TouchableItem
            type="command"
            content={e}
            onClick={() => onClickCommand(e)}
          />
        ))}
        <TouchableItem type="command" content={"Xóa"} onClick={onClickDelete} />
        <TouchableItem type="command" content={"Quay Lại"} onClick={onClickBack} />
      </div>
    </div>
  );
}

export default App;
