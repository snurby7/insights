exports.createUserCollection = async function(db) {
  db.createCollection("users", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "name", "salary" ],
          properties: {
             name: {
                bsonType: "string",
                description: "The name of the user"
             },
             salary: {
              minimum: 0,
              description: "Yearly salary"
             }
          }
       }
    }
 })
};