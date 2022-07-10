import { useReducer } from "react";

// useReducer was only used here to practice, the last commit has the custom hook with useState

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    // setIsTouched(true);
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    // setEnteredValue(""); // this resets the input value
    // setIsTouched(false); // this makes the input not show as invalid when the form is submited
  };

  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
