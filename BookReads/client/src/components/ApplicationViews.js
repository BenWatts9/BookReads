import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";
import BookList from "./Books/BookList";
import ReviewList from "./BookReview/ReviewList";
import CreateReviewForm from "./BookReview/CreateReviewForm";
import GroupList from "./Groups/GroupList";
import EditReviewForm from "./BookReview/EditReviewForm";


export default function ApplicationViews({ isLoggedIn, user }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="books" element={<BookList user={user}/>} />
          
          <Route path="bookStatus/:id" element={<ReviewList user={user} />} />

          <Route path="bookStatus/:id/CreateReview" element={<CreateReviewForm user={user} />}/>

          <Route path="bookStatus/:id/EditReview/:id" element={<EditReviewForm user={user} />}/>

          <Route path="groups/:id" element={<GroupList user={user} />}>
          </Route>
          


        </Route>
      </Routes>
    </main>
  );
}