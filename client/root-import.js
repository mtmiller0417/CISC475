module.exports = function(babel) {
    return {
	ImportDeclaration: function(path){
	    consoloe.log(path.node)
	}
    }
}
