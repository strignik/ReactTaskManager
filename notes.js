var Main = React.createClass({
    getInitialState() {
      return{
        tasks: [],
        value: ""
      }
    },
    addButton(){
      let newTasks = this.state.tasks;
      let date = new Date();
      date = date.getDate() +"."+ date.getMonth() +"."+ date.getFullYear();
      newTasks.push({
        text: ReactDOM.findDOMNode(this.refs.input).value,
        title: date
      });
      this.setState({
        tasks: newTasks,
        value: ""
      })
    },
    deleteButton(index){
      let newTasks = this.state.tasks;
      newTasks.splice(index, 1);
      this.setState({
        tasks: newTasks
      })
    },
    handleChange(){
      this.setState({
        value: ReactDOM.findDOMNode(this.refs.input).value
      })
    },
    render: function() {
      return(
        <div>
          <Navbar style={styles.navbar}>
              <div style={styles.logo}>
                <a>TODO</a>
              </div>
          </Navbar>
          <div style={styles.inputForm}>
            <FormControl
              ref={"input"}
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
          </div>
          <ButtonGroup vertical style={styles.buttonGroup}>
            <Button style={styles.button} onClick={() => {this.addButton()}}>PUSH NOTE</Button>
          </ButtonGroup>

          {this.state.tasks.map((elem, index) => {
            return(
              <Note key={index} title={elem.title} text={elem.text} deleteButton={this.deleteButton} index={index}/>
            )
          })}
        </div>
      )
    }
});

var Note = React.createClass({
  render: function(){
    return(
      <div style={styles.note}>
        <Panel header={<Header title={this.props.title} deleteButton={this.props.deleteButton} index={this.props.index }/>} bsStyle="primary">
          {this.props.text}
        </Panel>
      </div>
    )
  }
});

var Header = React.createClass({
  render: function(){
    return(
      <div style={styles.header}>
        {this.props.title}
        <Button style={styles.closeButton} onClick={() => {this.props.deleteButton(this.props.index)}}>X</Button>
      </div>
    )
  }
});

const styles = {
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: '2em'
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5px'
  },
  addButton: {
    backgroundColor: 'red',
    width: '100px',
  },
  inputForm: {
    margin:'5px'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: '5px',
  },
  note: {
    margin: '5px',
    wordWrap: 'break-word'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  closeButton: {
    width: '20px',
    height: '20px',
    padding: '0'
  }
}


ReactDOM.render(
    <Main />,
    document.getElementById('mount-point')
);
