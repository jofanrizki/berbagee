module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: String,
            description: String,
        },
        {timestamps : true}
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    const Testing = mongoose.model("testing", schema);
    return Testing;
}