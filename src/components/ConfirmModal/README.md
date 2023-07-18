## The component ConfirmModal has been created

### ConfirmModal:

This component accepts several props:

- message: The message that will be displayed in the modal window.
- onConfirm: A function that will be called when the user confirms.
- onCancel: A function that will be called when the user cancels.
- confirmButtonText: Confirm Button Text 
- denyButtonText: Deny Button Text 
- isOpen: is responsible for displaying the window
- setIsOpen:  function change state isOpen
When the user clicks the "Confirm" button, the onConfirm function is called. When the "Cancel" button is clicked, the onCancel function is called. The component also has an internal state isOpen which determines whether the modal window should be displayed.

To use this component, you can add it to a parent component and pass the necessary props.


###  This example demonstrates how to use ConfirmModal in a parent component.
```
import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import './styles.scss';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <h1>RESTio</h1>
          <div className="centered">
            <Button onClick={() => setIsOpen(true)}>Start</Button>
            {isOpen && (
              <ConfirmModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                message="Are you sure?"
                onConfirm={() => setIsOpen(false)}
                confirmButtonText={'confirm'}
                denyButtonText={'deny'}
                onCancel={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default App;
```