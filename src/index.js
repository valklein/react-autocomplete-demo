import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

import './styles.css'

class AutoComplete extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
         <div>{suggestion.display}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {

const client = axios.create({
    baseURL: 'http://suggest-svc:8375/suggest'
});

client.defaults.headers['Content-Type'] = 'application/json';


    client
      .post('http://suggest-svc:8375/suggest', {
        suggest: {
          mysuggest: {
            prefix: value,
	    completion: {
		field : "suggests"
	    },
	    highlight: {
		field: "display"
	    }
          }
        }
      })
      .then(res => {
        console.log(res.data.suggests)
        if (res.data.suggests.suggestions!=null) {
          const results = res.data.suggests.suggestions.map(h => h)
          this.setState({ suggestions: results })
        }
      })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'place or street name or zip code',
      value,
      onChange: this.onChange
    }
    return (
      <div className="App">
        <h1>AutoComplete Lucino Server Demo</h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.display}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
   )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<AutoComplete />, rootElement)
