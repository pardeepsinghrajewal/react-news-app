

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import Simpletext from "./components/Simpletext";

import { BrowserRouter, Switch, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




export default class App extends Component {

  apiKey = process.env.REACT_APP_API_KEY;
  state = {
    progress : 0
  }

  setProgress = (progress) =>
  {
    this.setState({ progress : progress });      
  }

  render() {
    
    return (
      <>
      <BrowserRouter>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="home" />}/>
            <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="business" category="business"/>} />
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="entertainment" category="entertainment" />} />
            <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="health" category="health" />} />
            <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="science" category="science" />} />
            <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="sports" category="sports" />} />
            <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress}  key="technology" category="technology" />} />
            <Route exact path="/simpletext" element={<Simpletext />} />
          </Routes>


        </div>
      </BrowserRouter>
      </>
    )
  }
}
