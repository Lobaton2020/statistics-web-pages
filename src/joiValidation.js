class ValidationError extends Error{
    constructor(msg){
        super(msg)
        this.whatClass = ValidationError.name;
    }
}
/**
 *
 * @param {*} schema
 * @param {*} data
 * @returns
 */
module.exports = function (schema, data){
    return new Promise((resolve, reject)=>{
        const result = schema.validate(data);
        if (result.error) {
            return reject(new ValidationError(result.error));
        }
        resolve(true)
    })

}

module.exports.ValidationError = ValidationError