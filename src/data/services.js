// Pages services : une page par intention de recherche. Les prix viennent de guides publics (voir PRICE_SOURCE) : jamais de prix inventé.
import { Wrench, House, Layers, Triangle, Sparkles, Droplets, Ruler, CloudRain, ShieldCheck, Hammer, PanelTop, PaintRoller, Paintbrush, SprayCan } from "lucide-react";

export const PRICE_SOURCE =
  "Repères publiés par La Maison Saint-Gobain (guides de prix mis à jour en mars et avril 2026) et MesDépanneurs (décembre 2025). Prix indicatifs, hors cas particuliers : seul le devis gratuit fait foi.";

export const SERVICES = [
  {
    slug: "reparation-toiture-deauville",
    title: "Réparation de toiture à Deauville",
    h1: "Réparation de toiture à Deauville : fuites, tuiles, faîtage",
    short: "Recherche de l'origine d'une fuite puis réparation ciblée, sans refaire ce qui est sain.",
    icon: "Wrench",
    metaTitle: "Réparation toiture Deauville | Les Couvreurs Normands",
    metaDescription: "Réparation de toiture et de fuite à Deauville et dans tout le Calvados : tuiles, faîtage, solins, gouttières. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["réparation toiture deauville", "fuite toiture deauville", "couvreur deauville", "dépannage toiture deauville"],
    answer:
      "Une réparation de toiture consiste à retrouver l'origine d'une infiltration ou d'un désordre (tuile, ardoise, faîtage, solin, noue, gouttière), puis à reprendre uniquement ce qui est abîmé. Les Couvreurs Normands interviennent à Deauville et dans tout le Calvados, après examen de la toiture et devis gratuit.",
    benefits: [
      "Examen de la toiture avant tout devis",
      "Réparation ciblée sur la cause réelle de la fuite",
      "Devis gratuit détaillant les travaux",
      "Entreprise basée à Deauville",
    ],
    sections: [
      {
        h: "Comment repérer une fuite de toiture ?",
        p: "Une tache au plafond, une auréole sur un mur sous les combles, de l'isolant humide ou une tuile retrouvée au sol sont les signes les plus courants. Attention : la trace visible à l'intérieur n'est pas toujours située sous le défaut, car l'eau suit les liteaux, la charpente ou l'écran sous toiture avant d'apparaître. C'est pourquoi la cause se cherche sur toute la zone, pas uniquement au-dessus de la tache.",
      },
      {
        h: "Que faire en cas de fuite de toiture ?",
        p: "Protégez d'abord les biens et les meubles (récipient, bâche à l'intérieur), coupez l'électricité si l'eau atteint une installation, prenez des photos de la trace et de la date, puis appelez un couvreur. Ne montez pas vous-même sur le toit : le risque de chute est réel. Pensez aussi à prévenir votre assureur dans les délais prévus par votre contrat, en général cinq jours ouvrés après un dégât des eaux.",
      },
      {
        h: "Réparer ou rénover la toiture : comment choisir ?",
        p: "Si le désordre est localisé et le reste de la couverture sain, une réparation ciblée suffit souvent : remplacement de quelques tuiles, reprise d'un solin, d'un faîtage ou d'une noue. Si les fuites se répètent sur plusieurs zones ou si la couverture arrive en fin de vie, la rénovation devient plus cohérente économiquement. L'examen de la toiture permet de trancher sans vous pousser vers des travaux inutiles.",
      },
      {
        h: "Combien coûte la réparation d'une fuite de toiture ?",
        p: "Une réparation de fuite coûte généralement de 400 à 2 500 €, avec une moyenne autour de 750 € pour une intervention légère à modérée, selon MesDépanneurs (mise à jour du 30 décembre 2025). Le prix dépend de l'accès, de la hauteur, de la cause et de l'étendue des reprises. Le devis des Couvreurs Normands est gratuit et détaille chaque poste.",
      },
    ],
    table: {
      caption: "Repères de prix pour réparer une toiture",
      rows: [
        ["Réparation d'une fuite de toiture", "400 à 2 500 € (environ 750 € en moyenne)"],
        ["Remplacement d'une ou deux tuiles", "150 à 250 € TTC"],
        ["Réparation de faîtage, au mètre linéaire", "50 à 150 € TTC"],
        ["Reprise ou remplacement d'un solin de cheminée", "250 à 600 €"],
      ],
    },
    faq: [
      { q: "Intervenez-vous pour une fuite de toiture à Deauville ?", a: "Oui. Les Couvreurs Normands recherchent l'origine de l'infiltration (couverture, faîtage, solin, noue, gouttière) puis la répare. Appelez le [TÉLÉPHONE] pour décrire le problème." },
      { q: "Faut-il une autorisation pour réparer une toiture ?", a: "Une réparation ordinaire avec les mêmes matériaux, les mêmes couleurs et la même pente ne demande aucune autorisation d'urbanisme, d'après service-public.fr. Un changement d'aspect demande une déclaration préalable en mairie." },
      { q: "Le devis pour une réparation est-il gratuit ?", a: "Oui, le devis est gratuit. Il est établi après examen de la toiture." },
    ],
    related: ["remplacement-tuiles-ardoises-deauville", "reparation-faitage-deauville", "couvreur-zingueur-deauville", "renovation-toiture-deauville"],
  },
  {
    slug: "renovation-toiture-deauville",
    title: "Rénovation de toiture à Deauville",
    h1: "Rénovation de toiture à Deauville : réfection partielle ou complète",
    short: "Réfection de la couverture quand les réparations ponctuelles ne suffisent plus.",
    icon: "House",
    metaTitle: "Rénovation toiture Deauville | Les Couvreurs Normands",
    metaDescription: "Rénovation et réfection de toiture à Deauville et dans tout le Calvados : tuiles, ardoises, zinc. Examen de la toiture et devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["rénovation toiture deauville", "réfection toiture deauville", "refaire toiture deauville", "couvreur deauville"],
    answer:
      "La rénovation de toiture consiste à refaire tout ou partie de la couverture lorsque les réparations ponctuelles ne suffisent plus : dépose, contrôle du support, pose du nouveau matériau et reprise des raccords. Les Couvreurs Normands examinent la toiture existante puis chiffre gratuitement les travaux.",
    benefits: [
      "Examen de l'existant avant de proposer des travaux",
      "Rénovation partielle ou complète selon l'état réel",
      "Devis gratuit détaillé par poste",
      "Choix du matériau expliqué : tuiles, ardoises ou zinc",
    ],
    sections: [
      {
        h: "Quand faut-il rénover une toiture ?",
        p: "Une rénovation devient pertinente lorsque les fuites se répètent sur plusieurs zones, que de nombreuses tuiles ou ardoises sont fissurées, poreuses ou glissées, que la mousse est très envahissante ou que les raccords sont dégradés partout. À ce stade, multiplier les réparations coûte souvent plus cher qu'une réfection cohérente. Le contrôle de l'état réel du toit permet de décider si la rénovation doit être partielle ou complète.",
      },
      {
        h: "Quelles sont les étapes d'une rénovation de toiture ?",
        p: "Le chantier commence par l'examen de la toiture et le devis. Viennent ensuite la dépose de l'ancienne couverture, le contrôle du support (liteaux, voligeage, charpente), la pose d'un écran sous toiture si nécessaire, la pose de la nouvelle couverture, puis la reprise de la zinguerie, des raccords et des gouttières. Chaque étape est décrite dans le devis pour que vous sachiez ce qui est prévu.",
      },
      {
        h: "Tuiles, ardoises ou zinc : quel matériau choisir ?",
        p: "Le choix dépend de la pente, de l'architecture du bâtiment, du budget et des règles d'urbanisme locales. Selon La Maison Saint-Gobain (guide mis à jour le 16 avril 2026), une couverture fournie et posée coûte en moyenne environ 90 € le m² en tuiles béton, 130 € en tuiles terre cuite, 125 € en zinc et 200 € en ardoises naturelles, TTC. La fourchette générale pour remplacer une couverture est de 120 à 300 € le m².",
      },
      {
        h: "Faut-il une déclaration préalable pour refaire sa toiture ?",
        p: "Remplacer toute la toiture à l'identique, avec les mêmes matériaux, les mêmes couleurs et la même pente, ne demande aucune autorisation d'urbanisme. Changer l'aspect extérieur (autre modèle de tuiles, autre couleur, pente modifiée) demande une déclaration préalable en mairie. Ces règles sont rappelées par service-public.fr. Selon votre commune, le plan local d'urbanisme peut aussi imposer des règles : renseignez-vous avant de signer.",
      },
    ],
    table: {
      caption: "Couverture fournie et posée, au m² (TTC)",
      rows: [
        ["Tuiles béton", "environ 90 €"],
        ["Zinc", "environ 125 €"],
        ["Tuiles terre cuite", "environ 130 €"],
        ["Ardoises naturelles", "environ 200 €"],
        ["Dépose de l'ancienne couverture", "environ 15 €"],
      ],
    },
    faq: [
      { q: "Combien coûte la rénovation d'une toiture au m² ?", a: "Selon La Maison Saint-Gobain, la fourchette générale est de 120 à 300 € le m² pour remplacer une couverture, selon le matériau. Le devis gratuit donne le prix exact pour votre toiture." },
      { q: "Peut-on rénover une toiture seulement en partie ?", a: "Oui, si les zones saines peuvent être conservées. L'examen de la toiture indique ce qui peut être gardé et ce qui doit être refait." },
      { q: "Faut-il une autorisation pour refaire une toiture à l'identique ?", a: "Non, d'après service-public.fr, le remplacement à l'identique ne demande aucune autorisation d'urbanisme. Le changement d'aspect demande une déclaration préalable." },
      { q: "La dépose de l'ancienne couverture est-elle comprise ?", a: "Elle est détaillée dans le devis. Selon La Maison Saint-Gobain, elle représente environ 15 € le m², et jusqu'au double avec évacuation des déchets et bâchage." },
    ],
    related: ["reparation-toiture-deauville", "remplacement-tuiles-ardoises-deauville", "couvreur-zingueur-deauville", "gouttieres-deauville"],
  },
  {
    slug: "remplacement-tuiles-ardoises-deauville",
    title: "Remplacement de tuiles et d'ardoises à Deauville",
    h1: "Remplacement de tuiles et d'ardoises à Deauville",
    short: "Remplacement des éléments cassés, déplacés ou fissurés en respectant le matériau existant.",
    icon: "Layers",
    metaTitle: "Remplacement tuiles et ardoises Deauville | Les Couvreurs Normands",
    metaDescription: "Remplacement de tuiles et d'ardoises cassées à Deauville et dans tout le Calvados, avec reprise du matériau existant. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["remplacement tuiles deauville", "tuile cassée deauville", "remplacement ardoises deauville", "couvreur deauville"],
    answer:
      "Remplacer des tuiles ou des ardoises consiste à retirer les éléments cassés, fissurés ou déplacés et à les remplacer par des pièces compatibles avec la couverture existante. Les Couvreurs Normands interviennent à Deauville et dans tout le Calvados, après un examen de la toiture et un devis gratuit.",
    benefits: [
      "Remplacement à l'identique quand c'est possible",
      "Contrôle des éléments voisins avant de refermer",
      "Intervention de la simple tuile à la zone complète",
      "Devis gratuit après examen",
    ],
    sections: [
      {
        h: "Pourquoi des tuiles ou des ardoises se cassent-elles ?",
        p: "Le vent, le gel, la mousse qui retient l'eau, un choc (branche, passage sur le toit) ou le simple vieillissement du matériau sont les causes les plus courantes. Une tuile déplacée ou fissurée laisse passer l'eau jusqu'à l'écran sous toiture, puis jusqu'à l'isolant. Un remplacement rapide évite que l'humidité ne s'installe dans les combles.",
      },
      {
        h: "Peut-on remplacer quelques tuiles sans refaire le toit ?",
        p: "Oui, si les éléments voisins sont sains. Le couvreur retire les tuiles abîmées, contrôle les liteaux et l'écran sous toiture, puis pose des pièces compatibles. Sur une toiture ancienne, trouver des tuiles ou des ardoises de même aspect demande parfois un peu de recherche : un léger écart de teinte est possible entre l'ancien et le neuf.",
      },
      {
        h: "Tuiles ou ardoises : ce qu'il faut savoir avant de remplacer",
        p: "Les ardoises se posent au crochet ou au clou et demandent un geste précis pour ne pas fendre les pièces voisines. Les tuiles se remplacent par emboîtement ou, sur des modèles anciens, par recouvrement. Dans les deux cas, remplacer par un autre modèle change l'aspect de la toiture et peut demander une déclaration préalable en mairie.",
      },
      {
        h: "Combien coûte le remplacement de tuiles ?",
        p: "Pour une ou deux tuiles, comptez de 150 à 250 € TTC déplacement compris. Pour plusieurs tuiles ou un accès difficile, la base est de 70 à 150 € TTC le m², selon MesDépanneurs (mise à jour du 30 décembre 2025). Le devis gratuit précise le prix pour votre toiture.",
      },
    ],
    table: {
      caption: "Repères de prix pour remplacer des tuiles",
      rows: [
        ["Une ou deux tuiles, déplacement compris", "150 à 250 € TTC"],
        ["Plusieurs tuiles ou accès complexe, au m²", "70 à 150 € TTC"],
        ["Remplacement de tuiles, repère moyen au m²", "environ 100 €"],
      ],
    },
    faq: [
      { q: "Combien coûte le remplacement d'une tuile cassée ?", a: "Pour une ou deux tuiles, comptez de 150 à 250 € TTC déplacement compris, selon MesDépanneurs. Le devis gratuit confirme le prix pour votre toiture." },
      { q: "Peut-on remplacer une tuile par un autre modèle ?", a: "C'est possible techniquement, mais cela change l'aspect de la toiture et peut demander une déclaration préalable en mairie, d'après service-public.fr." },
      { q: "Une tuile cassée est-elle urgente à remplacer ?", a: "Il vaut mieux la remplacer rapidement : elle peut laisser passer l'eau jusqu'à l'écran sous toiture et l'isolant, sans signe visible depuis le sol." },
      { q: "Remplacez-vous aussi les ardoises ?", a: "Oui. Le remplacement d'ardoises cassées ou glissées fait partie de nos prestations de couverture." },
    ],
    related: ["reparation-toiture-deauville", "reparation-faitage-deauville", "renovation-toiture-deauville", "demoussage-toiture-deauville"],
  },
  {
    slug: "reparation-faitage-deauville",
    title: "Réparation de faîtage à Deauville",
    h1: "Réparation de faîtage à Deauville : contrôle et reprise",
    short: "Contrôle et reprise des tuiles faîtières et de leurs scellements, point sensible après le vent.",
    icon: "Triangle",
    metaTitle: "Réparation faîtage Deauville | Les Couvreurs Normands",
    metaDescription: "Réparation de faîtage à Deauville et dans tout le Calvados : tuiles faîtières, scellements, reprise après tempête. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["réparation faîtage deauville", "faîtage toiture deauville", "tuile faîtière deauville", "couvreur deauville"],
    answer:
      "Le faîtage est la ligne qui ferme le sommet de la toiture, recouverte de tuiles faîtières posées au mortier ou à sec. Quand le mortier se fissure ou qu'une tuile se décale, l'eau s'infiltre. Les Couvreurs Normands contrôlent le faîtage et reprend les éléments abîmés, avec un devis gratuit.",
    benefits: [
      "Contrôle du faîtage sur toute sa longueur",
      "Reprise des scellements et des tuiles faîtières",
      "Intervention après tempête ou infiltration",
      "Devis gratuit détaillé",
    ],
    sections: [
      {
        h: "Qu'est-ce que le faîtage d'une toiture ?",
        p: "Le faîtage désigne la ligne de jonction entre les deux versants, à la partie la plus haute de la toiture. Il est fermé par des tuiles faîtières, scellées au mortier ou posées à sec avec des fixations, qui protègent la jonction des deux pentes. Exposé au vent et à la pluie, il fait partie des éléments qui demandent un contrôle régulier.",
      },
      {
        h: "Comment savoir si le faîtage est abîmé ?",
        p: "Des fissures dans le mortier, des tuiles faîtières décalées ou absentes, des morceaux de mortier au sol ou une trace d'humidité dans les combles à l'aplomb du sommet sont les signes à surveiller. Après une tempête, un coup d'œil depuis le jardin peut suffire à repérer une tuile qui a bougé.",
      },
      {
        h: "Comment se déroule la réparation d'un faîtage ?",
        p: "Le couvreur dépose les éléments abîmés, nettoie la zone, contrôle le support et les rives, puis repose les tuiles faîtières avec un scellement adapté. Si le faîtage est dégradé sur toute sa longueur, une reprise complète est plus fiable que des retouches successives. L'examen de la toiture permet de choisir la bonne option.",
      },
      {
        h: "Combien coûte la réparation d'un faîtage ?",
        p: "Selon MesDépanneurs (mise à jour du 30 décembre 2025), la réparation de faîtage coûte de 50 à 150 € TTC le mètre linéaire. Une portion de 4 mètres revient à 300 à 600 €, et une réfection complète à environ 800 à 1 200 €. Le devis gratuit donne le prix pour votre toiture.",
      },
    ],
    table: {
      caption: "Repères de prix pour un faîtage",
      rows: [
        ["Réparation, au mètre linéaire", "50 à 150 € TTC"],
        ["Portion de 4 mètres", "300 à 600 €"],
        ["Réfection complète", "environ 800 à 1 200 €"],
      ],
    },
    faq: [
      { q: "Quand faut-il faire réparer son faîtage ?", a: "Dès que le mortier se fissure, qu'une tuile faîtière se décale ou qu'une trace d'humidité apparaît sous le sommet de la toiture." },
      { q: "Combien coûte la réparation d'un faîtage ?", a: "De 50 à 150 € TTC le mètre linéaire selon MesDépanneurs, soit 300 à 600 € pour 4 mètres. Le devis est gratuit." },
      { q: "Faut-il un échafaudage pour réparer un faîtage ?", a: "Cela dépend de la hauteur et de l'accès. Le moyen d'accès est précisé dans le devis après examen de la toiture." },
      { q: "Intervenez-vous après une tempête ?", a: "Oui, appelez-nous pour décrire les dégâts : nous examinons la toiture et vous remettons un devis gratuit." },
    ],
    related: ["reparation-toiture-deauville", "remplacement-tuiles-ardoises-deauville", "couvreur-zingueur-deauville", "renovation-toiture-deauville"],
  },
  {
    slug: "demoussage-toiture-deauville",
    title: "Démoussage et nettoyage de toiture à Deauville",
    h1: "Démoussage et nettoyage de toiture à Deauville",
    short: "Nettoyage adapté au matériau et traitement anti-mousse pour préserver la couverture.",
    icon: "Sparkles",
    metaTitle: "Nettoyage et démoussage toiture Deauville | Les Couvreurs Normands",
    metaDescription: "Démoussage et nettoyage de toiture à Deauville et dans tout le Calvados, avec méthode adaptée au matériau. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["démoussage toiture deauville", "nettoyage toiture deauville", "anti-mousse toiture deauville", "couvreur deauville"],
    answer:
      "Le démoussage de toiture consiste à retirer mousses, lichens et dépôts de la couverture, puis à appliquer un traitement anti-mousse. Il coûte en général de 25 à 35 € le m². Les Couvreurs Normands choisissent la méthode selon le matériau et son état, après examen de la toiture et devis gratuit.",
    benefits: [
      "Méthode choisie selon le matériau et son état",
      "Contrôle de la couverture avant et après nettoyage",
      "Possibilité d'enchaîner avec un traitement hydrofuge",
      "Devis gratuit au m²",
    ],
    sections: [
      {
        h: "Pourquoi démousser une toiture ?",
        p: "Mousses et lichens retiennent l'humidité contre les tuiles et les ardoises, gênent l'écoulement de l'eau et accélèrent le vieillissement du matériau. Ils se développent surtout sur les versants peu ensoleillés et sous les arbres. Un démoussage régulier préserve la couverture et évite que l'eau ne s'attarde sur les raccords et dans les gouttières.",
      },
      {
        h: "Comment se déroule un démoussage de toiture ?",
        p: "Le couvreur contrôle d'abord l'état de la couverture, car un nettoyage ne doit pas masquer un défaut d'étanchéité. Il retire ensuite les mousses par brossage ou nettoyage à pression maîtrisée, applique un traitement anti-mousse, puis rince et contrôle le résultat. Un nettoyage trop agressif peut abîmer tuiles et ardoises : la méthode est donc adaptée au matériau.",
      },
      {
        h: "Quand faire démousser sa toiture ?",
        p: "Le printemps et l'automne conviennent le mieux : par temps sec, hors période de gel et sans pluie annoncée juste après l'application. Un contrôle une fois par an, même sans intervention, permet de décider du bon moment avant que la mousse ne s'installe durablement.",
      },
      {
        h: "Combien coûte un démoussage de toiture ?",
        p: "Selon La Maison Saint-Gobain (mise à jour du 10 mars 2026), un démoussage coûte de 25 à 35 € le m², main-d'œuvre comprise. Avec un traitement hydrofuge ensuite, la prestation complète représente 35 à 45 € le m². Le démoussage ne demande aucune autorisation d'urbanisme tant que l'aspect de la toiture ne change pas, d'après service-public.fr.",
      },
    ],
    table: {
      caption: "Repères de prix pour l'entretien d'une toiture (au m²)",
      rows: [
        ["Démoussage / nettoyage", "25 à 35 €"],
        ["Traitement hydrofuge seul", "15 à 35 €"],
        ["Nettoyage, démoussage et hydrofuge", "35 à 45 €"],
      ],
    },
    faq: [
      { q: "Combien coûte un démoussage de toiture ?", a: "De 25 à 35 € le m², main-d'œuvre comprise, selon La Maison Saint-Gobain (mars 2026). Le devis gratuit donne le prix pour votre toiture." },
      { q: "Faut-il une autorisation pour démousser une toiture ?", a: "Non, d'après service-public.fr, le nettoyage et le démoussage ne demandent pas d'autorisation d'urbanisme tant que l'aspect de la toiture ne change pas." },
      { q: "Le nettoyage à haute pression abîme-t-il la toiture ?", a: "Une pression trop forte peut abîmer tuiles et ardoises. La méthode est choisie selon le matériau et son état, après examen de la couverture." },
      { q: "Faut-il traiter avec un hydrofuge après le démoussage ?", a: "Pas systématiquement. L'hydrofuge se justifie sur une couverture saine et propre ; il ne remplace jamais une réparation." },
    ],
    related: ["hydrofuge-toiture-deauville", "gouttieres-deauville", "reparation-toiture-deauville", "remplacement-tuiles-ardoises-deauville"],
  },
  {
    slug: "hydrofuge-toiture-deauville",
    title: "Traitement hydrofuge de toiture à Deauville",
    h1: "Traitement hydrofuge de toiture à Deauville",
    short: "Protection appliquée sur une couverture saine et propre, jamais pour masquer un défaut.",
    icon: "Droplets",
    metaTitle: "Hydrofuge toiture Deauville | Les Couvreurs Normands",
    metaDescription: "Traitement hydrofuge de toiture à Deauville et dans tout le Calvados, après nettoyage et contrôle de la couverture. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["hydrofuge toiture deauville", "traitement hydrofuge deauville", "hydrofuge coloré toiture", "couvreur deauville"],
    answer:
      "Le traitement hydrofuge est un produit appliqué sur une couverture saine et propre pour limiter l'absorption d'eau par les tuiles. Il coûte en général de 15 à 35 € le m². Les Couvreurs Normands ne le proposentnt qu'après contrôle de la toiture : il ne remplace jamais une réparation.",
    benefits: [
      "Application après nettoyage et contrôle de la couverture",
      "Conseil honnête : pas d'hydrofuge sur une toiture défectueuse",
      "Possibilité de combiner avec le démoussage",
      "Devis gratuit au m²",
    ],
    sections: [
      {
        h: "À quoi sert un traitement hydrofuge de toiture ?",
        p: "Un hydrofuge limite l'absorption de l'eau par les tuiles poreuses, ce qui ralentit le développement de la mousse et protège le matériau du gel. Il agit sur la surface de la couverture et ne comble ni une fissure, ni un joint dégradé, ni un raccord qui fuit. Il se justifie donc uniquement sur une toiture en bon état.",
      },
      {
        h: "Dans quels cas ne faut-il pas appliquer d'hydrofuge ?",
        p: "Si des tuiles sont fissurées, si des raccords laissent passer l'eau ou si la couverture arrive en fin de vie, les réparations passent avant tout traitement. Appliquer un hydrofuge pour masquer un défaut d'étanchéité ne règle pas le problème et retarde la bonne solution. L'examen de la toiture permet de distinguer ces cas.",
      },
      {
        h: "Hydrofuge incolore ou coloré : quelle différence ?",
        p: "L'hydrofuge incolore protège sans changer l'aspect de la toiture. Un hydrofuge coloré modifie la teinte de la couverture. Or, un changement de couleur modifie l'aspect extérieur du bâtiment et peut demander une déclaration préalable en mairie, d'après service-public.fr. Renseignez-vous auprès de votre commune avant de choisir une couleur.",
      },
      {
        h: "Combien coûte un traitement hydrofuge ?",
        p: "Selon La Maison Saint-Gobain (mise à jour du 10 mars 2026), un traitement hydrofuge seul représente de 1 500 à 3 500 € pour 100 m², soit 15 à 35 € le m². Avec le nettoyage et le démoussage, la prestation complète revient à 35 à 45 € le m². Le devis gratuit donne le prix exact pour votre toiture.",
      },
    ],
    table: {
      caption: "Repères de prix pour l'hydrofuge (au m²)",
      rows: [
        ["Traitement hydrofuge seul", "15 à 35 €"],
        ["Hydrofuge pour 100 m²", "1 500 à 3 500 €"],
        ["Nettoyage, démoussage et hydrofuge", "35 à 45 €"],
      ],
    },
    faq: [
      { q: "L'hydrofuge répare-t-il une toiture qui fuit ?", a: "Non. Il limite l'absorption d'eau d'une couverture saine, mais ne remplace ni une réparation, ni le remplacement d'une tuile fissurée." },
      { q: "Combien coûte un hydrofuge de toiture ?", a: "De 15 à 35 € le m² pour le traitement seul, selon La Maison Saint-Gobain (mars 2026). Le devis est gratuit." },
      { q: "Faut-il démousser avant l'hydrofuge ?", a: "Oui. Le produit s'applique sur une couverture propre, après nettoyage et démoussage." },
      { q: "Un hydrofuge coloré demande-t-il une autorisation ?", a: "Un changement de couleur modifie l'aspect extérieur et peut demander une déclaration préalable. Renseignez-vous auprès de la mairie avant de choisir." },
    ],
    related: ["demoussage-toiture-deauville", "reparation-toiture-deauville", "etancheite-toiture-deauville", "renovation-toiture-deauville"],
  },
  {
    slug: "couvreur-zingueur-deauville",
    title: "Couvreur zingueur à Deauville",
    h1: "Couvreur zingueur à Deauville : solins, noues, rives",
    short: "Solins, noues, rives et abergements : les raccords qui guident l'eau loin des murs.",
    icon: "Ruler",
    metaTitle: "Couvreur zingueur Deauville | Les Couvreurs Normands",
    metaDescription: "Couvreur zingueur à Deauville et dans tout le Calvados : solins, noues, rives, abergements et chéneaux. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["couvreur zingueur deauville", "zinguerie deauville", "solin cheminée deauville", "noue toiture deauville"],
    answer:
      "La zinguerie regroupe les éléments métalliques qui assurent l'étanchéité aux points de raccord de la toiture : solins, noues, rives, abergements et chéneaux. Un défaut discret peut provoquer une infiltration importante. Les Couvreurs Normands contrôlent et reprend la zinguerie, avec un devis gratuit.",
    benefits: [
      "Contrôle de tous les raccords de la toiture",
      "Reprise des solins, noues, rives et abergements",
      "Intervention adaptée au matériau de couverture",
      "Devis gratuit détaillé",
    ],
    sections: [
      {
        h: "Qu'est-ce qu'un solin de toiture ?",
        p: "Un solin est une bande d'étanchéité, souvent en zinc, qui raccorde la couverture à un élément vertical comme un mur, une cheminée ou un conduit. Il empêche l'eau de s'infiltrer à la jonction. Avec le temps, le mastic ou le mortier de fixation se fissure, et le solin devient une des premières causes de fuite.",
      },
      {
        h: "À quoi servent les noues, les rives et les abergements ?",
        p: "La noue est la gouttière formée par la rencontre de deux versants : elle collecte beaucoup d'eau et travaille fortement. Les rives bordent les côtés de la toiture, et l'abergement protège le contour d'un élément qui traverse la toiture, comme une cheminée ou une fenêtre de toit. Ces zones se contrôlent régulièrement, surtout après le vent.",
      },
      {
        h: "Quels signes montrent un problème de zinguerie ?",
        p: "Une trace d'humidité sur un mur proche d'une cheminée, une auréole sous une noue, du zinc déformé ou percé, un solin décollé ou un mastic craquelé sont les signes à surveiller. Une infiltration qui revient au même endroit après chaque pluie vient souvent d'un raccord plus que de la couverture elle-même.",
      },
      {
        h: "Combien coûte la reprise d'un solin ?",
        p: "Selon MesDépanneurs (mise à jour du 30 décembre 2025), la réparation d'un solin coûte de 300 à 1 000 € et la reprise ou le remplacement d'un solin de cheminée de 250 à 600 €. Le prix dépend de la longueur, de l'accès et de la hauteur. Le devis des Couvreurs Normands est gratuit.",
      },
    ],
    table: {
      caption: "Repères de prix pour la zinguerie",
      rows: [
        ["Réparation d'un solin", "300 à 1 000 €"],
        ["Reprise ou remplacement d'un solin de cheminée", "250 à 600 €"],
      ],
    },
    faq: [
      { q: "Qu'est-ce qu'un couvreur zingueur ?", a: "Un couvreur zingueur pose et répare la couverture ainsi que les éléments métalliques d'étanchéité et d'évacuation de l'eau, comme les solins, les noues et les chéneaux." },
      { q: "Pourquoi une fuite revient-elle au même endroit ?", a: "Elle vient souvent d'un raccord (solin, noue, abergement) plutôt que de la couverture. Il faut réparer le raccord pour que la fuite ne revienne pas." },
      { q: "Combien coûte la réparation d'un solin ?", a: "De 300 à 1 000 € selon MesDépanneurs, et de 250 à 600 € pour un solin de cheminée. Le devis est gratuit." },
      { q: "Réalisez-vous aussi des gouttières ?", a: "Oui. Les gouttières ont leur propre page : pose, remplacement, réparation et nettoyage." },
    ],
    related: ["gouttieres-deauville", "etancheite-toiture-deauville", "reparation-toiture-deauville", "pose-velux-deauville"],
  },
  {
    slug: "gouttieres-deauville",
    title: "Gouttières à Deauville",
    h1: "Gouttières à Deauville : pose, réparation et nettoyage",
    short: "Pose, remplacement, réparation et nettoyage des gouttières et descentes d'eaux pluviales.",
    icon: "CloudRain",
    metaTitle: "Gouttières Deauville | Les Couvreurs Normands",
    metaDescription: "Pose, réparation et nettoyage de gouttières à Deauville et dans tout le Calvados. Examen sur place et devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["gouttière deauville", "réparation gouttière deauville", "nettoyage gouttière deauville", "couvreur deauville"],
    answer:
      "Les gouttières collectent l'eau de pluie de la toiture et l'évacuent par les descentes. Encombrées ou affaissées, elles débordent sur la façade. Les Couvreurs Normands posent, remplace, répare et nettoie les gouttières à Deauville et dans tout le Calvados, avec un devis gratuit.",
    benefits: [
      "Pose, remplacement, réparation et nettoyage",
      "Contrôle des crochets, joints et descentes",
      "Intervention sur place après examen",
      "Devis gratuit détaillé",
    ],
    sections: [
      {
        h: "Pourquoi une gouttière déborde-t-elle ?",
        p: "Les causes les plus courantes sont l'encombrement par les feuilles et les mousses, une pente insuffisante, des crochets affaissés, un joint qui fuit ou une descente bouchée. L'eau qui déborde ruisselle sur la façade et peut abîmer l'enduit ou humidifier les murs. Un nettoyage régulier, surtout après l'automne, évite la plupart de ces désordres.",
      },
      {
        h: "Quand nettoyer ses gouttières ?",
        p: "Une fois par an, de préférence à la fin de l'automne après la chute des feuilles, convient à la plupart des maisons. Sous des arbres ou près de haies, un second passage au printemps peut être utile. Le nettoyage est aussi l'occasion de contrôler les crochets, les joints et les descentes.",
      },
      {
        h: "Faut-il réparer ou remplacer une gouttière ?",
        p: "Une gouttière qui fuit à un joint ou dont un crochet a cédé se répare. Une gouttière percée, déformée ou rouillée sur une grande longueur se remplace plus sûrement. Changer le modèle de gouttières modifie l'aspect du bâtiment et demande une déclaration préalable en mairie, d'après service-public.fr ; le remplacement à l'identique n'en demande pas.",
      },
      {
        h: "Combien coûte le nettoyage ou la réparation d'une gouttière ?",
        p: "Selon MesDépanneurs (mise à jour du 30 décembre 2025), le nettoyage d'une gouttière revient à 12 à 25 € TTC le mètre linéaire, et une réparation courante de 150 à 225 €. Le prix dépend de la hauteur, de l'accès et de l'état de l'ouvrage. Le devis est gratuit.",
      },
    ],
    table: {
      caption: "Repères de prix pour les gouttières",
      rows: [
        ["Nettoyage, au mètre linéaire", "12 à 25 € TTC"],
        ["Réparation courante", "150 à 225 €"],
      ],
    },
    faq: [
      { q: "Combien coûte le nettoyage d'une gouttière ?", a: "De 12 à 25 € TTC le mètre linéaire selon MesDépanneurs. Le devis gratuit donne le prix pour votre maison." },
      { q: "Faut-il une autorisation pour changer ses gouttières ?", a: "Le remplacement à l'identique n'en demande pas. Changer de modèle modifie l'aspect et demande une déclaration préalable, d'après service-public.fr." },
      { q: "Pourquoi ma gouttière déborde-t-elle par temps de pluie ?", a: "Le plus souvent à cause d'un encombrement (feuilles, mousses), d'une descente bouchée ou d'un crochet affaissé. Un contrôle sur place permet de trouver la cause." },
      { q: "Intervenez-vous à la fois sur la toiture et les gouttières ?", a: "Oui, ce qui permet de contrôler la couverture, la zinguerie et les gouttières en une seule visite." },
    ],
    related: ["couvreur-zingueur-deauville", "demoussage-toiture-deauville", "reparation-toiture-deauville", "renovation-toiture-deauville"],
  },
  {
    slug: "etancheite-toiture-deauville",
    title: "Étanchéité de toiture à Deauville",
    h1: "Étanchéité de toiture à Deauville : points sensibles et raccords",
    short: "Traitement des points singuliers : raccords, souches de cheminée et jonctions qui laissent passer l'eau.",
    icon: "ShieldCheck",
    metaTitle: "Étanchéité toiture Deauville | Les Couvreurs Normands",
    metaDescription: "Étanchéité de toiture à Deauville et dans tout le Calvados : raccords, cheminées, jonctions et fuites récurrentes. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["étanchéité toiture deauville", "infiltration toiture deauville", "fuite récurrente toiture", "couvreur deauville"],
    answer:
      "L'étanchéité d'une toiture dépend de sa couverture, mais surtout de ses points sensibles : raccords, solins, souches de cheminée, noues, jonctions avec un mur ou une fenêtre de toit. Les Couvreurs Normands recherchent le point précis qui laisse passer l'eau, puis le reprend, avec un devis gratuit.",
    benefits: [
      "Recherche du point précis qui laisse passer l'eau",
      "Contrôle de l'ensemble des raccords",
      "Reprise ciblée plutôt que refaire le toit",
      "Devis gratuit détaillé",
    ],
    sections: [
      {
        h: "Quels sont les points faibles de l'étanchéité d'une toiture ?",
        p: "Ce sont les endroits où la couverture rencontre un autre élément : une cheminée, un mur mitoyen, une fenêtre de toit, une noue, un faîtage ou une rive. À ces jonctions, l'étanchéité repose sur des pièces de raccord et sur des scellements qui vieillissent. La couverture elle-même est rarement en cause lorsqu'une fuite revient toujours au même endroit.",
      },
      {
        h: "Comment trouver l'origine d'une infiltration récurrente ?",
        p: "Le couvreur contrôle la zone au-dessus de la trace, mais aussi plus haut sur le versant, car l'eau peut cheminer sur plusieurs mètres avant d'apparaître. Il examine les raccords, les tuiles ou ardoises voisines, l'écran sous toiture et les combles. Une visite sous la pluie ou juste après permet parfois de voir l'eau entrer.",
      },
      {
        h: "Un produit d'étanchéité suffit-il à résoudre le problème ?",
        p: "Un produit appliqué en surface peut dépanner temporairement, mais il ne remplace pas la reprise d'un raccord dégradé ou le remplacement d'un élément défaillant. Mieux vaut traiter la cause : solin à refaire, tuile à remplacer, noue à reprendre. C'est ce que propose le devis après examen de la toiture.",
      },
      {
        h: "Combien coûte la reprise d'un point d'étanchéité ?",
        p: "Le prix dépend du point à reprendre. Selon MesDépanneurs (mise à jour du 30 décembre 2025), la reprise d'un solin de cheminée coûte de 250 à 600 € et une réparation de fuite de 400 à 2 500 €. Le devis gratuit des Couvreurs Normands détaillent chaque poste.",
      },
    ],
    table: {
      caption: "Repères de prix pour l'étanchéité",
      rows: [
        ["Reprise ou remplacement d'un solin de cheminée", "250 à 600 €"],
        ["Réparation d'un solin", "300 à 1 000 €"],
        ["Réparation d'une fuite de toiture", "400 à 2 500 €"],
      ],
    },
    faq: [
      { q: "Pourquoi une fuite revient-elle après réparation ?", a: "Parce que la cause réelle n'a pas été traitée : un raccord, un solin ou une noue peut être en cause plutôt que la couverture. Il faut identifier le point précis." },
      { q: "Un traitement d'étanchéité remplace-t-il une réparation ?", a: "Non. Il peut dépanner, mais la bonne solution consiste à reprendre l'élément défaillant." },
      { q: "Peut-on trouver une fuite sans monter sur le toit ?", a: "Les combles et les traces permettent de s'orienter, mais l'examen de la toiture reste nécessaire pour localiser précisément la cause." },
      { q: "Le devis est-il gratuit ?", a: "Oui. Il est établi après examen de la toiture." },
    ],
    related: ["couvreur-zingueur-deauville", "reparation-toiture-deauville", "pose-velux-deauville", "reparation-faitage-deauville"],
  },
  {
    slug: "traitement-charpente-deauville",
    title: "Traitement de charpente à Deauville",
    h1: "Traitement de charpente à Deauville : diagnostic et traitement des bois",
    short: "Contrôle des bois et traitement adapté à leur état : humidité, insectes xylophages.",
    icon: "Hammer",
    metaTitle: "Traitement charpente Deauville | Les Couvreurs Normands",
    metaDescription: "Contrôle et traitement de charpente à Deauville et dans tout le Calvados : humidité, insectes xylophages. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["traitement charpente deauville", "charpente xylophages deauville", "diagnostic charpente deauville", "couvreur deauville"],
    answer:
      "Le traitement de charpente protège les bois contre les insectes xylophages et les champignons liés à l'humidité. Il se décide après un contrôle de l'état des bois, car certains traitements ne se justifient pas. Les Couvreurs Normands contrôlent la charpente et propose un traitement adapté, avec un devis gratuit.",
    benefits: [
      "Contrôle de l'état des bois avant tout traitement",
      "Traitement adapté au problème constaté",
      "Lien avec l'état de la couverture (humidité)",
      "Devis gratuit détaillé",
    ],
    sections: [
      {
        h: "Quels signes montrent que la charpente est attaquée ?",
        p: "De petits trous de sortie dans le bois, de la sciure fine au pied des pièces, un bois friable ou qui sonne creux, des taches sombres ou une odeur de moisi sont les signes à surveiller. Une charpente peut aussi souffrir d'une infiltration ancienne, d'une ventilation insuffisante ou de la condensation. Le contrôle visuel dans les combles est la première étape.",
      },
      {
        h: "Faut-il traiter ou réparer la charpente ?",
        p: "Cela dépend de l'état des bois. Si l'attaque est superficielle, un traitement suffit souvent à stopper le problème. Si des pièces sont affaiblies, une réparation ou un remplacement s'impose. L'important est d'identifier d'abord la cause, notamment l'humidité venue de la couverture, faute de quoi le problème peut revenir.",
      },
      {
        h: "Pourquoi l'état de la toiture compte-t-il pour la charpente ?",
        p: "Une toiture qui laisse passer l'eau humidifie les bois, favorise les champignons et attire certains insectes. Réparer la fuite à l'origine du problème fait partie du traitement de la charpente. C'est pourquoi un même contrôle porte sur la couverture, la zinguerie et les bois.",
      },
      {
        h: "Combien coûte le traitement d'une charpente ?",
        p: "Selon La Maison Saint-Gobain (mise à jour du 16 avril 2026), le traitement contre les xylophages représente de 30 à 50 € le mètre linéaire, et la réparation de charpente environ 60 € le m². Le remplacement d'une charpente traditionnelle revient à environ 188 € le m². Le devis gratuit donne le prix pour votre charpente.",
      },
    ],
    table: {
      caption: "Repères de prix pour la charpente",
      rows: [
        ["Traitement contre les xylophages, au mètre linéaire", "30 à 50 €"],
        ["Réparation de charpente, au m²", "environ 60 €"],
        ["Remplacement d'une charpente traditionnelle, au m²", "environ 188 €"],
      ],
    },
    faq: [
      { q: "Comment savoir si ma charpente a des insectes xylophages ?", a: "Des trous de sortie, de la sciure fine et un bois friable sont les signes classiques. Un contrôle dans les combles permet de confirmer." },
      { q: "Faut-il toujours traiter une charpente ?", a: "Non. Le traitement se décide après contrôle de l'état des bois et de la cause du problème." },
      { q: "Combien coûte un traitement de charpente ?", a: "Environ 30 à 50 € le mètre linéaire pour le traitement contre les xylophages, selon La Maison Saint-Gobain. Le devis est gratuit." },
      { q: "L'humidité de la toiture peut-elle abîmer la charpente ?", a: "Oui. Une fuite humidifie les bois et favorise champignons et insectes : il faut réparer la fuite en même temps." },
    ],
    related: ["reparation-toiture-deauville", "etancheite-toiture-deauville", "renovation-toiture-deauville", "pose-velux-deauville"],
  },
  {
    slug: "pose-velux-deauville",
    title: "Pose et remplacement de Velux à Deauville",
    h1: "Pose et remplacement de Velux à Deauville",
    short: "Pose ou remplacement de fenêtres de toit avec reprise soignée de l'étanchéité autour du châssis.",
    icon: "PanelTop",
    metaTitle: "Pose Velux Deauville | Les Couvreurs Normands",
    metaDescription: "Pose et remplacement de Velux et fenêtres de toit à Deauville et dans tout le Calvados, avec reprise de l'étanchéité. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["pose velux deauville", "fenêtre de toit deauville", "remplacement velux deauville", "couvreur deauville"],
    answer:
      "Poser ou remplacer une fenêtre de toit (Velux) demande une découpe précise de la couverture et un raccord d'étanchéité compatible avec le matériau de toiture. Les Couvreurs Normands posent et remplace les fenêtres de toit à Deauville et dans tout le Calvados, avec un devis gratuit.",
    benefits: [
      "Pose et remplacement de fenêtres de toit",
      "Raccord d'étanchéité adapté à la couverture",
      "Reprise des raccords autour d'un ancien châssis",
      "Devis gratuit détaillé",
    ],
    sections: [
      {
        h: "Comment se déroule la pose d'une fenêtre de toit ?",
        p: "Le couvreur ouvre la couverture, adapte la charpente si nécessaire, pose le châssis, puis réalise le raccord d'étanchéité avec la couverture environnante. La fenêtre est ensuite installée et les finitions intérieures sont reprises. Le raccord autour du châssis est l'étape la plus sensible : un défaut à cet endroit est une cause fréquente de fuite.",
      },
      {
        h: "Faut-il une autorisation pour poser un Velux ?",
        p: "Le simple remplacement d'une fenêtre de toit à l'identique ne demande en général aucune démarche. En revanche, créer une nouvelle ouverture dans la toiture modifie l'aspect extérieur du bâtiment : une déclaration préalable en mairie est généralement requise. Vérifiez aussi les règles du plan local d'urbanisme de votre commune avant de commander.",
      },
      {
        h: "Pourquoi une fenêtre de toit peut-elle fuir ?",
        p: "Un raccord d'étanchéité vieilli ou mal posé, un joint dégradé, des tuiles voisines déplacées ou de la condensation sur le vitrage sont les causes les plus courantes. Avant de remplacer la fenêtre, il faut distinguer un défaut du raccord, un problème de couverture proche ou un élément du châssis à reprendre.",
      },
      {
        h: "Combien coûte la pose d'un Velux ?",
        p: "Selon La Maison Saint-Gobain (mise à jour du 16 avril 2026), la pose seule d'une fenêtre de toit représente environ 300 €, et la fenêtre elle-même de 240 à 1 300 € selon la taille et les performances. Le devis gratuit précise le prix de la fourniture et de la pose pour votre toiture.",
      },
    ],
    table: {
      caption: "Repères de prix pour une fenêtre de toit",
      rows: [
        ["Pose seule d'une fenêtre de toit", "environ 300 €"],
        ["Fenêtre de toit (fourniture), selon taille et performance", "240 à 1 300 €"],
      ],
    },
    faq: [
      { q: "Combien coûte la pose d'un Velux ?", a: "La pose seule représente environ 300 € et la fenêtre de 240 à 1 300 € selon La Maison Saint-Gobain. Le devis gratuit donne le prix exact." },
      { q: "Faut-il une déclaration préalable pour un Velux ?", a: "Créer une nouvelle fenêtre de toit en demande généralement une. Le remplacement à l'identique n'en demande pas. Renseignez-vous auprès de votre mairie." },
      { q: "Mon Velux fuit : faut-il le remplacer ?", a: "Pas toujours. La fuite vient souvent du raccord d'étanchéité ou de la couverture voisine. Un contrôle permet de trouver la cause avant de remplacer la fenêtre." },
      { q: "Remplacez-vous aussi les anciennes fenêtres de toit ?", a: "Oui, avec reprise du raccord d'étanchéité autour du châssis." },
    ],
    related: ["etancheite-toiture-deauville", "couvreur-zingueur-deauville", "reparation-toiture-deauville", "traitement-charpente-deauville"],
  },

  {
    slug: "ravalement-facade-deauville",
    title: "Ravalement de façade à Deauville",
    h1: "Ravalement de façade à Deauville : nettoyage, enduit, peinture",
    short: "Remise en état des murs extérieurs : diagnostic, réparations, enduit ou peinture, finitions.",
    icon: "PaintRoller",
    metaTitle: "Ravalement de façade Deauville | Les Couvreurs Normands",
    metaDescription: "Ravalement de façade à Deauville et dans tout le Calvados : nettoyage, réparation des fissures, enduit et peinture. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["ravalement façade deauville", "rénovation façade deauville", "enduit façade deauville", "façadier deauville"],
    priceSource: "Repères publiés par Obat (guide « Tarif façadier », mis à jour le 30 octobre 2024). Prix indicatifs au m², hors cas particuliers : seul le devis gratuit fait foi.",
    answer:
      "Un ravalement de façade remet en état les murs extérieurs : nettoyage, reprise des fissures et des fonds abîmés, puis enduit ou peinture. Les Couvreurs Normands interviennent à Deauville et dans tout le Calvados, après examen de la façade et devis gratuit.",
    benefits: [
      "Examen de la façade avant tout devis",
      "Traitement des fissures et des fonds avant la finition",
      "Enduit ou peinture choisis selon le support",
      "Devis gratuit détaillant chaque poste",
    ],
    sections: [
      {
        h: "Pourquoi ravaler une façade ?",
        p: "Une façade fatiguée laisse passer l'humidité, se fissure et perd son aspect. Le ravalement protège le mur, redonne de la tenue au bâtiment et évite que de petits désordres (fissures, enduit qui s'effrite, mousses) ne s'aggravent. Il s'accompagne souvent d'un contrôle des éléments voisins : gouttières, débords de toit et rives.",
      },
      {
        h: "Comment se déroule un ravalement ?",
        p: "Le chantier commence par un diagnostic du support (pierre, brique, enduit, crépi), puis un nettoyage adapté. Viennent ensuite la réparation des fissures et des zones dégradées, l'application d'un fond si nécessaire, puis la finition en enduit ou en peinture. Chaque étape dépend de l'état réel du mur, ce qui explique que le devis se fasse après examen.",
      },
      {
        h: "Faut-il une autorisation pour un ravalement ?",
        p: "Cela dépend de la commune : dans certains secteurs (zone protégée ou décision du conseil municipal), le ravalement exige une déclaration préalable en mairie. Un changement de couleur ou d'aspect est aussi concerné. Renseignez-vous auprès de votre mairie avant le chantier ; nous vous indiquons les points à vérifier lors de la visite.",
      },
      {
        h: "Combien coûte un ravalement de façade ?",
        p: "Selon Obat (guide mis à jour le 30 octobre 2024), un ravalement coûte de 40 à 160 € le m², et de 40 à 80 € le m² hors isolation par l'extérieur. L'écart dépend du support, de l'état du mur, de la hauteur et de l'accès (échafaudage). Le devis des Couvreurs Normands est gratuit et détaille chaque poste.",
      },
    ],
    table: {
      caption: "Repères de prix pour un ravalement de façade",
      rows: [
        ["Ravalement de façade, au m²", "40 à 160 €"],
        ["Ravalement avec isolation thermique par l'extérieur, au m²", "75 à 180 €"],
        ["Ravalement complet avec enduit, au m²", "35 à 140 €"],
        ["Réparation de fissures, au m²", "15 à 30 €"],
      ],
    },
    faq: [
      { q: "Faites-vous le ravalement de façade à Deauville ?", a: "Oui. Les Couvreurs Normands réalisent le ravalement à Deauville et dans tout le Calvados, après examen de la façade et devis gratuit. Appelez le [TÉLÉPHONE]." },
      { q: "Quelle différence entre ravalement et peinture de façade ?", a: "La peinture est une finition. Le ravalement est plus large : nettoyage, réparation des fissures et des fonds, puis enduit ou peinture selon l'état du mur." },
      { q: "Faut-il un échafaudage pour ravaler une façade ?", a: "Dès que le chantier dépasse le rez-de-chaussée, un échafaudage ou une nacelle est généralement nécessaire. Il fait partie des postes détaillés dans le devis." },
      { q: "Le devis est-il gratuit ?", a: "Oui, le devis est gratuit. Il est établi après examen de la façade." },
    ],
    related: ["peinture-exterieure-deauville", "nettoyage-facade-deauville", "gouttieres-deauville", "couvreur-zingueur-deauville"],
  },
  {
    slug: "peinture-exterieure-deauville",
    title: "Peinture extérieure à Deauville",
    h1: "Peinture extérieure à Deauville : façades, boiseries, volets, fer forgé",
    short: "Peinture de façades, murs, boiseries, volets et ferronneries, avec préparation adaptée au support.",
    icon: "Paintbrush",
    metaTitle: "Peinture extérieure Deauville | Les Couvreurs Normands",
    metaDescription: "Peinture extérieure à Deauville et dans tout le Calvados : façades, boiseries, volets, fer forgé. Préparation du support et devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["peinture extérieure deauville", "peinture façade deauville", "peintre extérieur deauville", "peinture volets deauville"],
    priceSource: "Repères publiés par Obat (guide « Tarif façadier », mis à jour le 30 octobre 2024). Prix indicatifs au m², hors cas particuliers : seul le devis gratuit fait foi.",
    answer:
      "La peinture extérieure protège et rafraîchit les façades, murs, boiseries, volets et ferronneries. Les Couvreurs Normands interviennent à Deauville et dans tout le Calvados, avec une préparation du support adaptée avant application et un devis gratuit.",
    benefits: [
      "Préparation du support avant application",
      "Produits choisis selon la surface : mur, bois ou métal",
      "Façades, boiseries, volets et fer forgé",
      "Devis gratuit détaillant les travaux",
    ],
    sections: [
      {
        h: "Sur quels supports peindre à l'extérieur ?",
        p: "On peint à l'extérieur les façades et murs, les boiseries (portes, fenêtres, bardages), les volets et les éléments métalliques comme le fer forgé. Chaque support demande sa préparation : lessivage, grattage, traitement de la rouille, ponçage ou sous-couche. C'est cette préparation qui conditionne la durée de la peinture.",
      },
      {
        h: "Comment choisir la peinture ?",
        p: "Le choix dépend du support et de l'exposition : peinture acrylique ou siloxane sur un mur, produits spécifiques pour le bois ou pour le métal. À Deauville et dans le Calvados, la pluie et le vent mettent les finitions à l'épreuve : une bonne sous-couche et deux couches de finition sont préférables.",
      },
      {
        h: "Quand repeindre une façade ou des volets ?",
        p: "Des écailles, des traces de moisissure, une peinture qui farine ou un bois qui grise indiquent qu'il est temps d'intervenir. Repeindre à temps évite des réparations plus lourdes : un support protégé reste sain plus longtemps. Les travaux se programment de préférence par temps sec et doux.",
      },
      {
        h: "Combien coûte une peinture extérieure ?",
        p: "Selon Obat (guide mis à jour le 30 octobre 2024), une peinture acrylique de façade coûte de 30 à 60 € le m², et une peinture sur bois pour bardage de 45 à 80 € le m². Le prix varie selon l'état du support, la hauteur et l'accès. Le devis des Couvreurs Normands est gratuit.",
      },
    ],
    table: {
      caption: "Repères de prix pour une peinture extérieure",
      rows: [
        ["Peinture acrylique de façade, au m²", "30 à 60 €"],
        ["Peinture sur bois (bardage extérieur), au m²", "45 à 80 €"],
        ["Sous-couche hydrofuge, au m²", "20 à 50 €"],
        ["Peinture à la chaux ou siloxane, au m²", "35 à 50 €"],
      ],
    },
    faq: [
      { q: "Faites-vous la peinture extérieure à Deauville ?", a: "Oui. Les Couvreurs Normands peignent façades, boiseries, volets et fer forgé à Deauville et dans tout le Calvados. Appelez le [TÉLÉPHONE]." },
      { q: "Peignez-vous les volets et le fer forgé ?", a: "Oui, avec une préparation adaptée au bois ou au métal : grattage, traitement de la rouille, sous-couche puis finition." },
      { q: "Quelle est la meilleure période pour peindre à l'extérieur ?", a: "Par temps sec et doux, hors gel et forte chaleur : le printemps et le début de l'automne conviennent bien." },
      { q: "Le devis est-il gratuit ?", a: "Oui, le devis est gratuit. Il est établi après examen des surfaces à peindre." },
    ],
    related: ["ravalement-facade-deauville", "nettoyage-facade-deauville", "gouttieres-deauville", "couvreur-zingueur-deauville"],
  },
  {
    slug: "nettoyage-facade-deauville",
    title: "Nettoyage de façade à Deauville",
    h1: "Nettoyage de façade à Deauville : entretien extérieur et démoussage",
    short: "Nettoyage des façades et surfaces extérieures, méthode douce ou haute pression selon le support.",
    icon: "SprayCan",
    metaTitle: "Nettoyage de façade Deauville | Les Couvreurs Normands",
    metaDescription: "Nettoyage de façade et entretien extérieur à Deauville et dans tout le Calvados : haute pression, hydrogommage, anti-mousse. Devis gratuit. Tél. [TÉLÉPHONE].",
    keywords: ["nettoyage façade deauville", "nettoyage extérieur deauville", "démoussage façade deauville", "hydrogommage deauville"],
    priceSource: "Repères publiés par Obat (guide « Tarif façadier », mis à jour le 30 octobre 2024). Prix indicatifs au m², hors cas particuliers : seul le devis gratuit fait foi.",
    answer:
      "Le nettoyage de façade retire mousses, algues, salissures et traces de pollution des murs extérieurs, avec une méthode adaptée au support (haute pression, hydrogommage, traitement anti-mousse). Les Couvreurs Normands interviennent à Deauville et dans tout le Calvados, avec devis gratuit.",
    benefits: [
      "Méthode choisie selon le support : pierre, enduit, brique",
      "Traitement anti-mousse et anti-algues",
      "Contrôle de l'état du mur avant et après",
      "Devis gratuit, sans engagement",
    ],
    sections: [
      {
        h: "Pourquoi nettoyer une façade ?",
        p: "Mousses, algues et salissures retiennent l'humidité contre le mur et ternissent l'aspect du bâtiment. Un nettoyage régulier prolonge la vie des enduits et des peintures, et permet de repérer à temps les fissures ou les infiltrations. C'est aussi une étape préalable à un ravalement ou à une peinture.",
      },
      {
        h: "Quelles méthodes de nettoyage ?",
        p: "Le nettoyage haute pression convient à de nombreux supports, mais un jet trop fort abîme les enduits et les joints. L'hydrogommage, plus doux, projette de l'eau et un abrasif fin. Un traitement anti-mousse peut compléter le nettoyage pour ralentir le retour des végétaux. La méthode est choisie après examen du mur.",
      },
      {
        h: "Façade, toiture, gouttières : un entretien d'ensemble",
        p: "Une façade se salit souvent à cause d'une gouttière qui déborde ou d'une toiture couverte de mousse. Nous contrôlons ces éléments en même temps : cela évite de nettoyer un mur qui sera de nouveau taché quelques mois plus tard. Le démoussage de toiture et le nettoyage des gouttières peuvent être faits lors de la même intervention.",
      },
      {
        h: "Combien coûte un nettoyage de façade ?",
        p: "Selon Obat (guide mis à jour le 30 octobre 2024), le nettoyage haute pression coûte de 5 à 20 € le m², l'hydrogommage de 20 à 25 € le m² et le gommage de 25 à 35 € le m². Le prix dépend du support, de la hauteur et de l'accès. Le devis des Couvreurs Normands est gratuit.",
      },
    ],
    table: {
      caption: "Repères de prix pour nettoyer une façade",
      rows: [
        ["Nettoyage haute pression, au m²", "5 à 20 €"],
        ["Hydrogommage, au m²", "20 à 25 €"],
        ["Gommage, au m²", "25 à 35 €"],
        ["Nettoyage chimique, au m²", "5 à 25 €"],
      ],
    },
    faq: [
      { q: "Faites-vous le nettoyage de façade à Deauville ?", a: "Oui. Les Couvreurs Normands nettoient les façades à Deauville et dans tout le Calvados, avec une méthode adaptée au support. Appelez le [TÉLÉPHONE]." },
      { q: "Le nettoyage haute pression abîme-t-il la façade ?", a: "Un jet trop puissant peut abîmer enduits et joints. La pression et la méthode sont donc adaptées au matériau, ou remplacées par un procédé plus doux comme l'hydrogommage." },
      { q: "Peut-on nettoyer la façade et la toiture en même temps ?", a: "Oui. Le démoussage de toiture et le nettoyage de façade peuvent être programmés ensemble, ce qui limite les déplacements et l'échafaudage." },
      { q: "Le devis est-il gratuit ?", a: "Oui, le devis est gratuit. Il est établi après examen des surfaces à nettoyer." },
    ],
    related: ["ravalement-facade-deauville", "peinture-exterieure-deauville", "demoussage-toiture-deauville", "gouttieres-deauville"],
  },
];

export const ICONS = { Wrench, House, Layers, Triangle, Sparkles, Droplets, Ruler, CloudRain, ShieldCheck, Hammer, PanelTop, PaintRoller, Paintbrush, SprayCan };

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);

export const PAGE_UPDATED = { iso: "2026-10-13", label: "13 octobre 2026" };
