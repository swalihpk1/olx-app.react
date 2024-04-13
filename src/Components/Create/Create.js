import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, firebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ColorRing } from 'react-loader-spinner'; 

const Create = () => {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
  const date = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !price.trim() || !image) {
      setError('Please fill out all fields');
      return;
    }

    setIsLoading(true); 

    firebase.storage().ref(`/image/${image.name}`).put(image)
      .then(({ ref }) => {
        ref.getDownloadURL()
          .then((url) => {
            console.log(url);
            firebase.firestore().collection('products').add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString()
            })
            history.push('/');
          })
          .catch((err) => {
            setIsLoading(false); 
            setError(err.message); 
          });
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              name="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
          </form>
          {error && <p className="error text-danger">{error}</p>} 
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
          <form>
            <br />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" />
            <br />

            {isLoading ? (
              <ColorRing />
            ) : (
              <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
            )}
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
