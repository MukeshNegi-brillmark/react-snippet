{/* Inline Styles */}

//styles.js
export default {
  root: {
    maxWidth: '200px',
    color: 'red',
  },
};

//app.js
import styles from './styles.js'

<div styles={styles.root}>Welcome to inline Styles</div>

------------------------------------------------------------------------------

//Style with Radium

//Radium = inlineSyles + media query + pseudo selectors + keyframes

//npm install Radium

// import radium in every component we style
// and wrap component with HOC Radium comp

import Radium from 'radium';

export default Radium(function MyCom( {children} ) {

  return <div>{children}</div>
});

-----------------------

// For radium gloabal style sheet
import { Style } from 'radium';
//put in app level
<Style rules={styles} />

-----------------------
//radium needs a array to merge multiple styles unlike inline where we use spred operator but order matters
<article style={[styles.root, props.style]}></article>

-----------------------
// pseudo selectors

const btn = {
  padding: 20;
  fontSize: 24;
  background: 'transparent';
  ':hover': {
    transition: 'all 1s';
    color: 'green'
  };
}

export default {
  root: {
    width: '100%';
  },
  btn,
  prev
}

//every pusedo selector ele req a key attribute or a ref
<button key='prev' style={style.btn}></button>

----------------------------------------------------------------------------------
//animation

const pulse = Radium.keyframes({
  '0%': { transform: 'scale3d(1,1,1)' },
  '20%': { transform: 'scale3d(1.05,1.05,1.05)' },
  '100%': { transform: 'scale3d(1,1,1)' },
}, 'Nav')
//second arg is oprional

const btn = {
  padding: 20;
  fontSize: 24;
  background: 'transparent';
  ':hover': {
    animation: 'placeholder 1s infinite',
    animationName: pulse,
  };
}

wrap your root comp with <StyleRoot></StyleRoot>
import {Style, StyleRoot} from 'radium'

