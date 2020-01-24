import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
<Router>
  <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
    <Switch>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </div>
</Router>

---------------------------------------------------------------------------------------------------------------------------------

//Nested Routing
import {
  useRouteMatch,
  useParams
} from "react-router-dom";

<Router>
  <div>
    <li>
      <Link to="/topics">Topics</Link>
    </li>
    <Switch>
      <Route path="/topics">
        <Topics />
      </Route>
    </Switch>
  </div>
</Router>

function Topics() {
  let match = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>
      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

-------------------------------------------------------------------------------------------------------------------------------
import {
  useLocation
} from "react-router-dom";

export default function QueryParamsExample() {
  return (
    <Router>
      <QueryParamsDemo />
    </Router>
  );
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
  let query = useQuery();

  return (
    <ul>
      <li>
        <Link to="/account?name=netflix">Netflix</Link>
      </li>
    </ul>
    <Child name={query.get("name")} />
  );
}

function Child({ name }) {
  return (
    {name ? (
      <h3>
        The <code>name</code> in the query string is &quot;{name}
        &quot;
      </h3>
    ) : (
      <h3>There is no name in the query string</h3>
    )}
  );
}


-----------------------------------------------------------------------------------------------------------------------------   
// Redirects example
----------------------------------------------------------------------------------------------------------------------------
import {
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
          {/*children has comp*/}
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

