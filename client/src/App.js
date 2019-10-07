import React from 'react';
// We have created a component called MainContainer.js in our directory.
// In order to use it in App.js, we have to import it. Note that you don't
// need to add .js to the file name at the end (so the last part doesn't have
// to be /MainContainer.js)
import MainContainer from './components/MainContainer/MainContainer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      {
        // This comment is in reference to using MainContainer below. As you can see,
        // we use it just like an HTML tag, except we can pass in "props". In this case
        // we are passing a random message in it. In MainContainer.js, you can see how we
        // use this field
      }
      <Header />
      <MainContainer message="Hello World" />
    </div>
  );
}

export default App;
