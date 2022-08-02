import React from "react";
import { getAllBooks } from "../modules/bookManager";
import { useState, useEffect, useRef } from "react";
import "./Hello.css"

export default function Hello() {
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay= 4000
  
  const getBooks = () => {
    getAllBooks().then((res)=> setBooks(res))
  }

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(()=> {
    resetTimeout()
    timeoutRef.current = setTimeout(
      ()=> 
        setIndex((prevIndex) => 
          prevIndex === books.length -1 ? 0 : prevIndex + 1
          ),
        delay
      );
      return () => {
        resetTimeout();
      }
  }, [index]);

  useEffect(()=>{
    getBooks()
  },[])


  
  return (
    <>
    <div style={{
      
      left: 0,
      right: 0,
      top: "25%",
      marginTop: "-0.5rem",
      textAlign: "center",
      fontSize: "50px"
    }}>BookReads</div>

    <div className="slideshow">
      <div className="slideshowSlider"
            style={{  transform: `translate3d(${-index*100}%,0,0)`}}>
              {books.map((book,index) => (
                <img
                  className="slide"
                  key={index}
                  src={book.imageLocation} alt="Book Cover"
                  />
              ))}
      </div>

      {/* <div className="slideshowDots">
        {books.map((_, idx) => (
          <div
          key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div> */}
    </div>

    </>
  );
}