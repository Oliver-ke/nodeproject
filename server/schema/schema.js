 // this tells node that this file requires graphql
 const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');


//grabbing variable

const {GraphQLObjectType,
     GraphQLString,
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
    } = graphql;
//dummy data

// var books = [
//     {name:'Name of the Wind', authorId: '1', genre: 'fantasy', id: '1'},
//     {name:'sole of the hear', authorId: '3', genre: 'fantasy', id: '2'},
//     {name:'gifted hands', authorId: '2', genre: 'romance', id: '3'},
//     {name:'wonder world', authorId: '4', genre: 'scific', id: '4'},
//     {name:'jerasic park', authorId: '5', genre: 'history', id: '5'},
//     {name:'just a programmer', authorId: '6', genre: 'fantacy', id: '6'},
//     {name:'just a programmer', authorId: '6', genre: 'fantacy', id: '7'},
// ];

// var authors = [
//     {name:'Ben Casin', age: 30, id: '1'},
//     {name:'Leather Ruth', age: 23, id: '2'},
//     {name:'Bin Amos', age: 40, id: '3'},
//     {name:'Wild Card', age: 56, id: '4'},
//     {name:'John Cake', age: 23, id: '5'},
//     {name:'Anderson Smith', age: 60, id: '6'},
// ];

// the schema enables us to do the follow
// 1. define an object type
// 2. define relationship between types
// 3. defining root querry

// mutation allow us to add,delete,change in db

//here we are defining object type Book and author
 
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        // relationship begins here
        author: {
            type: AuthorType,
            resolve(parent, args){
                // this is where the first argument parent comes in play, because
                // when we have nested data the main object is
                // passed to the parent argument in this case the book object
                //console.log(parent);

               // return _.find(authors,{id: parent.authorId});
               return Author.findById(parent.authorId)
            }
        }
    })
    
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
               // return _.filter(books,{authorId: parent.id})
               return Book.find({ authorId: parent.id})
            }
        }
    })
    
});


//root querries

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args:{id:{type: GraphQLID}},
            resolve(parent,args){
                //code to get data from db/other source
               // return _.find(books, {id:args.id});
               return Book.findById(args.id);
              
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return Author.findById(args.id)
            }  
        },
        books:{
            type: GraphQLList(BookType),
            resolve(parent,args){
               // return books
               return Book.find({})
            }
        },
        authors:{
            type: GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors
               return Author.find({});
            }
        }
    }
});

// knowin the querry form
// book(id:'1'){
//     name
//     genre
// }
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },

        addBook:{
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },

    }
})

module.exports = new  GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})