import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider } from 'material-ui/styles';
import { Stepper, Step, StepLabel, StepContent, TextField, FlatButton, DatePicker, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Chip, Avatar } from 'material-ui';
import { yellow200 } from 'material-ui/styles/colors';

const MAX_STEPS = 2;
const MIN_STEPS = 0;
const NEXT_LABEL='>';
var eventList = [];



class App extends Component{
    constructor(){
        super();
        this.state={
            activeIndex:0,
            nextLabelText:NEXT_LABEL,

            participants: [
                {label: 'Isco',src:'https://www.realmadrid.com/img/vertical_380px/isco_4am6555.jpg'},
                {label: 'Iniesta',src:'https://cdn.images.express.co.uk/img/dynamic/67/590x/Andres-Iniesta-Barcelona-927664.jpg'},
                {label: 'De Gea',src:'https://cdn.images.dailystar.co.uk/dynamic/58/photos/876000/620x/David-De-Gea-699409.jpg'},
                {label: 'Hector',src:'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p98745.png'},
            ],

            //event data
            eventName:'',eventDes:'',sDate:'',eDate:'',
            
        } 
        
    }

forwardStep =()=>{
    let i = this.state.activeIndex + 1;
    

    this.setState({
        activeIndex:(i<=MAX_STEPS)?i:this.state.activeIndex,
        nextLabelText:(i<MAX_STEPS)?NEXT_LABEL:'Finish'
    })
   
    //push to the event array
    if(i==MAX_STEPS+1){
        var newEvent = {
            EventName:this.state.eventName,
            EventDescription:this.state.eventDes,
            StartDate:this.state.sDate.toString(),
            EndDate:this.state.eDate.toString(),
            Participants: this.state.participants.map((person)=>person.label+',')
        };
        eventList.push(newEvent);
        //Return to 0th stepper
        this.setState(
            {   activeIndex:0,
                nextLabelText:NEXT_LABEL,
                eventName:'',eventDes:'',sDate:'',eDate:''
            }
        );
    }

}

setEventName = (e,v)=>{

    this.setState({eventName:v})
}
setEventDesc = (e,v)=>{

    this.setState({eventDes:v})
}
setEventSDate = (e,v)=>{
    this.setState({sDate:v})
}
setEventEDate = (e,v)=>{
    this.setState({eDate:v})
}

backwardStep = ()=>{
    let i = this.state.activeIndex - 1;
    this.setState({
        activeIndex:(i>=MIN_STEPS)?i:this.state.activeIndex,
        nextLabelText:NEXT_LABEL
    })   
}
confirmDelete = (index)=>{
  this.setState ({
    participants: this.state.participants.filter((_, i) => i !== index)
    });
}

getStepContent=(currentIndex)=>{
    
    //Create Chips for all participants
    let participantsChips = this.state.participants.map((person, index) => (
        <Chip  key={index} onRequestDelete={()=>{this.confirmDelete(index);}} style={{width:120}}>
            <Avatar src={person.src} />{person.label}
        </Chip>
    ));;

    switch(currentIndex){
        case 0:
            return(<div>Event Name : <TextField value={this.state.eventName} onChange={this.setEventName}/> <br/> Event Description: <TextField value={this.state.eventDes} onChange={this.setEventDesc}/></div>);

        case 1:
            return(<div>Start Date: <DatePicker value={this.state.sDate} onChange={this.setEventSDate}/> End Date: <DatePicker value={this.state.eDate} onChange={this.setEventEDate}/></div> );
        case 2:
            return(<div style={{flexWrap:true}}>
                 {participantsChips}
                </div>);


    }
}
    render(){
        
        return(
        <div>
            <MuiThemeProvider>
                <div id='stepper-wrap'>
                    <Stepper activeStep={this.state.activeIndex}>
                        <Step>
                            <StepLabel>Set event name and description</StepLabel>
                         </Step>
                         <Step>
                            <StepLabel>Set event date</StepLabel>
                         </Step>
                         <Step>
                            <StepLabel>Set event participants</StepLabel>
                         </Step>
                    </Stepper>
                </div>
                <div id='event-form-wrap'>
                    {this.getStepContent(this.state.activeIndex)}
                    <br/>
                    <div id='btn-wrap' style={{backgroundColor:yellow200,width:200,height:50}}>
                        <FlatButton label='<' onClick={this.backwardStep}/>
                        <FlatButton label={this.state.nextLabelText} onClick={this.forwardStep}/>

                    </div>
                </div>
                <div id='event-data-table-wrap'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Event Name </TableHeaderColumn>
                            <TableHeaderColumn>Description </TableHeaderColumn>
                            <TableHeaderColumn>Start Date </TableHeaderColumn>
                            <TableHeaderColumn>End Date </TableHeaderColumn>
                            <TableHeaderColumn>Participants </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            eventList.map(  function(event,index){                  
                                return(
                                        <TableRow>
                                            <TableRowColumn>{event.EventName}</TableRowColumn>
                                            <TableRowColumn>{event.EventDescription}</TableRowColumn>
                                            <TableRowColumn>{event.StartDate}</TableRowColumn>
                                            <TableRowColumn>{event.EndDate}</TableRowColumn>
                                            <TableRowColumn>{event.Participants}</TableRowColumn>
                                        </TableRow>
                                    );
                                    eventList = [];

                            })
                            
                        }
                    </TableBody>
                </Table>
                </div>
            </MuiThemeProvider>
            
        </div>)
    }
}


export default App;