import React from "react";
import { Container } from "semantic-ui-react";
import ToDoList from "./To-Do-List";
import Navbar from "./navbar";
import Footer from "./footer";

function App() {
  return (
    <div>
      <Navbar />
      <Container>
        <ToDoList />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
