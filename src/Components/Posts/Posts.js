import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import { firebaseContext } from '../../store/Context';
import { ColorRing } from 'react-loader-spinner';
import './Post.css';
import { PostContext } from '../../store/PostContest';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Posts() {
  const { firebase } = useContext(firebaseContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setPostDetails } = useContext(PostContext)

  const history = useHistory();

  useEffect(() => {
    firebase.firestore().collection('products').get()
      .then((snapShot) => {
        const allProducts = snapShot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id
          };
        });
        setProducts(allProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="loader">
              <ColorRing />
            </div>
          ) : (
            products.map(product => (
              <div onClick={() => {
                setPostDetails(product)
                history.push('/view')
              }} className="card" key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price} </p>
                  <span className="kilometer">{product.category} </span>
                  <p className="name"> {product.name} </p>
                </div>
                <div className="date">
                  <span>{product.createdAt} </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="loader">
              <ColorRing />
            </div>
          ) : (
            products.map(product => (
              <div onClick={() => {
                setPostDetails(product)
                history.push('/view')
              }} className="card" key={product.id}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price} </p>
                  <span className="kilometer">{product.category} </span>
                  <p className="name"> {product.name} </p>
                </div>
                <div className="date">
                  <span>{product.createdAt} </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;

