import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Program from "../Program/Program";
import Contact from "../Contact/Contact";
import ProgramDetail from "../ProgramDetail/ProgramDetail";
import Cart from "../Cart/Cart";
import Checkout from "../Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<About/>} />
          <Route path="/program" element={<Program/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route exact path="/detail/:id" element={<ProgramDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
