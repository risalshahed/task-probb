import { useContext, useState } from 'react'
import { DataContext } from '../App';

export default function Image({ image }) {
  const {id, img} = image;
  // const {value1, value2} = useContext(CheckedContext);

  // const [isChecked, setIsChecked] = useState(value1);
  // console.log(isChecked);
  // const handleInputChange = useState(value2);

  // const [isChecked, setIsChecked] = useState(false);

  const { isChecked, setIsChecked } = useContext(DataContext);

  const handleInputChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className='img-container cursor-pointer group'>
        {/* class="mt-3 invisible peer-checked:visible" */}
        <img src={img} alt={`img-${id}`} className={`${isChecked ? 'brightness-90' : 'group-hover:brightness-50'} ${isChecked ? 'bg-black/10' : 'group-hover:bg-black/50'}`} />
        <input
          type="checkbox"
          className={`input absolute top-1 left-0 z-2 m-6 ${isChecked ? 'visible' : 'invisible group-hover:visible'}`}
          value={isChecked}
          onChange={handleInputChange}
        />
      </div>
      {/* <CheckedContext.Provider value={isChecked}>
        <Header />
      </CheckedContext.Provider> */}
    </>
  )
}