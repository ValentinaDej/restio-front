import { IoMdClose } from 'react-icons/io';

import Button from 'shared/Button/Button';
import css from './Dialog.module.scss';
import { addCommentForChef } from 'store/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Dialog = ({ id, setIsOpen }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const addCommentHandler = () => {
    dispatch(addCommentForChef({ id, comment }));
    setIsOpen(false);
  };
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const onCloseDialog = () => {
    setIsOpen(false);
  };
  return (
    <>
      <dialog open className={css.wrapper}>
        <IoMdClose className={css.close} onClick={onCloseDialog} />
        <p className={css.title}>Leave a comment for chef</p>
        <textarea className={css.textarea} onChange={onChangeHandler} />
        <Button size="sm" onClick={addCommentHandler}>
          Add
        </Button>
      </dialog>
    </>
  );
};

export default Dialog;
