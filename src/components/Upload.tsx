import React, {useState} from "react";
import {initializeApp} from "firebase/app";
import {getStorage, ref, StorageReference, uploadBytes} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAa3P8rquH_tuAi08XZPXrZgiHJgMyjycA",
  authDomain: "upload-storage-at.firebaseapp.com",
  projectId: "upload-storage-at",
  storageBucket: "upload-storage-at.appspot.com",
  messagingSenderId: "1065355321540",
  appId: "1:1065355321540:web:5b361d8def8dec8fd6a991"
};

export default function Upload() {
  const [selectedFile , setSelectedFile] = useState<File | undefined>();
  const [user, setUser] = useState <string | undefined>()
  const handleUpload = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if(!selectedFile) {
      alert("Please select a file first!")
      return
    }
    // connect to firebase project
    const app = initializeApp(firebaseConfig);
    // connect to our storage bucket
    const storage = getStorage(app); // can specifiy what bucket if on blaze plan
    // create a reference to our file in storage
    const filename: string = selectedFile?.name
    const imageRef: StorageReference = ref(storage, 'photos/' + selectedFile?.name);
    // (Todd's quick cheat) create the url from reference
    const url = `https://firebasestorage.googleapis.com/v0/b/upload-storage-at.appspot.com/o/photos%2F${filename}80fa6a603bf1435d9a19cabf0ff958ad.webp?alt=media`
    // upload file to bucket
    uploadBytes(imageRef, selectedFile)
    // add an await or .then and then update our database with url
    .then(fileinfo => {
      console.log(fileinfo)
      // todo send this forms information to the backend api
      fetch(process.env.REACT_APP_ENDPOINT+'/posts')
      .then(res => res.json())
      .then(data => {})
    })

  }
  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="photo" 
      onChange={(e: React.FormEvent<HTMLInputElement | any >) => setSelectedFile(e.currentTarget.files[0])}
      // value={selectedFile?.name}
      />
      <br/>
      <input  placeholder="User" type="text" name="user" id="user" 
      onChange={(e: React.FormEvent<HTMLInputElement> | any ) => setUser(e.value)} />
      <br/>
      <button type="submit">Upload</button>
    </form>
  )
}