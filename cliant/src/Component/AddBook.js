import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../Queries/queries'
//react apollo glues the data to react component



    class AddBook extends Component {
        state = {
            name: '',
            genre: '',
            authorId: ''
        }
        displayAuthors = ()=>{
           // let data = this.props.data; chenge cuz we composed querries
           let data = this.props.getAuthorsQuery;
            if(data.loading){
                return(
                    <option disabled>Loading Authors..</option>
                )
            }
            else{
                return(
                    data.authors.map((author) =>{
                        return(
                            <option key={author.id}  value={author.id}>{author.name}</option>
                        )
                    })
                )
            }
        }

        submitForm = (e)=>{
            e.preventDefault();
            console.log(this.state);
            this.props.addBookMutation({
                variables:{
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: this.state.authorId
                },
                refetchQueries: [{
                    query: getBooksQuery
                }]
            });
            if(this.props.getAuthorsQuery.loading == false){
                this.setState({name:'',genre:'',authorId:''})
            }
        }
       
        render() {
        
          return (
            <form onSubmit={this.submitForm} className="add-book">
                <div className="field">
                    <label>Book Name</label>
                    <input value={this.state.name} type="text" onChange={(e) => this.setState({name: e.target.value})} />
                </div>
                <div className="field">
                    <label>Genre</label>
                    <input value={this.state.genre} type="text" onChange={(e) => this.setState({genre: e.target.value})} />
                </div>
                <div className="field">
                    <label>Author</label>
                    <select onChange={(e) => this.setState({authorId: e.target.value})}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>

            </form>
          );
        }
      }
      
      export default compose(
          graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
          graphql(addBookMutation, {name:"addBookMutation"}),
      )(AddBook);