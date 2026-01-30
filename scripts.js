// ===== DONNÉES DES IMAGES DE LA GALERIE =====
var imagesGalerie = [
  {
    src: 'images/silksong - cotufa.png',
    titre: 'HollowKnight Silksong - Fanart',
    description: 'Un fanart en pixel de Hornet du jeu HollowKnight:Silksong réalisé par l\'artiste cotufa sur Pixilart.'
  },
  {
    src: 'images/artwork - curemoto.png',
    titre: 'Artwork par Curemoto',
    description: 'Un artwork réalisé par l\'artiste curemoto sur Pixilart.'
  },
  {
    src: 'images/kitsune - hazbinhelluva.gif',
    titre: 'Kitsune',
    description: 'Un renard japonais mythique, réalisé par l\'artiste HazbinHelluva sur Pilixart.'
  },
  {
    src: 'images/landscape - abueloretrowave.jpg',
    titre: 'Landscape',
    description: 'Un paysage en pixelart d\'une ville dans le ciel réalisé par l\'artiste AbueloRetroWave.'
  },
  {
    src: 'images/artwork - xye.png',
    titre: 'Xye',
    description: 'Un personnage orignal en pixelart, réalisé par l\'artiste Xyereia sur Pixilart.'
  },
  {
    src: 'images/bobette - arrow-head.png',
    titre: 'Bobette',
    description: 'Un fanart en pixel du personnage Bobette, réalisé par l\'artiste Arrow-Head sur Pixilart.'
  }
];

// ===== IMAGES AJOUTÉES PAR LES UTILISATEURS =====
var imagesUtilisateurs = [];

// ===== ÉLÉMENTS DU DOM =====
var galerieContainer = document.getElementById('galerie-container');
var userImagesContainer = document.getElementById('user-images-container');
var userImagesSection = document.getElementById('user-images-section');
var popupOverlay = document.getElementById('popup-overlay');
var popupImage = document.getElementById('popup-image');
var popupTitre = document.getElementById('popup-titre');
var popupDescription = document.getElementById('popup-description');
var popupClose = document.getElementById('popup-close');
var formulaire = document.getElementById('form-proposition');
var inputFichier = document.getElementById('input-fichier');
var inputTitre = document.getElementById('input-titre');
var inputDescription = document.getElementById('input-description');
var messageSucces = document.getElementById('message-succes');

// ===== FONCTION POUR CRÉER UN ÉLÉMENT DE GALERIE =====
function creerElementGalerie(image) {
  var article = document.createElement('article');
  article.className = 'gallery-item';
  
  var img = document.createElement('img');
  img.src = image.src;
  img.alt = image.titre;
  
  var divInfo = document.createElement('div');
  divInfo.className = 'gallery-item-info';
  
  var h3 = document.createElement('h3');
  h3.className = 'gallery-item-title';
  h3.textContent = image.titre;
  
  var p = document.createElement('p');
  p.className = 'gallery-item-desc';
  p.textContent = image.description;
  
  divInfo.appendChild(h3);
  divInfo.appendChild(p);
  article.appendChild(img);
  article.appendChild(divInfo);
  
  // Événement au clic pour ouvrir le popup
  article.onclick = function() {
    ouvrirPopup(image);
  };
  
  return article;
}

// ===== FONCTION POUR AFFICHER LA GALERIE =====
function afficherGalerie() {
  // Vider le conteneur
  galerieContainer.innerHTML = '';
  
  // Créer et ajouter chaque élément de la galerie
  for (var i = 0; i < imagesGalerie.length; i++) {
    var element = creerElementGalerie(imagesGalerie[i]);
    galerieContainer.appendChild(element);
  }
}

// ===== FONCTION POUR AFFICHER LES IMAGES UTILISATEURS =====
function afficherImagesUtilisateurs() {
  // Vider le conteneur
  userImagesContainer.innerHTML = '';
  
  // Afficher ou masquer la section
  if (imagesUtilisateurs.length > 0) {
    userImagesSection.style.display = 'block';
    
    // Créer et ajouter chaque élément
    for (var i = 0; i < imagesUtilisateurs.length; i++) {
      var element = creerElementGalerie(imagesUtilisateurs[i]);
      userImagesContainer.appendChild(element);
    }
  } else {
    userImagesSection.style.display = 'none';
  }
}

// ===== FONCTION POUR OUVRIR LE POPUP =====
function ouvrirPopup(image) {
  popupImage.src = image.src;
  popupImage.alt = image.titre;
  popupTitre.textContent = image.titre;
  popupDescription.textContent = image.description;
  popupOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===== FONCTION POUR FERMER LE POPUP =====
function fermerPopup() {
  popupOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ===== ÉVÉNEMENT POUR FERMER LE POPUP =====
popupClose.onclick = function() {
  fermerPopup();
};

// ===== FERMER LE POPUP EN CLIQUANT À L'EXTÉRIEUR =====
popupOverlay.onclick = function(event) {
  if (event.target === popupOverlay) {
    fermerPopup();
  }
};

// ===== FERMER LE POPUP AVEC LA TOUCHE ÉCHAP =====
document.onkeydown = function(event) {
  if (event.key === 'Escape') {
    fermerPopup();
  }
};

// ===== GESTION DU FORMULAIRE =====
formulaire.onsubmit = function(event) {
  event.preventDefault();
  
  var fichier = inputFichier.files[0];
  var titre = inputTitre.value;
  var description = inputDescription.value;
  
  // Vérifier que tous les champs sont remplis
  if (!fichier || !titre || !description) {
    alert('Veuillez remplir tous les champs du formulaire.');
    return;
  }
  
  // Créer une URL locale pour le fichier
  var urlFichier = URL.createObjectURL(fichier);
  
  // Ajouter l'image au tableau des images utilisateurs
  var nouvelleImage = {
    src: urlFichier,
    titre: titre,
    description: description
  };
  
  imagesUtilisateurs.push(nouvelleImage);
  
  // Réinitialiser le formulaire
  formulaire.reset();
  
  // Afficher le message de succès
  messageSucces.classList.add('active');
  
  // Masquer le message après 3 secondes
  setTimeout(function() {
    messageSucces.classList.remove('active');
  }, 3000);
  
  // Mettre à jour l'affichage des images utilisateurs
  afficherImagesUtilisateurs();
  
  // Faire défiler vers la section des images utilisateurs
  userImagesSection.scrollIntoView({ behavior: 'smooth' });
};

// ===== INITIALISATION AU CHARGEMENT DE LA PAGE =====
document.addEventListener('DOMContentLoaded', function() {
  afficherGalerie();
  afficherImagesUtilisateurs();
});