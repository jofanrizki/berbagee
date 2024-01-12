module.exports = mongoose => {
    const schema = mongoose.Schema(
            {
                payment: String,
                message: String,
                status: String,
                payment_id: String
            },
            { timestamps: true }
        );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    const User = mongoose.model("user", schema);
    return User;
}