import "./todo.css";
import { AiOutlineCheck } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';

const ToDo = ({ toggleChecked, text, deleteTodo, isChecked, date }) => {
  return (
    <div className="todo">
        <div className={`${isChecked ? "todoRadioChecked" : "todoRadioUnchecked"}`} onClick={toggleChecked}>
            {isChecked && <AiOutlineCheck />}
        </div>

        <div className={`${isChecked ? "todoTextChecked" : "todoText"}`}>
            <span>{text}</span>
            {date && <span className="todoDate"> {date}</span>}
        </div>

        <div className="todoDelete" onClick={deleteTodo}>
            <ImBin />
        </div>
    </div>
  );
};

export default ToDo;
