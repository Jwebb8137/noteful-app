import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import NotePage from './components/Notes/NotePage';
import FolderPage from './components/Folders/FolderPage';
import NoteContext from './NoteContext';
import AddFolder from './components/Folders/AddFolder';
import AddNote from './components/Notes/AddNote';

export default class App extends Component {
  state ={
    folders: [],
    notes: [],
    error: null
  }

  onChangeHandler = (e) => {
    this.setState({path: e.target.name})
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  deleteFolder = folderId => {
    const newFolders = this.state.folders.filter(folder =>
      folder.id !== folderId
    )
    this.setState({
      folders: newFolders
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      addFolder: this.addFolder,
      deleteFolder: this.deleteFolder,
      notes: this.state.notes,
      addnote: this.addNote,
      deleteNote: this.deleteNote,
    }

    return (
      <div className="App">
        <Header />
        <div className='container'>
          <NoteContext.Provider value={contextValue}>
            <main className='form__container'>
              <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/note/:noteId' component={NotePage}/>
                <Route exact path='/addFolder' component={AddFolder}/>
                <Route exact path='/addNote' component={AddNote}/>
                <Route path='/folder/:folderId' component={FolderPage}/>
              </Switch>
            </main>
          </NoteContext.Provider>
        </div>
      </div>
    );  
  }
}
