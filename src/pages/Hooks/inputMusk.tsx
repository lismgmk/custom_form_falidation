import React, { useState, useEffect, useRef } from 'react';

const InputMask = () => {
  const [card, setCard] = useState();
  const inputCard = useRef();

  const handleChange = () => {
    // @ts-ignore
    const cardValue = inputCard.current.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    // @ts-ignore
    inputCard.current.value = !cardValue[2]
      ? cardValue[1]
      : `${cardValue[1]}-${cardValue[2]}${`${cardValue[3] ? `-${cardValue[3]}` : ''}`}${`${
          cardValue[4] ? `-${cardValue[4]}` : ''
        }`}`;
    // @ts-ignore
    const numbers = inputCard.current.value.replace(/(\D)/g, '');
    setCard(numbers);
  };

  useEffect(() => {
    handleChange();
  }, [card]);

  return (
    <>
      {/*// @ts-ignore*/}
      <input type="text" ref={inputCard} onChange={handleChange} />
    </>
  );
};

export default InputMask;
