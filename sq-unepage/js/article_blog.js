/**
 * Génère un article de blog.
 *
 * @constructor
 */
 
 function ArticleBlog(){

	var id, titre, date, nombre_commentaires, x, y, type_objet, left, top;
	var div_base, div_texte, div_commentaires;


  /**
   * Initialise l'article de blog.
   *
   * @param {Object} data - Données à affecter à l'instance
   */
   
		this.init = function(data){
			this.id = data.id;
			this.type_objet = data.type_objet;
			this.id_objet = data.id_objet;					
			this.titre = data.titre;
			this.date = data.date;
			this.nombre_commentaires = data.nombre_commentaires;
			this.x = data.nombre_jours;
			this.y = data.y;
			this.left = -1;
			this.top = -1;
			this.index = data.index;
			this.div_base = document.createElement("div");
			this.div_base.style.position = "absolute";
			this.div_base.style.left = "-1000px";
			this.div_base.style.top = this.y+"px";
			this.div_base.style.cursor = "pointer";
			this.div_base.setAttribute("class","article_blog_container");
		//	canvas.appendChild(this.div_base); (TO DO : append DOM)

		// image
			this.img = document.createElement("img");
			this.img.setAttribute("src",g_u_img_blog);
			this.div_base.appendChild(this.img);

		// texte
			var date_texte = this.date.substring(0, 2) + " " + g_nom_mois[parseFloat(this.date.substring(3, 5))-1];
			this.div_texte = document.createElement("div");
			this.div_texte.setAttribute("class","cache");
			this.div_texte.onSelectStart = null;
			
			var html = "<div id='article_blog"+this.id+"' class='article_blog ";
			if ((this.titre.match("gazette"))||(this.titre.match("novamag"))||(this.titre.match("magazine"))) html = html+" article_blog2 ";
			html = html + "' onClick='callBlog("+this.id_objet+",\""+this.type_objet+"\");'><span><b>"+this.titre+"</b><br/>"+date_texte+"</span>";
			
			if (nombre_commentaires > 0) html += "<div class=\"picto_nombre_commentaires\">"+nombre_commentaires+"</div>";
			html +=	"</div>";
			this.div_texte.innerHTML = html;
			this.div_base.appendChild(this.div_texte);

		// draggable
			if (g_u_admin==0)
			$(this.div_base).draggable({
				axis: "y" ,
				start: function(event,ui){
					$(this).children('div').children('div').removeAttr("onClick");
					stop_action ();
					},
				stop: function(event,ui) {
					y_parent = $(this).parent().height();
					yy = ui.position.top / y_parent;
					$.get("spip.php?page=ajax&mode=article-sauve-coordonnees", {id_objet:this.id_objet, type_objet:this.type_objet, X:0, Y:yy } );
				}
			});

	}	
}