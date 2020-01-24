
//Simulate (basic)

function handleClick () {
  console.log('A click was simulated.');
}

var subject = TestUtils.renderIntoDocument(
  <div onClick={handleClick} />
);

TestUtils.Simulate.click(subject);

---------------------------------

//Simulate (with data)
var TestUtils = React.addons.TestUtils;

function handleChange (event) {
  console.log('A change was simulated with key: ' + event.key);
}

var subject = TestUtils.renderIntoDocument(
  <input type="text" onChange={handleChange} />
);

TestUtils.Simulate.change(subject, { key: "Enter" });

----------------------------------

//isElement
var TestUtils = React.addons.TestUtils;

expect(TestUtils.isElement(<div />)).toBe(true);
expect(TestUtils.isElement({})).toBe(false);

----------------------------------
//Shallow rendering (basics)

var TestUtils = React.addons.TestUtils;

// Shallow rendering works only with composite components
var MyComponent = React.createClass({
  render () {
    return <div />;
  }
});

// 1. create a renderer
var renderer = TestUtils.createRenderer();

// 2. render component into renderer
renderer.render(<MyComponent />);

// 3. capture renderer output
var subject = renderer.getRenderOutput();

// 4. make assertions
expect(subject.type).toBe('div');

----------------------------------
//Shallow rendering (type example)

var TestUtils = React.addons.TestUtils;

var MyComponent = React.createClass({
  render () {
    return <div />;
  }
});

var renderer = TestUtils.createRenderer();

renderer.render(<MyComponent />);

var subject = renderer.getRenderOutput();

expect(subject.type).toBe('div');  // => true

-------------------------------------------------------
//Shallow rendering (props example)

var TestUtils = React.addons.TestUtils;

var MyComponent = React.createClass({
  render () {
    return <div {...this.props} />;
  }
});

var renderer = TestUtils.createRenderer();

renderer.render(
  <MyComponent className="my-component" />
);

var subject = renderer.getRenderOutput();

expect(subject.props.className).toBe('my-component');

-------------------------------------------------------
//Shallow rendering (child-count example)
var TestUtils = React.addons.TestUtils;

var MyList = React.createClass({
  render () {
    return (
      <ul>
        {this.props.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
});

var renderer = TestUtils.createRenderer();

renderer.render(
  <MyList items={[1, 2, 3]} />
);

var subject = renderer.getRenderOutput();

var childCount = React.Children.count(subject.props.children);

-------------------------------------------------------
//Shallow rendering (child-equality example)
var TestUtils = React.addons.TestUtils;

var MyComponent = React.createClass({
  render () {
    return <div {...this.props} />;
  }
});

var renderer = TestUtils.createRenderer();

renderer.render(
  <MyComponent>
    <div>Thing 1</div>
    <div>Thing 2</div>
  </MyComponent>
);

var subject = renderer.getRenderOutput();

expect(subject.props.children).toEqual([
  <div>Thing 1</div>,
  <div>Thing 2</div>
]);

-------------------------------------------------------
//Shallow rendering (events example)

var TestUtils = React.addons.TestUtils;

var MyComponent = React.createClass({
  render () {
    return <div {...this.props} />;
  }
});

var renderer = TestUtils.createRenderer();

var spy = expect.createSpy();

renderer.render(
  <MyComponent onClick={spy} />
);

var subject = renderer.getRenderOutput();

expect(spy.call.length).toEqual(1); // => true


-------------------------------------------------------
//Shallow rendering (state changes example)

var TestUtils = React.addons.TestUtils;

var ClickCounter = React.createClass({
  getInitialState () {
    return { count: 0 };
  },
  render () {
    return (
      <div onClick={this.handleClick}>
        {this.state.count}
      </div>
    );
  },
  
  handleClick () {
    this.setState({
      count: this.state.count + 1
    });
  }
});

var renderer = TestUtils.createRenderer();

renderer.render(<ClickCounter />);

var result = renderer.getRenderOutput();

expect(result.props.children).toEqual(0);

result.props.onClick();

var clickedResult = renderer.getRenderOutput();

expect(clickedResult.props.children).toEqual(1);

