{
  //function component
  "functional component generator": {
    "prefix": "r_func",
    "body": [
      "import React from 'react'",
      "",
      "const ComponentName = props => {",
      "    return (",
      "    ",
      "    )",
      "}",
      "export default ComponentName"
    ],
    "description": "functional component generator"
  },
  //class component
  "class component generator": {
    "prefix": "r_class",
    "body": [
      "import React, { Component } from 'react'",
      "",
      "class Welcome extends Component{",
      "  render() {",
      "    return <h1>Hello, class</h1>;",
      "  }",
      "}",
      "export default Welcome "
    ],
    "description": "functional component generator"
  },
  //class comp with contructor
  "class component with constructor generator": {
    "prefix": "r_cc",
    "body": [
      "import React, { Component } from 'react'",
      "",
      "class Welcome extends Component{",
      "  constructor(props) {",
      "    super(props);",
      "    this.state = {",
      "      reptile: 'alligator',",
      "    };",
      "  }",
      "  render() {",
      "    return <h1>Hello, {this.state.reptile}</h1>;",
      "  }",
      "}",
      "export default Welcome "
    ],
    "description": "functional component generator"
  },
  // only constructor
  "constructor generator": {
    "prefix": "r_construct",
    "body": [
      "constructor(props) {",
      "  super(props);",
      "  // Don't call this.setState() here!",
      "  this.state = { counter: 0 };",
      "  this.handleClick = this.handleClick.bind(this);",
      "}"
    ],
    "description": "constructor generator"
  }

}