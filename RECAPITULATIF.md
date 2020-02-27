
# NodeJS ! 

> Un process intégrant un interpréteur JavaScript pour la gestion asynchrone des I/O


NodeJS offre un ensemble d'API :
* Interne pour son fonctionnement.
* Pour la gestion I/O

## npm

Gestionnaire de package NodeJS, fonctionnalités (code) externes installables.

Npm utilise  `package.json` comme bordereau de dépendances.

### Initialiser un projet 
`npm init` crée le  `package.json`

Usages du `package.json`
* Description du projet
* Gestion des dépendances
* Définition des scripts.

### Installation

Installe localement (répertoire courant) dans le dossier `node_module`

`npm i PACKAGE_NAME@SEM_VERSION`

`npm i PACKAGE_NAME --save-dev` sauve en *devDependencies*

### Execution de SCRIPT

Tous les scripts du `package.json` peuvent etre déclenchés avec `npm run SCRIPT`

eg. `npm run start` ou `npm start`

## API Node

* `http`
* `fs`
* `net`
* `os`
* `path`
* `util`
* `stream`
* `event`
* ``

## Ecosysteme Node

> https://www.npmjs.com/

* `html-miner` - html parser
* `nodemon` - relancer les dev
* `got` - request http
* `expressjs` - routerhttp
* `koa` + `koa-router` - routerhttp

## Node Concept fondamentaux

* `callback` - gestion de l'asynchronicité en JavaScript
Un fonction passée en référence a un *traitement (asynchrone)* pour etre *rappellée* a la fin de celui ci.

* `Stream` - ou flux de donnée en `input/output/duplex`.
    * `Buffer` - représentation de la donne sur un stream.
    * `Event`

* *module* la méthode globale `require` permet le cargmen de module (script javascript)
    * Ils répondent a une logique `import/export` 
        * import `require`
        * export `module.exports `
    * Un module est importer (charger) une seule fois dans le process
    * Ils ont leur propre scope.

Les `Stream` sont événementiels (prossibilité de programme des evenements.)

> **Progammation événementielle** abstraction de l'asynchronicité par l'abonnement du `callback` sur un évenement.
[Exemple](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gY2FsbGJhY2soKSB7CiAgICBjb25zb2xlLmxvZygnWW91IGNhbGxlZCB0aGUgY2FsbGJhY2shJyk7IAp9CgpmdW5jdGlvbiBmb28oKXsKICAgIGNvbnNvbGUubG9nKCdmb28nKQp9CgovL2ZvbygpCgoKY29uc29sZS5sb2coIldlbGNvbWUgISAiKTsKCnNldFRpbWVvdXQoY2FsbGJhY2ssIDIwMDApOwpzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTsgCgpjb25zb2xlLmxvZygiQnllICEiKTsKCiQub24oJ2J1dHRvbicsICdjbGljaycsIGNhbGxiYWNrICk7CgoK!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

`Stream.on('EVENT_NAME', callback)`
`Stream.addListener('EVENT_NAME', callback)`