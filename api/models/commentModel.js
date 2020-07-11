const db = require('../../database/connection');

async function add(user_id, entity_id, comment){
    const [entity] = await db('entity').insert({user_id: user_id}, 'id');
    return db('comments').insert({entity_id: entity_id, user_id: user_id, this_entity_id: entity, comment_data: comment}).returning('*');
}

function remove(entity_id, user_id){
    return db('comments').where({this_entity_id: entity_id, user_id: user_id}).del();
}

function getById(entity_id){
    return db('comments').where({this_entity_id: entity_id});
}

async function getAllByEntityId(master_entity){
    const [data] = await db('entity').where({ id: master_entity})
    const [comment_data] = await db('comments').where({this_entity_id: master_entity})
    comment_data != undefined ? data.comment = comment_data.comment_data : '';
    data.this_entity_id = master_entity;
    const comments = []
    comments.push(data);
    if(data != undefined || null) {
        await recursiveDownComments(data, 0, comments)
    } else {
        return comments;
    }
    return comments;
}

async function recursiveDownComments(node, index, comments){
    const data = await db('comments').where({ entity_id: node.this_entity_id })
    comments[index].comments = data;
    if(data != undefined || null) {
        await Promise.all(comments[index].comments.map(async (node_n, index_n) => {
            await recursiveDownComments(node_n, index_n, comments[index].comments)
        }));
    } else {
        return comments
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
};
