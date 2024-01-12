module.exports = mongoose => {
    const schema = mongoose.Schema(
            {
                username: {type :String, unique : true},
                email: { type:String, unique:true },
                password: String,
                token : String,
                filename : String,
                roles: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "role"
                    }
                ]
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