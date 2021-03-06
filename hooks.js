{
	"generate Hook": {
		"prefix": "r_Effect",
		"body": [
			"import React, { useEffect } from 'react';",
			"",
			"function Example() {",
			"",
			"  // Similar to componentDidMount and componentDidUpdate:",
			"  useEffect(() => {",
			"    //write code here",
			"  });",
			"",
			"  return (",
			"  <div>useEffect hook</div>",
			"  );",
			"}"
		],
		"description": "generate effect Hook"
	},
	"generate State Hook": {
		"prefix": "r_State",
		"body": [
			"import React, { useState } from 'react';",
			"",
			"function Example() {",
			"  // Declare a new state variable, which we'll call \"count\"",
			"  const [count, setCount] = useState(0);",
			"",
			"  return (",
			"    <div>",
			"      <p>You clicked {count} times</p>",
			"      <button onClick={() => setCount(count + 1)}>",
			"        Click me",
			"      </button>",
			"    </div>",
			"  );",
			"}"
		],
		"description": "generate State Hook"
	},
	"generate context Hook": {
		"prefix": "r_context",
		"body": [
			"import React, { useContext} from 'react';",
			"",
			"const themes = {",
			"  light: {",
			"    foreground: \"#000000\",",
			"    background: \"#eeeeee\"",
			"  },",
			"  dark: {",
			"    foreground: \"#ffffff\",",
			"    background: \"#222222\"",
			"  }",
			"};",
			"",
			"const ThemeContext = React.createContext(themes.light);",
			"",
			"function App() {",
			"  return (",
			"    <ThemeContext.Provider value={themes.dark}>",
			"      <Toolbar />",
			"    </ThemeContext.Provider>",
			"  );",
			"}",
			"",
			"function Toolbar(props) {",
			"  return (",
			"    <div>",
			"      <ThemedButton />",
			"    </div>",
			"  );",
			"}",
			"",
			"function ThemedButton() {",
			"  const theme = useContext(ThemeContext);",
			"",
			"  return (",
			"    <button style={{ background: theme.background, color: theme.foreground }}>",
			"      I am styled by theme context!",
			"    </button>",
			"  );",
			"}"
		],
		"description": "generate context Hook"
	},
	"generate reducer Hook": {
		"prefix": "r_reducer",
		"body": [
			"import React, { useReducer } from 'react;",
			"",
			"const initialState = {count: 0};",
			"",
			"function reducer(state, action) {",
			"  switch (action.type) {",
			"    case 'increment':",
			"      return {count: state.count + 1};",
			"    case 'decrement':",
			"      return {count: state.count - 1};",
			"    default:",
			"      throw new Error();",
			"  }",
			"}",
			"",
			"function Counter() {",
			"  const [state, dispatch] = useReducer(reducer, initialState);",
			"  return (",
			"    <>",
			"      Count: {state.count}",
			"      <button onClick={() => dispatch({type: 'decrement'})}>-</button>",
			"      <button onClick={() => dispatch({type: 'increment'})}>+</button>",
			"    </>",
			"  );",
			"}"
		],
		"description": "generate reducer Hook"
	},
	"generate memo Hook": {
		"prefix": "r_memo",
		"body": [
			"import React, { useMemo } from 'react;",
			"",
			"//can use any functional comp instead on inline arrow function",
			"const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);"
		],
		"description": "generate memo Hook"
	},
	"generate ref Hook": {
		"prefix": "r_ref",
		"body": [
			"import React, { useRef} from 'react;",
			"",
			"function TextInputWithFocusButton() {",
			"  const inputEl = useRef(null);",
			"  const onButtonClick = () => {",
			"    // `current` points to the mounted text input element",
			"    inputEl.current.focus();",
			"  };",
			"  return (",
			"    <>",
			"      <input ref={inputEl} type=\"text\" />",
			"      <button onClick={onButtonClick}>Focus the input</button>",
			"    </>",
			"  );",
			"}"
		],
		"description": "generate ref Hook"
	},
}