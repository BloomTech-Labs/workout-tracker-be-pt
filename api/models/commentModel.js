const db = require('../../database/connection');

async function add(user_id, entity_id, comment){
    const [entity] = await db('entity').insert({user_id: user_id, type: 5}, 'id');
    return db('comments').insert({entity_id: entity_id, user_id: user_id, this_entity_id: entity, comment_data: comment}).returning('*');
}

function remove(entity_id, user_id){
    return db('comments').where({this_entity_id: entity_id, user_id: user_id}).del();
}

function getById(entity_id){
    return db('comments').where({this_entity_id: entity_id});
}

function getNumberOfComments(master_entity){
    return db('comments').where({ entity_id: master_entity }).count();
}

async function getAllByEntityId(master_entity){
    const [data] = await db('entity').where({ id: master_entity}) //gets the entity of from the master entity id incase its not a comment
    const [comment_data] = await db('comments').where({this_entity_id: master_entity}) //if its a comment we need to get the comment data
    comment_data != undefined ? data.comment = comment_data.comment_data : ''; //add the comment data to the inital data structure if it is indeed a comment
    data.this_entity_id = master_entity;
    const comments = []
    comments.push(data); // push it to an array we will use later for the recursive function 
    if(data != undefined || null) {
        await recursiveDownComments(data, 0, comments) //we await the return of all recursive functions
    } else {
        return comments; //if master node had no comments no need to recurse through null data
    }
    return comments; //makes sure to return once we are done awaiting 
}

async function recursiveDownComments(node, index, comments){ //accepts the parent node and the index of the given step of the array as well as passing the comment array
    const data = await db('comments').where({ entity_id: node.this_entity_id })
    comments[index].comments = data; // sets the data of the comment to the index of our current recursion 
    if(data != undefined || null) { //if the data isnt undefined then we need to iterate through the array of information
        await Promise.all(comments[index].comments.map(async (node_n, index_n) => { //awaits the promise of the map of a recursive function 
            await recursiveDownComments(node_n, index_n, comments[index].comments) //gets the node data again for each element in the array this is essentially a breadth first function as it goes through every single row then moves down to the next row till we reach the end
        }));
    } else {
        return comments //if its null we can return the comments aray now.
    }
}

function getAllByUserId(id){
    return db('comments').where({user_id: id}).orderBy('comments.created_at', 'desc');
}

module.exports = {
  add,
  remove,
  getById,
  getAllByEntityId,
  getAllByUserId,
  getNumberOfComments
};
