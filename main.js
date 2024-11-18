$(function() {
    // La page est chargée

    // Rendre déplaçable
    $(".draggable").draggable({
        revert: "invalid",
        start: function(event, ui) {
            $(this).css("z-index", 70);  // Augmente le z-index pour la boîte déplacée
        },
        stop: function(event, ui) {
            // Après le dépôt, modifier le z-index en fonction de l'ordre
            if ($(this).is("#box3")) {
                $(this).css("z-index", 15); // La boîte 3 doit être derrière les autres
            } else if ($(this).is("#box2")) {
                $(this).css("z-index", 16); // La boîte 2 est au milieu
            } else if ($(this).is("#box1")) {
                $(this).css("z-index", 17); // La boîte 1 est en haut
            }
        }
    });

    // Déposer la clé sur la fenêtre
    $("#droppable-key").droppable({
        accept: "#key-inventory",
        classes: {
            "ui-droppable-active": "key-state-active",
        },
        drop: function( event, ui ) {
            $('#scene').append('<img id="window-open" src="asset_jeu/window-open.PNG">')
            $('#key-inventory').hide()

            // Tester la completion du jeu
            testReussiteJeu()
        }
    });

    // // Définir la variable de la boîte droppable
    // var droppable_box;
    // // Si la boite 3 est saisie, droppable-box = "#droppable_box3"
    // console.info($(".box").attr("data-drag"))
    // if ( $(".box").attr("data-drag") == 'draggable3' ) {
    //     droppable_box = "#droppable-box3"
    //     $('#box3').css('z-index', '14')
    // }
    // // Si la boite 2 est saisie, droppable-box = "#droppable_box2"
    // else if ( $(".box").attr("data-drag") == 'draggable2' ) {
    //     droppable_box = "#droppable-box2"
    //     $('#box2').css('z-index', '15')
    // } 
    // // Sinon droppable-box = "#droppable_box1"
    // else if ( $(".box").attr("data-drag") == 'draggable1' ) {
    //     droppable_box = "#droppable-box1"
    //     $('#box1').css('z-index', '16')
    // }

    // Déposer la boite 3 par terre (boite inférieure)
    $('#droppable-box3').droppable({
        accept: "#box3",
        classes: {
            "ui-droppable-active": "box-state-active"
        },
        drop: function( event, ui ) {
            // Récupérer les dimensions et la position de la zone de drop
            var dropWidth = $(this).width();
            var dropHeight = $(this).height();
            var dropOffset = $(this).offset();
            
            // Récupérer les dimensions de l'élément draggable
            var dragWidth = ui.helper.width();
            var dragHeight = ui.helper.height();

            // Calculer les positions pour centrer l'élément draggable
            var newTop = dropOffset.top + (dropHeight / 2) - (dragHeight / 2);
            var newLeft = dropOffset.left + (dropWidth / 2) - (dragWidth / 2);

            // Positionner l'élément draggable au centre de la zone de drop
            ui.helper.animate({
                top: newTop,
                left: newLeft
            }, 200); // Animation pour un mouvement fluide vers le centre
            
            // Indiquer que l'objet est bien déposé, va servir pour le test dans la partie déposer les personnage
            $(this).attr("data-drop-box", "dropped")
        }
    });

    // Déposer la boite 2 ensuite (boite intermédiaire)
    $('#droppable-box2').droppable({
        accept: "#box2",
        classes: {
            "ui-droppable-active": "box-state-active"
        },
        drop: function( event, ui ) {
            // Récupérer les dimensions et la position de la zone de drop
            var dropWidth = $(this).width();
            var dropHeight = $(this).height();
            var dropOffset = $(this).offset();
            
            // Récupérer les dimensions de l'élément draggable
            var dragWidth = ui.helper.width();
            var dragHeight = ui.helper.height();

            // Calculer les positions pour centrer l'élément draggable
            var newTop = dropOffset.top + (dropHeight / 2) - (dragHeight / 2);
            var newLeft = dropOffset.left + (dropWidth / 2) - (dragWidth / 2);

            // Positionner l'élément draggable au centre de la zone de drop
            ui.helper.animate({
                top: newTop,
                left: newLeft
            }, 200); // Animation pour un mouvement fluide vers le centre
            
            // Indiquer que l'objet est bien déposé, va servir pour le test dans la partie déposer les personnage
            $(this).attr("data-drop-box", "dropped")
        }
    });

    // Déposer la boite 1 enfin (boite supérieure)
    $('#droppable-box1').droppable({
        accept: "#box1",
        classes: {
            "ui-droppable-active": "box-state-active"
        },
        drop: function( event, ui ) {
            // Récupérer les dimensions et la position de la zone de drop
            var dropWidth = $(this).width();
            var dropHeight = $(this).height();
            var dropOffset = $(this).offset();
            
            // Récupérer les dimensions de l'élément draggable
            var dragWidth = ui.helper.width();
            var dragHeight = ui.helper.height();

            // Calculer les positions pour centrer l'élément draggable
            var newTop = dropOffset.top + (dropHeight / 2) - (dragHeight / 2);
            var newLeft = dropOffset.left + (dropWidth / 2) - (dragWidth / 2);

            // Positionner l'élément draggable au centre de la zone de drop
            ui.helper.animate({
                top: newTop,
                left: newLeft
            }, 200); // Animation pour un mouvement fluide vers le centre

            // Indiquer que l'objet est bien déposé, va servir pour le test dans la partie déposer les personnage
            $(this).attr("data-drop-box", "dropped")
        }
    });
    


     // Au click sur la boite
     $('#box-to-open').on("click", function() {
        // Si le perso a la class strong (il a pris la fiole), alors il peut ouvrir la boite
        if ($('#perso').hasClass('strong')) {

            // Si le bouclier n'est pas dans l'inventaire
            if ($('#inventory-item3').is(':empty')) {
                $('#shield').show() // Apparition du bouclier

                // Modifier le curseur sur la boite
                $('#box-to-open').css('cursor', 'url(asset_jeu/cursor_default.png), default')

                $('#shield').on("click", function() { // Si le bouclier est cliqué, ajout dans l'inventaire
                    $('#inventory-item3').append('<img class="draggable objects-inventory" id="shield-inventory" src="asset_jeu/WolfCrest.png">')
                    $('#shield').remove()

                    // Rendre le bouclier dans l'inventaire déplaçable
                    $('#shield-inventory').draggable({ revert: "invalid" });
                })
            }
        }
        else { // Sinon afficher le message
            $('#message').css('display', 'flex')
            $('#message').html('<p>Je n\'ai pas assez de force !</p>')
            setTimeout(() => {
                $('#message').hide()
                $('#message').empty()
            }, 3000);
        }
    })


    // Déposer la fiole sur le perso
    $("#perso").droppable({
        accept: ".objects-inventory",
        drop: function( event, ui ) {

            // Récupérer l'ID de l'élément déposé
            var droppedId = ui.helper.attr("id");

            // Vérifier quel élément a été déposé
            if (droppedId === "flask-inventory") { 
                $('.flask-inventory').remove()

                // Si c'est la fiole, est-ce que le perso en en déjà eu ? Si oui, on la fait disparaitre et on affiche un message
                if ($('#perso').hasClass('strong')) {
                    $('#message').css('display', 'flex')
                    $('#message').html('<p>J\'ai déjà pris de la potion.</p>')
                    setInterval(() => {
                        $('#message').hide()
                        $('#message').empty()
                    }, 3000);
                } 
                else { // Sinon on la fait disparaitre et on "donne de la force" au perso
                    $('#perso').addClass('strong')
                    $('#message').css('display', 'flex')
                    $('#message').html('<p>Je suis fort maintenant !</p>')
                    setInterval(() => {
                        $('#message').hide()
                        $('#message').empty()
                    }, 3000);
                }
            } 
            // Si c'est le bouclier, on le fait disparaitre et on affiche un message
            else if (droppedId === "shield-inventory") {
                $('#shield-inventory').hide()
                $('#message').css('display', 'flex')
                $('#message').html('<p>Je vais pouvoir partir à l\'aventure maintenant !</p>')
                setTimeout(() => {
                    $('#message').hide()
                    $('#message').empty()
                }, 4000);

                // Tester la completion du jeu
                testReussiteJeu()
            }
        }
    });



    // Ouverture du sac
    $('#sacFerme').on("click", function() {
        if ($(this).attr("data-open") == 0) { // Si le sac est fermé
            $(this).attr("data-open", 1) // On passe la variable à 1
            $(this).attr("src","asset_jeu/BackPackOpen.png") // On remplace la source de l'image par le sac ouvert

            // Si la clé n'est pas dans l'inventaire
            if ($('#inventory-item1').is(':empty')) {
                $('#key').show() // Apparition de la clé
                $('#key').on("click", function() { // Si la clé est cliquée, ajout dans l'inventaire
                    $('#inventory-item1').append('<img class="draggable" id="key-inventory" src="asset_jeu/OldStorageKey.png">')
                    $('#key').remove()

                    // Rendre la clé dans l'inventaire déplaçable
                    $('#key-inventory').draggable({ revert: "invalid" });
                })
            }
        }
        // Fermeture du sac
        else {
            $(this).attr("data-open", 0) // On passe la variable à 0
            $(this).attr("src", "asset_jeu/BackPackClosed.png") // On remplace la source de l'image par le sac fermé
            $('#key').hide() // On cache la clé
        }
    })


    // Au click sur la poudre, on vérifie si une fiole est dans l'inventaire
    $('#poudre').on("click", function() { 
        if ($('#inventory-item2').is(':empty')) { // Si elle n'y est pas, on ajoute l'image
            $('#inventory-item2').append('<img class="draggable objects-inventory flask-inventory" id="flask-inventory" src="asset_jeu/poudre.png">')

            // Rendre la poudre dans l'inventaire déplaçable
            $('.flask-inventory').draggable({ revert: "invalid" });
        }
        else {
            $('#message').css('display', 'flex') // Affichage du message
            $('#message').html('<p>J\'ai déjà une fiole dans l\'inventaire.</p>')
            setTimeout(() => {
                $('#message').hide()
                $('#message').empty()
            }, 3000);
        }
    })


    
    // Déposer le personnage sur les boites (pour sortir par la fenetre)
    $("#droppable-perso").droppable({
        accept: "#perso",
        classes: {
            "ui-droppable-active": "perso-state-active",
        },
        drop: function( event, ui ) {
            
            // Si les 3 boites sont déposées, on peut dropp le perso
            if ($('#droppable-box1').attr("data-drop-box") == "dropped" && $('#droppable-box2').attr("data-drop-box") == "dropped" && $('#droppable-box3').attr("data-drop-box") == "dropped") {
               
                // Récupérer les dimensions et la position de la zone de drop
                var dropWidth = $(this).width();
                var dropHeight = $(this).height();
                var dropOffset = $(this).offset();
                
                // Récupérer les dimensions de l'élément draggable
                var dragWidth = ui.helper.width();
                var dragHeight = ui.helper.height();

                // Calculer les positions pour centrer l'élément draggable
                var newTop = dropOffset.top + (dropHeight / 2) - (dragHeight / 2);
                var newLeft = dropOffset.left + (dropWidth / 2) - (dragWidth / 2);

                // Positionner l'élément draggable au centre de la zone de drop
                ui.helper.animate({
                    top: newTop,
                    left: newLeft
                }, 200); // Animation pour un mouvement fluide vers le centre


                // on vérifie que la fenêtre est ouverte 
                if ($('#scene').find('#window-open').length > 0) {

                    // et que le personnage a bien le bouclier
                    if ($('#inventory').find('#shield-inventory').length > 0) {
                        $('#final-message').html('<p>Vous avez réussi à vous échapper !</p>') // Affichage le message de réussite
                        $('#div-final-message').css('display', 'flex')
                        $('#div-final-message').css('opacity', 1)
                        $('#final-message').css('display', 'flex')
                    }
                    else {
                        $('#message').css('dispaly', 'flex') // Affichage du message
                        $('#message').html('<p>C\'est fermé mais on dirait qu\'il y a une serrure.</p>')
                        setTimeout(() => {
                            $('#message').hide()
                            $('#message').empty()
                        }, 3000);
                    }
                }
                else {
                    $('#message').css('display', 'flex') // Affichage du message
                    $('#message').html('<p>Je ne peux pas partir sans mon bouclier !</p>')
                    setTimeout(() => {
                        $('#message').hide()
                        $('#message').empty()
                    }, 3000);
                }
            }
            // Sinon si les 3 boites ne sont pas déposées, le personnage ne peut pas monter 
            else {
                $('#perso').animate({ // Le personnage revient à sa position initiale
                    top: 378,
                    left: 310 
                }, 200)
                $('#message').css('display', 'flex') // Affichage du message
                $('#message').html('<p>Je ne peux pas monter, c\'est trop haut !</p>')
                setTimeout(() => {
                    $('#message').hide()
                    $('#message').empty()
                }, 3000);

            }
        }
    });

    
    function testReussiteJeu() {
        // Si les 3 boites sont déposées, on peut dropp le perso
        if ($('#droppable-box1').attr("data-drop-box") == "dropped" && $('#droppable-box2').attr("data-drop-box") == "dropped" && $('#droppable-box3').attr("data-drop-box") == "dropped") {
    
            // Au click sur la fenetre, on vérifie que la fenêtre est ouverte 
            if ($('#scene').find('#window-open').length > 0) {
    
                // et que le personnage a bien le bouclier
                if ($('#inventory').find('#shield-inventory').length > 0) {
                    $('#final-message').html('<p>Vous avez réussi à vous échapper !</p>') // Affichage le message de réussite
                    $('#div-final-message').css('display', 'flex')
                    $('#div-final-message').css('opacity', 1)
                    $('#final-message').css('display', 'flex')
                }
            }
        }
    }

});