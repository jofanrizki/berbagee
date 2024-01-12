module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: String,
            amount: String,
            message: String,
            status : Boolean
        },
        {timestamps : true}
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    const Donate = mongoose.model("donate", schema);
    return Donate;
}