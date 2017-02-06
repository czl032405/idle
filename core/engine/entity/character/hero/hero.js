const Character = require("../character.js");
const Data = require('../../../data/data.js'); 
class Hero extends Character {
    constructor(name, baseProps, job, skills, equits) {
        super(name, baseProps, skills, equits);
        this.job = job;
    }

    static build(name, baseProps, job, skills, equits) {
        var classPath = path.resolve(__dirname, `./${job}.js`);
        var exist = fs.existsSync(classPath);
        if(exist){
            var HeroClass = require(classPath);
            var hero = new HeroClass(name,baseProps,skills,equits);
            return hero;
        }
        else{
            return new Hero(name, baseProps, job, skills, equits)
        }

    }

    /**
     * @param {Object} hero 持久层hero
     */
    static canLearn(hero){
        
    }



  


 
}
module.exports = Hero;