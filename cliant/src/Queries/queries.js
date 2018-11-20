//constructing a querry for all components
import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }`;


const getBooksQuery = gql`
{
    books{
        name
        id
    }
}`

// here we injected a variable passed from the ui to the query
const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            id
        }
    }`
    
const getBookQuery = gql`
    query($id:ID){
        book(id:$id){
            id
            name
            genre
            author{
                id 
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }`

export{getAuthorsQuery,getBooksQuery, addBookMutation, getBookQuery};