import React, {Component} from 'react';
import fetch from 'node-fetch';

export default class CurrentlyReading extends Component {
  state = {
    book: null
  };

  componentDidMount() {
    try {
      const cache = JSON.parse(localStorage.getItem('book'));
      if (cache.expiry > new Date().getTime() && cache.book) {
        this.setState({book: cache.book});
        return;
      }
    } catch (e) {
    }

    fetch(this.props.feed)
      .then(response => response.text())
      .then(response => new DOMParser().parseFromString(response, 'text/xml'))
      .then(xml => xml.querySelector("item"))
      .then(book => {
        return {
          'title': book.querySelector('title').textContent,
          'url': book.querySelector('link').textContent,
          'author': book.querySelector('author_name').textContent,
          'description': book.querySelector('book_description').textContent.replace(/<[^>]*>?/g, ' '),
          'imageUrl': book.querySelector('book_medium_image_url').textContent
        };
      })
      .then(book => {
        this.setState({book});
        localStorage.setItem('book', JSON.stringify({
          book,
          expiry: new Date().getTime() + 1 * 60 * 60 * 1000
        }));
      });
  }

  render() {
    const {book} = this.state;

    if (!book) {
      return (
        <div className="text-muted text-center">{this.props.loadingMessage}</div>
      );
    }

    return (
      <div>
        <img className="float-left mr-2" src={book.imageUrl} alt={book.title}/>
        <h2>
          <a href={book.url} target="_blank">{book.title}</a> by <a href={book.url} target="_blank">{book.author}</a>
        </h2>
        <p className="text-muted">
          {book.description}
        </p>
      </div>
    );
  }
}
