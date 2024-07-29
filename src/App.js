import { Auth } from './components/Auth';
import { db, auth, storage } from './config/firebase';
import './App.css';
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc,doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage';

function App() {

  const [fileUpload, setFileUpload] = useState(null)
  const [movieList, setMovieList] = useState([])
  const moviesCollectionRef = collection(db, "movies")

  // movie states
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isOscar, setIsOscar] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState('')
  
  
  const getMovieList = async () => {
    
    try{
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }
      ))
      setMovieList(filteredData);
    }catch(e){
      console.error(e)
    }
    
  };

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

    try{
      await uploadBytes(filesFolderRef, fileUpload);
    }catch(e){
      console.error(e)
    }

  }


  
  const deleteMovie = async (id) => {
    
      const movieDoc = doc(db, 'movies', id)
      await deleteDoc(movieDoc)
      setMovieList(prevList => prevList.filter(movie => movie.id !== id));
    
  }

  const updateMovieTitle = async (id) => {
      const movieDoc = doc(db, 'movies', id)
      await updateDoc(movieDoc, {Title: updatedTitle})
      
      setMovieList(prevList => prevList.map(movie => 
        movie.id === id ? { ...movie, Title: updatedTitle } : movie
      ));
      setUpdatedTitle('');


      
  }


  useEffect(() => {
    getMovieList();
    
  } , []);
  
  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        releaseDate: newReleaseDate,
        wonOscar: isOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    }catch(e){
      console.error(e)
    }
  }



  return (
    <div className="App">
      <div> {auth.currentUser ? (<div> signed in {auth?.currentUser?.email} </div>) : (<div> signed out </div>)}  </div>
    <Auth/>


    <div>
      <input onChange={(e) => {setNewMovieTitle(e.target.value)}} placeholder='Movie Title...'/>
      <input onChange={(e) => {setNewReleaseDate(e.target.value)}} placeholder='Release Date...' type='number'/>
      <input type='checkbox' checked={isOscar} onChange={(e) => setIsOscar(e.target.checked)}/>
      <label>Won an Oscar</label>

      <button onClick={onSubmitMovie}>Add Movie!</button>
    </div>


    <div>
      {
        movieList.map((movie) => {
          return(
            <div>
              <h1 style={{color: movie.wonOscar ? "green" : "red"}}>{movie.Title}</h1>
              <h1>{movie.releaseDate}</h1>

              <button onClick={() => {deleteMovie(movie.id)}}>Delete Movie</button>

              <input placeholder='new title...' onChange={(e) => {setUpdatedTitle(e.target.value)}}/>
              <button onClick={() => updateMovieTitle(movie.id)}> Update Title </button>
              
            </div>
          )
        })
      }
    </div>

    <div>
      <input type='file' onChange={(e) => {setFileUpload(e.target.files[0])}}/>
      <button onClick={uploadFile}> Upload File </button>
    </div>
    </div>
  );
}

export default App;
