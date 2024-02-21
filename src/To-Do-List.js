import React, {Component} from "react";
import axios from "axios";
import {Grid, Header, Form, Input, Icon} from "semantic-ui-react";

let endpoint = 'http://localhost:9000';

class ToDoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            task: "",
            tasks: "",
            items: [],
        };
    }

    componentDidMount(){
        this.getTask();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    onSubmit = () => {
        let { task } = this.state;
        if (task) { 
            axios.post(endpoint + '/api/task',
                { task, },
                "",
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '"Accept", "Content-Type", "Origin"',
                    },
                }).then((res) => {
                    this.getTask();
                    this.setState({
                        task: "",
                    });
                    console.log(res);
                });
        }
    };

    getTask = () =>{
        axios.get(endpoint + "/api/tasks").then((res)=>{
            if(res.data){
                this.setState({
                    items: res.data.map((item)=>{
                        let color ="blue";
                        let style = {
                            wordWrap: "break-word",
                        };
                        if(item.status){
                            color="green";
                            style["textDecorationLine"] = "line-through";
                        }

                        return(
                            <Grid.Row key={item._id} color={color} fluid >
                                <Grid.Column textAlign="left" width={5}>
                                    <div style={style}>{item.task}</div>
                                </Grid.Column>

                                <Grid.Column textAlign="left" width={10}>
                                    <Icon   
                                        name="check circle"
                                        color="white"
                                        size="middle"
                                        onClick={item.status ? ()=>this.undoTask(item._id) : ()=>this.updateTask(item._id)}
                                    />
                                    <span style={{paddingRight: 10}}>{item.status ? "Undo" : "Done"}</span>
                                    <Icon
                                        name="delete"
                                        color="red"
                                        size="middle"
                                        onClick={()=>this.deleteTask(item._id)}
                                    />
                                    <span style={{paddingRight: 10}}>Delete</span>
                                </Grid.Column>
                            </Grid.Row>
                        );
                    }),
                });
            }else{
                this.setState({
                    items: [],
                });
            }
        });
    };

    updateTask = (id) => {
        axios.put(endpoint+"/api/task/"+id, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    undoTask = (id) => {
        axios.put(endpoint+"/api/undoTask/"+id, {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    deleteTask = (id) => {
        axios.delete(endpoint+"/api/deleteTask/"+id, "", {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    render(){
        return(
            <div>
                <div className="row">
                    <Header className="header" as="h2" color="yellow">
                        ToDo Planner
                    </Header>
                </div>
                <div className="row">
                    <Form onSubmit={this.onSubmit}>
                        <Input 
                            type="text"
                            name="task"
                            onChange= {this.onChange}
                            value= {this.state.task}
                            fluid
                            placeholder="Create Task"
                        />
                        {/* <Button> Create Task </Button>*/}
                    </Form>
                </div>
                <div className="row">
                    <Grid celled>{this.state.items}</Grid>
                </div>
            </div>
        )
    }
}

export default ToDoList;

