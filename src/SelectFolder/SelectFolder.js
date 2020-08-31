import React from 'react'
import APIContext from '../ApiContext'
import { NavLink } from 'react-router-dom'
import './SelectFolder.css'


class SelectFolder extends React.Component {
    static contextType = APIContext;
    render() {
        const {folders=[]} = this.context;
        console.log(folders)
        return(
            <div className="folder-select__container">
                <h2>Which Folder Do You Want To Add A Note To?</h2>
                <ul className="folder__list">
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='folder__link'
                                to={`/folder/${folder.id}/add-note`}
                            >
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default SelectFolder;