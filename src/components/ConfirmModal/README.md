## The component ConfirmModal has been created

### ConfirmModal:

This component accepts several props:

- message: The message that will be displayed in the modal window.
- onConfirm: A function that will be called when the user confirms.
- onCancel: A function that will be called when the user cancels.
When the user clicks the "Confirm" button, the onConfirm function is called. When the "Cancel" button is clicked, the onCancel function is called. The component also has an internal state isOpen which determines whether the modal window should be displayed.

To use this component, you can add it to a parent component and pass the necessary props.


###  This example demonstrates how to use ConfirmModal in a parent component.

**import React, { useState } from 'react';**
**import Footer from './components/Footer/Footer';**
**import Header from './components/Header/Header';**
**import Button from './components/Button/Button';**
**import ConfirmModal from './components/ConfirmModal/ConfirmModal';**
**import './styles.scss';**

**const App = () => {**
 ** const [isModalOpen, setIsModalOpen] = useState(false);**

  **const handleButtonClick = () => {**
    **setIsModalOpen(true);**
  **};**

  **const handleConfirm = () => {**
    **// Confirmation logic**
    **setIsModalOpen(false);**
  **};**

  **const handleCancel = () => {**
    **// Cancellation logic**
    **setIsModalOpen(false);**
 ** };**

  **return (**
    **<>**
     ** <Header/>**
      **<main className="main">**
        **<div className="main__container">**
          **<h1>RESTio</h1>**
          **<div className="centered">
           ** <Button onClick={handleButtonClick}>Start</Button>**
            **{isModalOpen && (**
              **<ConfirmModal**
               ** message="Are you sure?"**
                **onConfirm={handleConfirm}**
                **onCancel={handleCancel}**
              **/>**
           **)}**
          **</div>**
        **</div>**
      **</main>**
      **<Footer/>**
    **</>**
 **);**
**};**
**export default App;**
