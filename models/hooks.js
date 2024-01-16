export const fixSaveError = (error, data, next) => {
  error.status(400);
  next();
}
export const fixUpdateSettings = function(next){
  this.options.new = true,
    this.options.runValidators = true
  next()
}