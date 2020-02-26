

class User {
    /*  */
    static count(){
        User.num =  User.num + 1 | 0;
    }
    constructor(name){  
        User.count()
        this.name = name;
    }
    greet(){
        console.log('Hello, I am', this.name);
    }
}

class SuperUser extends User {
    /*  */
    constructor(name, power){
        super(name)
        this.power = power;
    }
/*     greet(){
        console.log('Bazinga')
    } */
    buzz(){
        super.greet()
        console.log(this.power)
    }
}

const user1 = new SuperUser('bob','tricotterrrr')

user1.buzz()
user1.greet()