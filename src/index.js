import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
const API_KEY = 'AIzaSyD_veoavNhnEUH_PFQPwwsPGwgg4W3HibU';

class App extends Component {
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo:null
        };
        this.videoSearch('surfboards');

    }
    videoSearch(term){
                
        YTSearch({key:API_KEY,term:term},  (videos) => {
            // console.log(videos)
            this.setState({ 
                videos, 
                selectedVideo: videos[0]
            });
        });
    }
    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300 );
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video = {this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos = {this.state.videos} />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.querySelector('.container'));










// export default class App extends Component {
//   constructor(){
//     super();

//     this.state = {
//       text:'',
//       todos:[],
//       currentIndex: null
//     }
//     this.add = this.add.bind(this);
//     this.updateText=this.updateText.bind(this);
//     this.cancel = this.cancel.bind(this);
//   }

//   updateText(e) {
//     this.setState({text:e.target.value})
//      }

//   add(){
//     const {todos,text} = this.state;
//     todos.push(text);
//     this.setState({todos,text:''});
//   }

// edit(index){
//   const{todos} = this.state;
//   this.setState({text:todos[index] ,currentIndex: index })
// }
// cancel() {

//   this.setState({text:'',currentIndex:null})
// }

// delete(index) {
//   const{todos} = this.state;
//   todos.splice(index,1);
//   this.setState({todos,currentIndex:null})
// }

//   renderTodos() {
//     const {todos} = this.state;
//   return <ol>{todos.map((item,index) => {
//     return <li>
//       {item}
//       <button onClick ={this.edit.bind(this , index)}>edit</button>
//       <button onClick = {this.delete.bind(this)}>delete</button>
//     </li>
//   })}
//   </ol>
//   }
//   render() {
//     const{currentIndex} = this.state;
//     return (
//       <div>
//         <input 
//                 placeholder = "Enter Something"
//                 onChange ={this.updateText}
//                 value= {this.state.text} 
//                 />
//           {currentIndex == null ?
//           <button onClick = {this.add}>add</button>
//           :
//           <div>
//             <button onClick = {this.cancel}>cancel</button>
//             <button onClick = {() => {}}>update</button>
//           </div>
//           }
//           <br/>
//           {currentIndex != null && <p>You are editing todos # {currentIndex + 1} currently!</p>}
//           {this.renderTodos()}
//           </div>
//     );
//   }
// }
