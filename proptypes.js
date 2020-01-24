import PropTypes from 'prop-types'


//Basic types
MyComponent.propTypes = {
  email:      PropTypes.string,
  seats:      PropTypes.number,
  callback:   PropTypes.func,
  isClosed:   PropTypes.bool,
  any:        PropTypes.any
}

//Enumerables (oneOf)
MyCo.propTypes = {
  direction: PropTypes.oneOf([
    'left', 'right'
  ])
}

//Custom validation
MyCo.propTypes = {
  customProp: (props, key, componentName) => {
    if (!/matchme/.test(props[key])) {
      return new Error('Validation failed!')
    }
  }
}

//Arrays and objects

MyCo.propTypes = {
  list: PropTypes.array,
  ages: PropTypes.arrayOf(PropTypes.number),
  user: PropTypes.object,
  user: PropTypes.objectOf(PropTypes.number),
  message: PropTypes.instanceOf(Message)
}
MyCo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age:  PropTypes.number
  })
}

//Elements

MyCo.propTypes = {
  // React element
  element: PropTypes.element,

  // num, string, element, or an array of those
  node: PropTypes.node
}

//Required types

MyCo.propTypes = {
  name:  PropTypes.string.isRequired
}



{/**

import PropTypes from 'prop-types'

any	Anything

-Basic-

string	 
number	 
func	Function
bool	True or false

-Enum-

oneOf(any)	Enum types
oneOfType(type array)	Union

-Array-

array	 
arrayOf(…)	 

-Object-

object	 
objectOf(…)	Object with values of a certain type
instanceOf(…)	Instance of a class
shape(…)	 

-Elements-

element	React element
node	DOM node

-Required-

(···).isRequired	Required
*/}
