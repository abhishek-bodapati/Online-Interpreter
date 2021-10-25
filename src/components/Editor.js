import React, { Component } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import './Editor.css'
import 'codemirror/lib/codemirror.css';
require('codemirror/mode/python/python');

class Editor extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            code: '',       // The code is stored here!!
            inputs: '',     // The inputs are stored here!!
            endpoint:"ws://localhost:8765",
            messages:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        this.setState({ inputs: event.target.value });
    }
    
    handleSubmit(event) {
        const { code, inputs } = this.state
        event.preventDefault();
        //alert(`Code is ${code}\nInputs are ${inputs}`);  
        this.componentDidMount();
    }

    componentDidMount(){
        //initialize connection
        const ws = new WebSocket(this.state.endpoint);

        ws.onopen = () =>{
            //send any msg from Client if needed
            ws.send(JSON.stringify({message:this.state.code, inputs:this.state.inputs}));
            //ws.send();
        }

        //save whatever response from client
        ws.onmessage = (evt) => {
            this.setState({ messages: evt.data });
        }
    }

    render() {
        return (
            <div>
                <center><h1>Python Interpreter</h1></center>
                <form onSubmit={this.handleSubmit}>
                    <div id="editor">
                    <CodeMirror
                        value='# Write your python code here...'
                        options={{
                            mode: 'python',
                            lineNumbers: true,
                            smartIndent: true,
                        }}
                        onChange={(editor, data, value) => {
                            this.setState({code: value})
                        }}
                        defaultValue={null}
                    />
                    </div>

                    <center>
                        <input 
                            type = "submit" 
                            className="btn btn-primary btn-lg" 
                            value = "Run" 
                        />
                    </center>

                    <button onClick={this.handleSubmit}></button>
                    
                    <center>
                        <div className="textAreaColumn">
                            <div>
                                <span><h2>Input</h2></span>
                                <textarea 
                                    id = "inputs" 
                                    cols="150" 
                                    rows="10" 
                                    defaultValue="" 
                                    value={this.state.inputs} 
                                    onChange={this.handleInputChange}
                                ></textarea>
                            </div>
                            <div>
                                <span><h2>Output</h2></span>
                                <textarea 
                                    readOnly 
                                    cols="150" 
                                    rows="10" 
                                    id="output"
                                    value={this.state.messages}
                                ></textarea>
                            </div>
                        </div>
                    </center>
                </form>    
            </div>
        );
    }
}

export default Editor;

















/*
    handleChange(event){
        this.setState({
          [event.target.name] : event.target.value
        })
    }

    <textarea 
        id = "inputs" 
        cols="150" 
        rows="10" 
        defaultValue="" 
        value={this.state.code} 
        onChange={this.handleCodeChange}
    ></textarea>
    
    
        const connection = new WebSocket('ws://localhost:8765');

        connection.onopen = () => {
        console.log('connected');
        };

        connection.onclose = () => {
        console.error('disconnected');
        };

        connection.onerror = error => {
        console.error('failed to connect', error);
        };
        connection.send(JSON.stringify({message:code, inputs:inputs}));

        connection.onmessage = () => {
        document.getElementById("output").innerHTML = event.data;
        }    
    
*/
    