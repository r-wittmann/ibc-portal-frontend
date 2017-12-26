import React, { Component } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TextEditor extends Component {
    onEditorStateChange = (editorState) => {
        this.props.onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
        this.setState({
            editorState,
        });
    };

    constructor(props) {
        super(props);
        const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)));
        this.state = {
            editorState,
        }
    }

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                wrapperStyle={{ margin: 10 }}
                editorStyle={{ maxWidth: 1152, minHeight: 128, maxHeight: 512, padding: 5, border: 'solid black 1px' }}
                toolbarStyle={{ maxWidth: 1152, border: 'solid black 1px', backgroundColor: '#dcdcdc' }}
                onEditorStateChange={this.onEditorStateChange}
            />
        );
    }
}

export default TextEditor;
