import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,urlToImage,url,author,publishedAt} = this.props;
    
    return (
      <>
        <div className="card">
          <img src={urlToImage?urlToImage:'default.jpeg'} className="card-img-top" alt="image" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"><small className="text-muted">By {author?author:'unknown'} on {new Date(publishedAt).toLocaleDateString()}</small></p>
            <p className="card-text">{description}</p>
            <a target="_blank" href={url?url:'/#'} className="btn btn-sm btn-primary">Read more..</a>
          </div>
        </div>
      </>
    )
  }
}
