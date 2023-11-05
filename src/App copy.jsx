import { createContext, useEffect, useState } from 'react'
import './App.css'
// import Home from './components/Home'
// import Header from './components/Shared/Header'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

// export const DataContext = createContext([]);
// export const CheckedContext = createContext([]);

function App() {
  const [images, setImages] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = id => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    fetch('data.json')
    .then(res => res.json())
    .then(data => setImages(data))
  }, [])

  // const [images, setImages] = useContext(DataContext);
  // const {value} = useContext(DataContext);
  // const [images, setImages] = value;
  console.log(images);

  const theImages = images?.map(image =>
    // <Image key={image.id} image={image} />
    <>
      <div className='img-container cursor-pointer group'>
        {/* class="mt-3 invisible peer-checked:visible" */}
        <img src={image.img} alt={`img-${image.id}`} className={`${isChecked ? 'brightness-90' : 'group-hover:brightness-50'} ${isChecked ? 'bg-black/10' : 'group-hover:bg-black/50'}`} />
        <input
          type="checkbox"
          className={`input absolute top-1 left-0 z-2 m-6 ${isChecked ? 'visible' : 'invisible group-hover:visible'}`}
          // value={isChecked}
          onChange={() => handleInputChange(image.id)}
        />
      </div>
    </>
  )

  // console.log(theImages);

  const SortableItem = SortableElement(({ value, index }) => (
    // <Image key={value.id} image={value} index={index} />
    <div className='img-container cursor-pointer group' index={index}>
      {/* class="mt-3 invisible peer-checked:visible" */}
      <img src={value.img} alt={`img-${value.id}`} className={`${isChecked ? 'brightness-90' :  'group-hover:brightness-50'} ${isChecked ? 'bg-black/10' :  'group-hover:bg-black/50'}`} />
      <input
        type="checkbox"
        className={`input absolute top-1 left-0 z-2 m-6 ${isChecked ? 'visible' : 'invisible group-hover:visible'}`}
        // value={isChecked}
        onChange={() => handleInputChange(value.id)}
      />
    </div>
  ))

  // console.log(SortableItem);

  const SortableImages = SortableContainer(({ items }) => {
    // console.log(items);

    return (
      <div className="gallery">
        {items?.sort((a, b) => a.position - b.position)
          .map((image, index) => (
            <SortableItem
              key={image.id}
              value={image}
              index={index}
            />
          ))
        }
      </div>
    )
  })

  // // setImages(1);
  // // console.log(images);

  // console.log(SortableImages);

  const handleSort = ({ oldIndex, newIndex }) => {
    let arr = arrayMove(images, oldIndex, newIndex);
    
    console.log('arr', arr);

    for (let i = 0; i < arr.length; i++) {
      arr[i].position = i;
    }
    setImages(arr);
  }
  
  return (
    <div className='app'>
      {/* ------------------------- Header ------------------------- */}
      <header>
        <h2>Gallery</h2>
        <button>Delete file(s)</button>
      </header>
      <hr />
      <div style={{padding: '32px 0', margin: '32px auto', width: '75%'}}>
        <SortableImages items={images} onSortEnd={handleSort} axis='xy' />
      </div>
    </div>
  )

  // return (
  //   <CheckedContext.Provider value={{value1: [isChecked, setIsChecked], value2: handleInputChange}}>
  //     <DataContext.Provider value={[images, setImages]}>
  //       <div className='app'>
  //         <Header />
  //         <Home />
  //       </div>
  //     </DataContext.Provider>
  //   </CheckedContext.Provider>
  // )
}

export default App