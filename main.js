$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [{
        title: "Hola, Soy Cristian Muñoz",
        desc: "Soy Programador Front-End"
    }, {
        title: "Lorem ipsum",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, {
        title: "dolor sit amet",
        desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }];
    var currentPage = 0;
    //generar contenido
    for (var i = 0; i < content.length; i++) {        
 // dividir las letras de contenido en una matriz
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (texto agrupado)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //establece el texto en
        $("#segmentos").append("<div class=\"letras-wrap mutable\"><div class=\"letras-titulo\"></div><div class=\"letras-desc\"></div></div>");
        setText();        
        //clonar a datos
        $("#segmentos").append("<div class=\"letras-wrap posicion-dato\"><div class=\"letras-titulo\"></div><div class=\"letras-desc\"></div></div>");
        setText();
    }
    
    // arreglo inicial
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Controladores de eventos
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#letras-anterior").hide();
    $("#letras-anterior").click(function () {
        $("#letras-siguiente").show();
        currentPage--;
        if (currentPage === 0) {
            $("#letras-anterior").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#letras-siguiente").click(function () {
        $("#letras-anterior").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#letras-siguiente").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     *Funciones
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .letras-titulo > .letras").eq(i).css({
                left: $(".posicion-dato:eq(" + currentPage + ") > .letras-titulo > .letras").eq(i).offset().left + "px",
                top: $(".posicion-dato:eq(" + currentPage + ") > .letras-titulo > .letras").eq(i).offset().top + "px",
                color: "#FCCF47",// Aqui se cambia el color de las letras del titulo
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .letras-desc > .letras").eq(i).css({
                left: $(".posicion-dato:eq(" + currentPage + ") > .letras-desc > .letras").eq(i).offset().left + "px",
                top: $(".posicion-dato:eq(" + currentPage + ") > .letras-desc > .letras").eq(i).offset().top + "px",
                color: "#FCCF47",// Aqui se cambia el color de las letras del subtitulo
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".letras-titulo").last().append("<span class=\"letras\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".letras-desc").last().append("<span class=\"letras\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            // no codificar página actual
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".letras-titulo"],
                ["desc", ".letras-desc"]
            ];
            //aplicar a .title h1s y .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {                    
                    //define una posición aleatoria en la pantalla
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //definiendo límites
                    var offset = $(".posicion-dato").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".posicion-dato").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".posicion-dato").eq(currentPage).height() / 2;
                    // finalmente, aplica todas las codificaciones
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letras").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#1795a8",// Aqui sse cambia el color de las letras de fondo
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});