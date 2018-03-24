import React, { Component } from 'react'
import './Main.css'

import RespSuggest from '../RespSuggest/RespSuggest'
import MessageBubble from '../RespSuggest/MessageBubble/MessageBubble'
import Chat from '../Chat/Chat'



class Main extends Component {

  state = {
    arr: ['I need help', 'I want to report'],
    prevArr: [''],
    chatMsgs: ['Please describe your situation']
  }

  updateResponses = (arr, log) => {
    const prevArr = this.state.arr;
    const msgs = [...this.state.chatMsgs, log]
    this.setState({
      arr: arr,
      prevArr: prevArr,
      chatMsgs: msgs
    })

   
  }

  render() {

    const clickHandler = (msg) => {
      switch (msg) {
        case 'I need help':
          this.updateResponses(['I am injured', 'I am a hostage', 'Sausage', 'Hellu', 'I`m a kid', '＜'], 'I need help');
          break
        case 'I am injured':
          this.updateResponses(['I was shot', 'I have minor damages', '＜'], 'I am injured')
          break
        case '⬅︎':
          this.setState({ arr: this.state.prevArr })
          break
        case 'I want to report':
          this.updateResponses(['I am a sausage', 'I am dead huhu'], 'I am injured')
          break
        case 'I was shot':
          this.updateResponses(['＜'], 'Hang tight. The dispatcher will contact you shortly.')
      }
    }

    var request = require('request');

    var options = {
        url: 'https://gateway.watsonplatform.net/discovery/api/v1/environments/929b5158-90ab-4c50-8937-31e51eb083dc/collections/4308aa7a-a795-44a9-aac1-549c24ba89e2/query?version=2017-11-07&aggregation=term%28enriched_text.concepts.text%2Ccount%3A10%29&deduplicate=false&highlight=true&passages=true&passages.count=5&query=',
        auth: {
            'user': '478a2044-8a76-464b-ade4-0e2e67bf4baf',
            'pass': 'WHuMrL7uCyYF'
        }
    };

    const callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    const result = request(options, callback); // We have not trained the recognition of keywords yet, so now it is not giving accurate classification

    return (
      <div className='Main'>
        <h1>Shooting in Las Vegas</h1>
        <p>Today, 8:51pm − Now</p>

        <Chat messages={this.state.chatMsgs} />
        
        <div className="RespSuggest">
          {this.state.arr.map(msg => 
            <MessageBubble msg={msg} clicked={() => clickHandler(msg)} />
          )}
        </div>
      </div>
    );
  } 
}

export default Main
