//Default props


// Function component
const MyComponent = (props) => <div {...props} />
MyComponent.defaultProps = { fruit: 'apple' }

// Class component
class MyComponent extends React.Component {
  static defaultProps = { fruit: 'apple' }
  render() { return <div {...this.props} /> }
}

-------------------------------------------------------------

// Error boundary

class MyErrorBoundary extends React.Component {
  state = { hasError: false }
  componentDidCatch(error, info) {...}
  render() {
    if (this.state.hasError) return <SomeErrorUI />
    return this.props.children
  }
}
const App = () => (
  <MyErrorBoundary>
    <Main />
  </MyErrorBoundary>
)
-------------------------------------------------------------

//valid Return types

const App = () => 'a basic string'    // string
const App = () => 1234567890          // number
const App = () => true                // boolean 
const App = () => null                // null
const App = () => <div />             // react element
const App = () => <MyComponent />     // component
const App = () => [                   // array
  'a basic string',
  1234567890,
  true,
  null,
  <div />,
  <MyComponent />,
]
-------------------------------------------------------------

//Fragments


// Does not support key attribute
const App = () => (
  <>
    <MyComponent />
  </>
)
// Supports key attribute
const App = () => (
  <React.Fragment key="abc123">
    <MyComponent />
  </React.Fragment>
)

-------------------------------------------------------------
//Hooks

// useState (Use over useReducer for basic state)
const [state, setState] = React.useState(initialState)
// useEffect (Runs after components have mounted)
    React.useEffect(() => {...}, [])
// useContext (Global state)
    const Context = React.createContext({ loaded: false })
    React.useContext(Context)
// useReducer (Use over useState for more complex state)
    const initialState = { loaded: false }
    const reducer = (state = initialState, action) => {...}
    const [state, dispatch] = React.useReducer(
      reducer,
      initialState
    )
// useCallback (Memoize functions)
    const handleClick = React.useCallback((e) => {...}, [])
// useMemo (Memoize values)
    import { compute } from '../utils'
    const memoize = React.useMemo(() => compute(miles, b), [b])
// useRef
    const timeoutRef = React.useRef()
    timeoutRef.current = setTimeout(() => {...}, 2000)
// useImperativeHandle (Customizes an assigned useRef)
    const MyComponent = (props, ref) => {
      const inputRef = useRef(null)
      React.useImperativeHandle(ref, () => inputRef.current)
      return <input type="text" name="someName" ref={inputRef} />
    }
// useLayoutEffect (Fires after all DOM mutations)
    React.useLayoutEffect(() => {...}, [])
// useDebugValue
    React.useDebugValue(10)


-------------------------------------------------------------
//strict mode (detecting depreciations and sideeffects)

const App = () => (
  <React.StrictMode>
    <div>
      <MyComponent />
      <OtherComponent />
    </div>
  </React.StrictMode>
)


-------------------------------------------------------------
//context, refs, memo, lazy, suspense

// createContext
const WeatherContext = React.createContext({ day: 3 })
const App = ({ children }) => {
  const [weather, setWeather] = React.useState(null)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    api.getWeather(...)
      .then(setWeather)
      .catch(setError)
  }, [])
  const contextValue = { weather, error }
  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  )
}
const SomeChild = () => {
  const { weather } = React.useContext(WeatherContext)
  console.log(weather)
  return null
}

// createRef (Obtain a reference to a react node)
const App = () => {
  const ref = React.createRef()
  React.useEffect(() => { console.log(ref.current) }, [])
  return <div ref={ref} />
}

// forwardRef (Pass the ref down to a child)
const Remote = React.forwardRef((props, ref) => (
  <div ref={ref} {...props} />
))
const App = () => {
  const ref = React.createRef()
  return <Remote ref={ref} />
}

// memo (Optimize your components to avoid wasteful renders)
const App = () => {...}
const propsAreEqual = (props, nextProps) => {
  return props.id === nextProps.id
} // Does not re-render if id is the same
export default React.memo(App, propsAreEqual)

// lazy -> Dynamic import. Reduces bundle size
// + Code splitting
const MyComponent = React.lazy(() => import('./MyComponent))
const App = () => <MyComponent />

// Suspend rendering while components are waiting for something
// + Code splitting
import LoadingSpinner from '../LoadingSpinner'
const App = () => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <MyComponent />
  </React.Suspense>
)

-------------------------------------------------------------
//Compoenent states

// Class component state
class MyComponent extends React.Component {
  state = { loaded: false }
  componentDidMount = () => this.setState({ loaded: true })
  render() {
    if (!this.state.loaded) return null
    return <div {...this.props} />
  }
}

// Function component state (useState/useReducer)
const MyComponent = (props) => {
  // With useState
  const [loaded, setLoaded] = React.useState(false)
  // With useReducer
  const [state, dispatch] = React.useReducer(reducer, initialState)
  if (!loaded) return null
  React.useEffect(() => void setLoaded(true))
  return <div {...props} />
}
-------------------------------------------------------------
//Props must never be directly changed (mutated):

// Components must ideally be 'pure' functions.
// That is, for every input, we be able to expect the same output

// we cannot do the following with props:
function Header(props) {
  // we cannot mutate the props object, we can only read from it
  props.username = "Doug";

  return <h1>Hello {props.username}</h1>;
}
// But what if we want to modify a prop value that comes in?
// That's where we would use state (see the useState section)

-------------------------------------------------------------
//Hydrate

const el = document.getElementById('app')
ReactDOM.hydrate(<App />, el)
 
//Use ReactDOM.hydrate instead of using ReactDOM.render if you’re rendering over the output of ReactDOMServer.

-------------------------------------------------------------
//Portals

render () {
  return React.createPortal(
    this.props.children,
    document.getElementById('menu')
  )
}
//This renders this.props.children into any location in the DOM.