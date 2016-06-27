const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String

});
//before saving instance of User run this bcrypt function:
UserSchema.pre('save', function(next){
  //this gets access to User Model
  const user = this;
//generate the salt
  bcrypt.genSalt(10, function(err,salt){
    if (err) { return next(err); }
//hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) { return next(err); }
      //overwrite plain text password with hashed password
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) { return callback(err); }
    callback(null, isMatch);
  });
}

const model = mongoose.model('User', UserSchema);

module.exports = model;
