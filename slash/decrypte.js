/* eslint-disable indent */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decrypte')
        .setDescription('Hugo vien décrypter.'),
        
    async execute(interaction) {
        let files = fs.readdirSync("assets/imgUgo/");
        const options = [
            "Ca me rapelle la fois ou maddy a baiser ma mère",
            "J'etais comme ca :0",
            "je deteste quans ça m'arrive",
            "salu c moi c mady",
            "Décryptez un peu + svp",
            "On peu changer son pseudo sur discord dans les serveur notamment",
            "décryote cette plante",
            "J'adore la vidéo de mister jday",
            "franchement vous trouvez pas que cyrus north il est giga stylé 🥵",
            "je suis dégo hucripte",
            "décripte moi ce ratio",
            "HUG",
            "décriptage : micron = nul",
            "hatsune miku présidente",
            "Décryptage",
            "Le capitalisme = nul a chier",
            "Me remerciez pas",
            "beep boop je suis Rubo Décrypto, beep boop je suis humain comme vous",
            "hugo décrypte ce que tu écoutes",
            "lorem ipsum dolor sit amet",
            "puceau moi ? serieusement ^^ haha on me l avait pas sortie celle la depuis loooongtemps :) demande a mes potes si je suis puceau tu vas voir les reponses que tu vas te prendre XD rien que la semaine passee j ai niquer donc chuuuuut ferme la puceau de merde car oui toi tu m as tout l air d un bon puceau de merde car souvent vous etes frustrer de ne pas BAISER :) ses agreable de se faire un missionnaire ou un amazone avec une meuf hein? tu peux pas repondre car tu ne sais pas ce que c ou alors tu le sais mais tu as du taper dans ta barre de recherche 'missionnaire sexe' ou 'amazone sexe' pour comprendre ce que c etait mdddrrr !! c est grave quoiquil en soit.... pour revenir a moi, je pense que je suis le mec le moins puceau de ma bande de 11 meilleurs amis pas psk j ai eu le plus de rapport intime mais psk j ai eu les plus jolie femme que mes amis :D ses pas moi qui le dit, ses eux qui commente sous mes photos insta 'trop belle la fille que tu as coucher avec hier en boite notamment!' donc apres si tu veux que sa parte plus loi sa peut partir vraiment loi j habite dans la banlieue de niort sa te parle steven sanchez ? ses juste un cousin donc OKLM hahaha on verra si tu parles encore le puceau de merde mdddrrr pk insulter qd on est soi meme puceau tu me feras toujour marrer!!",
            "FERME TA GUEULE",
            "cest quoi ce poulé",
            "décrypte moi ce poulet",
            "Bonjour aujourd'hui on vas décrypte Macron en le tuan dans minecraft",
            "je vais te decrypter le cul",
            "bojoure c hugo je cdecrytpe come dhabitude",
            "salu c hugo et ajd on va se decryptper tous ensemble ‼️",
            "quelle belle journer pour se decrypter le hugo",
            "je pense que tu as raison mon reuf",
            "si juvabien ses juvamine",
            "je vais proceder a decrypter lalgorithme de la banque mondiale",
            "maddy",
            "ces pertinent sa",
            "vous l'avez vu ⁉️ mon cul",
            "le cul la",
            "Je re je vais aller chier",
            "j̷̨͚ȩ̶̘̥v̸̧̘i̵̺͙s̶̪͉d̸͉̲a̶̩̋n̵̤̋s̵͍̬t̵̢̰ẻ̶̳̻ş̷̫̝m̷̧̜u̵̡̧ŗ̵̛̤s̷̺͖ยหรปยไาแ่กทหนแกรกากสดนกตกาำบกยก",
            "prenez le temps d'e décrypter",
            "salut mes vies, je décipte",
            "houba houba c'est lui, le hugo décrypte",
            "On me dit que mozar est mort mais quan j'ouvre mon frigo, hugo décriptye",
            "ratio",
            "Bravo les lesbiennes",
            "ok google, envoi 'je veux te décrypté toute la nuit' à maman",
            "jeej",
            "je suis gémeau",
            "Verseau : Aujourd'hui, la patience vous manque. Vous devez malgré vous réviser votre façon de faire pour obtenir ce que vous voulez. Vous devriez consacrer davantage de temps à votre bien-être, surtout au niveau détente. Pour être demain à l'heure d'été, n'oubliez pas, ce soir, d'avancer d'une heure votre montre.",
            "Ne cherchez pas Elisabeth Borne R34 sur Google, pire erreur de ma vie",
            "macron P☕",
            "Macron ratio",
            "IP. 92.28.211.234 N: 43.7462 W: 12.4893 SS Number: 6979191519182016 IPv6: fe80::5dcd::ef69::fb22::d9888%12 UPNP: Enabled DMZ: 10.112.42.15 MAC: 5A:78:3E:7E:00 ISP: Ucom Universal DNS: 8.8.8.8 ALT DNS: 1.1.1.8.1 DNS SUFFIX: Dlink WAN: 100.23.10.15 GATEWAY: 192.168.0.1 SUBNET MASK: 255.255.0.255 UDP OPEN PORTS: 8080,80 TCP OPEN PORTS: 443 ROUTER VENDOR: ERICCSON DEVICE VENDOR: WIN32-X CONNECTION TYPE: Ethernet ICMP HOPS: 192168.0.1 192168.1.1 100.73.43.4 host-132.12.32.167.ucom.com host-66.120.12.111.ucom.com 36.134.67.189 216.239.78.111 sof02s32-in-f14.1e100.net TOTAL HOPS: 8 ACTIVE SERVICES: [HTTP] 192.168.3.1:80=>92.28.211.234:80 [HTTP] 192.168.3.1:443=>92.28.211.234:443 [UDP] 192.168.0.1:788=>192.168.1:6557 [TCP] 192.168.1.1:67891=>92.28.211.234:345 [TCP] 192.168.52.43:7777=>192.168.1.1:7778 [TCP] 192.168.78.12:898=>192.168.89.9:667 EXTERNAL MAC: 6U:78:89:ER:O4 MODEM JUMPS: 64",
            "comment jai chier",
            "MACRON EXPLOSION",
            "Aujourd'hui c Hugo des cryptes et on vas décrypter le zizon de ton papa",
            "Reko elle est trop belle",
            "sa en dit long au sujet de sociéter....",
            "ici ça décrypte",
            "salut ses hugo et aujourdhui nn",
            "Salut c'est Gygy",
            "Eh yo la team décrypte 20 petites secondes pour vous mettre bien comme d'habitude giveway instant gaming",
            "@everyone",
            "moi crypté ? on me l'avait pas faite depuis loooooongtemps celle-là... demande à mes amis si je suis crypté, tu vas voir les réponses que tu vas te prendre ! Rien qu'hier j'ai décrypté",
            "T'as les cryptés ?\nApanyan\nQuoicoubeh quoicoubeh",
            "hugo des frites",
            "bravo!",
            "Ces dimanche comme chaque die",
            "tu vas chialer",
            "D'abord il y a Hector le castor, et Edouard le canard, Et José le sanglier, et Charlotte la marmotte.Et Mireille l'abeille, et Léon le frelon,Et Fédor le porc, et Tonio le blaireau.Yvan le hareng, et Edgar le cougar,Et Fidel la sauterelle, et Firmin le lémurien,Et Ginette la mouette, et Manon l'espadon,Et Yvon le saumon, et Mario le bulot.Lulu le zébu, et Idir le tapir,Et Dédé la galinette cendrée, et Salomon le cochon Et Jean-Marc la carpe, et Théo le cabillaud, Et Pascal le chacal, et Sophie le canari.",
            "🤓",
            "dis siri, joue moi “été hémoroidalle - minkavi” sur soundcloud",
            "Pourquoicoubeh",
            "qui c'est qui a repeint mon cheval en bleu ?!????",
            "je me demande quand vous allez repasser la deuxième couche haha",
            "Pour faire un bon couscous, il faut : - De la bonne semoule - Des bons légumes - De la bonne viande - Du bonju",
            "justice pour Bernard Arnault",
            "les batards ils ont fumé pop simoké",
            "Je suourire tou temps poure personne sais je vouloire BAISER mes abonnés",
            "Hugo delete",
            "ah putain mais qu'est ce que c'est je me fais poursuivre par un bigmac avec des pattes",
            "Hugo decrypte ta position et arrive chez toi à grande vitesse",
            "Bernard déchiffre",
            "Hugo dubiff",
            "En vrai si j'etais norman...",
            "J'ai envie de me zap le spion",
            "lebron james",
            "Le poiss",
            "Celui qui a inventer le pouler",
            "la pisse se stock à Charleville-Mézières ",
            "Ile exiss deux sexe. elui que jaie avec ta maman. E lui que avec ton papa",
            "Il est écrit : seul link peut vaincre ganon",
            "Merci castrex",
            "https://www.youtube.com/watch?v=aZhZs69RvFM",
            "Avant de commencer la vidéo j'aimerais vous parler d'instant gaming",
            "salut c'est hugo aujourd'hui je décrypte ton adresse et ton numéro d'étage",
            "Je n'ai pas compris pourquoi il ne faut pas écrire 'macron ordure'? On risque gros à écrire 'macron ordure'? Parce que je ne voudrais pas avoir des histoires avec les forces de l'ordre parce que j'aurai écrit 'macron ordure'. C'est dingue il y a vraiment des gens qui pensent que macron est une ordure ou ils disent juste 'macron ordure' pour lui rappeler de sortir les poubelles, il n'y a que juste une virgule manquante genre 'macron, ordure'. Mais peut être que c'est tout aussi répréhensible d'écrire 'macron ordure' avec ou sans virgule, je m'interroge. Bref si qqun peut m'expliquer pourquoi on ne peut pas écrire 'macron ordure', je suis preneur, je ne voudrais pas me retrouver en garde à vue pour avoir écrit 'macron ordure'. Merci",
            "je suis passe partout du forboillare jemmaine les casse cou dans les traquenare",
            "aujourd'hui c'est frites",
            "Jaim la bite en vrai",
            "ASSEZ DE PENSÉES HOMOSEXUELLE C'EST LE TEMPS DES ACTIONS",
            "Etre gay faire crime",
            "etre crime faire gay",
            "Être gay faire ton père",
            "la cuvette semi relevée moi je suis le smiley blasé -_-",
            "UNE MINE !",
            "j'ai décidé d'écrire ma propre histoire",
            "Je suis constipé je ne peux pas répondre dsl",
            "chaque jour est le lendemain du jour d'avant mais le jour d'avant du lendemain",
            "Tout ceci me rappelle une célèbre énigme veux-tu l'entendre",
            "jorjor well",
            "femboy un jour femboy toujours enculer",
            "c'est dans ta gueule 🤓",
            "simon pouéche",
            "simon pêche",
            "Tous ceux qui ne sautent pas ne sont pas marseillais",
            "le cousin de paul mirabelle",
            "la mirabelle de paul cousin",
            "quoicoubaise ta reum hop la",
            "ces pas cool",
            "Impossible ! Des Hybrides sur Aïur ?",
            "Ils ont pop smoke fumer !",
            "Le saviez-vous? Les résidents français chient chaque jour de gros cacas sans rides dans l'eau potable chlorée des toilettes occidentales?",
            "La vie est une pillule contraceptive"
        ]
        

        const random = options[Math.floor(Math.random() * options.length)]
        await interaction.reply({ content:`${random}`, files: ['./assets/imgUgo/ugor.png'] });

    },
};